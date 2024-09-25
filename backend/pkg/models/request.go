package models

type UploadRequest struct {
	Files       []string `json:"files"`       // List of file names
	StorageType string   `json:"storageType"` // S3 storage type (e.g., Standard, Glacier)
	FolderName  string   `json:"folderName"`
}
type UploadResponse struct {
	FileName     string `json:"fileName"` // Name of the file uploaded
	PreSignedURL string `json:"url"`      // Pre-signed URL or final uploaded URL
	StorageType  string `json:"storageType"`
	Message      string `json:"message"`
}
