# S3 Media Backup Service

![image](https://github.com/user-attachments/assets/1302100d-c011-45a0-abc4-334995bed68a)


**S3 Media Backup Service**  
I recently received a large collection of my family photos and videos that I've converted from VHS to digital. This resulted in many gigabytes of invaluable media just sitting on my laptop. I wanted a safe, cost-effective backup solution. At the time of writing this, S3's Glacier Deep Archive costs approximately $0.00099 per GB per month. This pricing makes it one of the most economical storage options in the cloud, and if set up correctly, I should be the only one with access to it, meaning no third party is ever involved. This is ideal from both a privacy and cost perspective.

This a local web application that allows users to upload files and folders from their local machine to an Amazon S3 bucket. The application provides an easy-to-use interface for selecting files and choosing S3 storage types (e.g., Standard, Glacier Deep Archive). The backend is built in Go, handling secure uploads and generating pre-signed URLs for efficient file transfers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)

## Features

- Upload files directly from your local machine to an Amazon S3 bucket.
- Select S3 storage types during file uploads.
- Handles large file uploads using pre-signed URLs and multipart uploads.
- Built with Go for the backend and React for the frontend.

## Technologies Used

- **Frontend**: React
- **Backend**: Go
- **AWS SDK**: For S3 interactions
- **Environment Variables**: For sensitive configuration
- **Makefile**: To streamline build and run processes

## Getting Started

### Prerequisites

- Go (1.22 or later)
- Node.js (for the React frontend)
- AWS Account (with an S3 bucket created)

### Running The Application
Use `make` in the root directory to build both the front and backend. Navigate to port :3000 and you should see the application running. You will need to ensure that you have your AWS secret key saved as an enviroment variable on your local machine in order for the requests to your AWS S3 bucket to work. 

