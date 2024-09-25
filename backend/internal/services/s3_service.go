package services

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type S3Service struct {
	s3Client *s3.S3
	bucket   string
}

func NewS3Service(region, bucket string) *S3Service {
	sess := session.Must(session.NewSession(&aws.Config{
		Region: aws.String(region),
	}))
	return &S3Service{
		s3Client: s3.New(sess),
		bucket:   bucket,
	}
}

// GeneratePreSignedURL creates a pre-signed URL for uploading a file to S3
func (s *S3Service) GeneratePreSignedURL(fileName string) (string, error) {
	log.Printf("Generating pre-signed URL for file: %s", fileName)

	req, _ := s.s3Client.PutObjectRequest(&s3.PutObjectInput{
		Bucket: aws.String(s.bucket),
		Key:    aws.String(fileName),
	})
	urlStr, err := req.Presign(15 * time.Minute) // URL valid for 15 minutes
	if err != nil {
		log.Printf("Error generating pre-signed URL: %v", err)
		return "", fmt.Errorf("failed to generate pre-signed URL: %w", err)
	}

	log.Printf("Generated pre-signed URL: %s", urlStr)
	return urlStr, nil
}

func (s *S3Service) UploadFile(fileName string, folderName string, fileBody io.Reader, contentType string) error {
	log.Printf("Uploading file %s to S3 bucket %s", fileName, s.bucket)

	// Use a buffer to read the file content
	buf := new(bytes.Buffer)
	_, err := io.Copy(buf, fileBody)
	if err != nil {
		log.Printf("Error reading file body: %v", err)
		return fmt.Errorf("failed to read file body: %w", err)
	}

	// Upload the buffered content to S3
	_, err = s.s3Client.PutObject(&s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(folderName + fileName),
		Body:        bytes.NewReader(buf.Bytes()), // Create a new reader from the buffer
		ContentType: aws.String(contentType),
	})

	if err != nil {
		log.Printf("Error uploading file to S3: %v", err)
		return fmt.Errorf("failed to upload file: %w", err)
	}

	log.Printf("Successfully uploaded %s to S3", fileName)
	return nil
}
