package config

import (
	"os"
)

type Config struct {
	AWSRegion          string
	S3BucketName       string
	AWSAccessKeyID     string
	AWSSecretAccessKey string
}

func LoadConfig() *Config {
	return &Config{
		AWSRegion:          os.Getenv("AWS_REGION"),
		S3BucketName:       os.Getenv("S3_BUCKET_NAME"),
		AWSAccessKeyID:     os.Getenv("AWS_ACCESS_KEY_ID"),
		AWSSecretAccessKey: os.Getenv("AWS_SECRET_ACCESS_KEY"),
	}
}
