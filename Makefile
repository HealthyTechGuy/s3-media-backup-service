# Makefile for S3 Media Backup Service

.PHONY: all run backend frontend clean

# Define the ports
BACKEND_PORT := 4000
FRONTEND_PORT := 3000

# Default target
all: run

# Run both backend and frontend
run:
	@echo "Starting backend..."
	(cd backend && go run ./cmd/s3-backup-service &) && \
		(echo "Starting frontend..." && \
		cd frontend && npm start)

# Run backend only
backend:
	@echo "Starting backend..."
	cd backend && go run ./cmd/s3-backup-service

# Run frontend only
frontend:
	@echo "Starting frontend..."
	cd frontend && npm start

# Clean up any built files
clean:
	@echo "Cleaning up..."
	rm -rf backend/bin/*
	rm -rf frontend/build/*
