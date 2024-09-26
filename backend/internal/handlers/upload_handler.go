package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"s3-media-backup-service/internal/services"
	"s3-media-backup-service/pkg/config"
	"s3-media-backup-service/pkg/models"
)

type UploadHandler struct {
	s3Service *services.S3Service
}

func NewUploadHandler(s3Service *services.S3Service) *UploadHandler {
	return &UploadHandler{
		s3Service: s3Service,
	}
}

// HandleUpload handles the file upload to S3
func (h *UploadHandler) HandleUpload(w http.ResponseWriter, r *http.Request) {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	var uploadRequest models.UploadRequest

	// Parse the multipart form
	if err := r.ParseMultipartForm(10 << 20); err != nil { // limit to 10MB
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	// Get storage type
	uploadRequest.StorageType = r.FormValue("storageType")
	log.Printf("Storage Type: %s", uploadRequest.StorageType)

	// Get folder name
	uploadRequest.FolderName = r.FormValue("folderName")
	log.Printf("Folder Name: %s", uploadRequest.FolderName)

	// Get the file from the request
	files := r.MultipartForm.File["files"]
	s3Service := services.NewS3Service(cfg.Region, cfg.Bucket) // Change to your bucket name

	for _, fileHeader := range files {
		log.Printf("Received file: %s", fileHeader.Filename)

		// Open the uploaded file
		file, err := fileHeader.Open()
		if err != nil {
			http.Error(w, "Unable to open uploaded file", http.StatusInternalServerError)
			return
		}
		defer file.Close()

		// Upload the file to S3 using the new UploadFile method
		err = s3Service.UploadFile(fileHeader.Filename, uploadRequest.FolderName, uploadRequest.StorageType, file, fileHeader.Header.Get("Content-Type"))
		if err != nil {
			http.Error(w, "Failed to upload file to S3", http.StatusInternalServerError)
			return
		}
	}

	// Return a success response
	response := models.UploadResponse{Message: "Files uploaded successfully!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
