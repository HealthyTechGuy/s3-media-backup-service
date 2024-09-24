import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFilesSelected }) => {
    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        setFiles(acceptedFiles);
        onFilesSelected(acceptedFiles);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="file-upload">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag & drop files here, or click to select files</p>
            </div>
            <ul>
                {files.map(file => (
                    <li key={file.path}>{file.path} - {file.size} bytes</li>
                ))}
            </ul>
        </div>
    );
};

export default FileUpload;
