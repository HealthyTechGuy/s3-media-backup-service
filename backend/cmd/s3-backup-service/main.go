package main

import (
	"log"
	"net/http"

	"s3-media-backup-service/internal/handlers"
	"s3-media-backup-service/internal/services"
	"s3-media-backup-service/pkg/config"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received %s request for %s", r.Method, r.URL.Path)

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		w.Header().Set("Access-Control-Max-Age", "1800")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight OPTIONS request
		if r.Method == "OPTIONS" {
			log.Println("Handling preflight OPTIONS request")
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {

	// Load the configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	// Initialize the S3Service
	s3Service := services.NewS3Service(cfg.Region, cfg.Bucket)

	// Initialize the UploadHandler with the S3 service
	uploadHandler := handlers.NewUploadHandler(s3Service)

	// Define the HTTP routes and handlers
	mux := http.NewServeMux()

	// Attach the upload handler to the /upload route
	mux.Handle("/upload", enableCORS(http.HandlerFunc(uploadHandler.HandleUpload)))

	// Start the server
	log.Println("Starting server on :4000...")
	if err := http.ListenAndServe(":4000", mux); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
