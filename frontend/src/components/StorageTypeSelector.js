import React from 'react';
import './StorageTypeSelector.css';

const StorageTypeSelector = ({ selectedStorage, onStorageChange }) => {
    return (
        <div className="storage-type-selector">
            <h4 htmlFor="storageType">S3 Storage Type</h4>
            <select 
                id="storageType"
                value={selectedStorage}
                onChange={(e) => onStorageChange(e.target.value)}
            >
                <option value="STANDARD">Standard</option>
                <option value="INTELLIGENT_TIERING">Intelligent-Tiering</option>
                <option value="STANDARD_IA">Standard-IA</option>
                <option value="ONEZONE_IA">OneZone-IA</option>
                <option value="GLACIER">Glacier</option>
                <option value="DEEP_ARCHIVE">Glacier Deep Archive</option>
            </select>
        </div>
    );
};

export default StorageTypeSelector;
