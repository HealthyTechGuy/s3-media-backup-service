import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import StorageTypeSelector from './components/StorageTypeSelector';
import UploadStatus from './components/UploadStatus';

function App() {
    const [files, setFiles] = useState([]);
    const [storageType, setStorageType] = useState('Standard');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFilesSelected = (selectedFiles) => {
        setFiles(selectedFiles);
        console.log("Files selected:", selectedFiles);
    };

    const handleUpload = () => {
        if (files.length === 0) {
            setUploadStatus('No files selected for upload.');
            console.error('No files selected.');
            return;
        }

        console.log('Starting file upload...');
        console.log('Selected storage type:', storageType);

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append('files', file);
            console.log(`Appending file[${index}]: ${file.name}, size: ${file.size} bytes`);
        });
        formData.append('storageType', storageType);
        console.log('Storage type added to form data:', storageType);

        axios.post('http://localhost:4000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Setting content type for file upload
            },
            withCredentials: true, // If you need to send cookies or other credentials (adjust if necessary)
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted); // Update upload progress
                console.log(`Upload progress: ${percentCompleted}%`);
            }
        })
        .then(response => {
            setUploadStatus('Upload successful!');
            console.log('Upload successful, response:', response.data);
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
            <FileUpload onFilesSelected={handleFilesSelected} />
            <StorageTypeSelector selectedStorage={storageType} onStorageChange={setStorageType} />
            <button onClick={handleUpload}>Upload to S3</button>
            <UploadStatus progress={uploadProgress} status={uploadStatus} />
        </div>
    );
}

export default App;
