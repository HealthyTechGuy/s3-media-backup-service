// UploadStatus.js
import React from 'react';

function UploadStatus({ progress, status }) {
    return (
        <div className="upload-status">
            {status && <p>{status}</p>}
            {progress > 0 && (
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
}

export default UploadStatus;
