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
    };

    const handleUpload = () => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
        formData.append('storageType', storageType);

        axios.post('http://localhost:4000/upload', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        })
        .then(response => setUploadStatus('Upload successful!'))
        .catch(error => setUploadStatus('Upload failed.'));
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
