// components/DropZone.js
import React, { useCallback, useRef } from 'react';
import './DropZone.css';

const DropZone = ({ onFilesSelected }) => {
    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();

        const files = event.dataTransfer.files;
        if (files.length) {
            onFilesSelected(Array.from(files)); // Convert FileList to Array
        }
    }, [onFilesSelected]);

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleClick = (inputType) => {
        if (inputType === 'file') {
            fileInputRef.current.click(); // Trigger click on the hidden input
        } else {
            folderInputRef.current.click(); // Trigger click on the folder input
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length) {
            onFilesSelected(Array.from(files)); // Convert FileList to Array
        }
    };

    const handleFolderChange = (event) => {
        const files = event.target.files;
        if (files.length) {
            onFilesSelected(Array.from(files)); // Convert FileList to Array
        }
    };

    return (
        <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => handleClick('file')} // Open file explorer on click
        >
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Drag & Drop files or folders here or click to upload</p>
            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the input
            />
            <input
                type="file"
                multiple
                ref={folderInputRef}
                onChange={handleFolderChange}
                style={{ display: 'none' }} // Hide the input
                webkitdirectory="true" // Allow directory selection
                directory="true" // Firefox support
            />
        </div>
    );
};

export default DropZone;
