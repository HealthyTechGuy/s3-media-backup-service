import React, { useState } from 'react';
import axios from 'axios';
import DropZone from './components/DropZone'; 
import StorageTypeSelector from './components/StorageTypeSelector';
import UploadStatus from './components/UploadStatus';
import './App.css';

function App() {
    const [files, setFiles] = useState([]);
    const [storageType, setStorageType] = useState('Glacier-Deep-Archive');
    const [folderName, setFolderName] = useState('');
    const [folderNameError, setFolderNameError] = useState(''); 
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFilesSelected = (selectedFiles) => {
        if (Array.isArray(selectedFiles)) {
            setFiles(selectedFiles);
        } else {
            console.error("Expected an array of files but received:", selectedFiles);
        }
    };

    const handleUpload = () => {
        if (!Array.isArray(files) || files.length === 0) {
            setUploadStatus('No files selected for upload.');
            return;
        }

        const folderRegex = /\/$/;
        if (!folderRegex.test(folderName)) {
            setFolderNameError('Folder path must end with a forward slash (/)');
            return;
        } else {
            setFolderNameError('');
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        formData.append('storageType', storageType);
        formData.append('folderName', folderName);

        axios.post('http://localhost:4000/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
            }
        })
        .then(() => setUploadStatus('Upload successful!'))
        .catch(() => setUploadStatus('Upload failed.'));
    };

    return (
        <div className="App">
            <h1>S3 Media Backup Service</h1>
            <DropZone onFilesSelected={handleFilesSelected} />
            <h4>Files Selected: {files.length}</h4>
            
            <div className="inputs-container">
                <div className="folder-input">
                    <h4 htmlFor="folderName">S3 Bucket Folder Path </h4>
                    <input
                        type="text"
                        id="folderName"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="Enter folder path (must end with /)"
                        className={folderNameError ? 'input-error' : ''}
                    />
                    {folderNameError && <p className="error-message">{folderNameError}</p>}
                </div>

                <div className="storage-selector">
                    <StorageTypeSelector selectedStorage={storageType} onStorageChange={setStorageType} />
                </div>
            </div>

            <button className="upload-button" onClick={handleUpload}>Upload to S3</button>
            <UploadStatus progress={uploadProgress} status={uploadStatus} />
        </div>
    );
}

export default App;
