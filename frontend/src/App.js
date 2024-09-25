import React, { useState } from 'react';
import axios from 'axios';
import DropZone from './components/DropZone'; // Import the DropZone component
import StorageTypeSelector from './components/StorageTypeSelector';
import UploadStatus from './components/UploadStatus';
import './App.css';

function App() {
    const [files, setFiles] = useState([]); // Initialize files as an array
    const [storageType, setStorageType] = useState('Standard');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFilesSelected = (selectedFiles) => {
        // Check if selectedFiles is an array and set it
        if (Array.isArray(selectedFiles)) {
            setFiles(selectedFiles);
            console.log("Files selected:", selectedFiles);
        } else {
            console.error("Expected an array of files but received:", selectedFiles);
        }
    };

    const handleUpload = () => {
        // Check if files is a valid array
        if (!Array.isArray(files) || files.length === 0) {
            setUploadStatus('No files selected for upload.');
            console.error('No files selected.');
            return;
        }

        console.log('Starting file upload...');
        console.log('Selected storage type:', storageType);

        const formData = new FormData();
        files.forEach((file, index) => {
            if (file instanceof File) {
                formData.append('files', file);
                console.log(`Appending file[${index}]: ${file.name}, size: ${file.size} bytes`);
            } else {
                console.error(`Item at index ${index} is not a valid file:`, file);
            }
        });
        formData.append('storageType', storageType);
        console.log('Storage type added to form data:', storageType);

        axios.post('http://localhost:4000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
                console.log(`Upload progress: ${percentCompleted}%`);
            }
        })
        .then(response => {
            setUploadStatus('Upload successful!');
        })
        .catch(error => {
            setUploadStatus('Upload failed.');
            if (error.response) {
                console.error('Server responded with an error:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received from server:', error.request);
            } else {
                console.error('Error during request setup:', error.message);
            }
        });
    };

    return (
        <div className="App">
            <h1>S3 Media Backup Service</h1>
            <DropZone onFilesSelected={handleFilesSelected} /> {/* Use DropZone instead of FileUpload */}
            <p>Files Selected: {files.length}</p> {/* Counter for selected files */}
            <StorageTypeSelector selectedStorage={storageType} onStorageChange={setStorageType} />
            <button className="upload-button" onClick={handleUpload}>Upload to S3</button>
            <UploadStatus progress={uploadProgress} status={uploadStatus} />
        </div>
    );
}

export default App;
