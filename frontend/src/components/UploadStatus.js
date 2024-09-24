import React from 'react';

const UploadStatus = ({ progress, status }) => {
    return (
        <div className="upload-status">
            {status ? <p>{status}</p> : null}
            {progress > 0 && <p>Uploading... {progress}%</p>}
        </div>
    );
};

export default UploadStatus;
