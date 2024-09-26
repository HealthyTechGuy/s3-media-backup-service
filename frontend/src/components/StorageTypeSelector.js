import React from 'react';
import './StorageTypeSelector.css';

const StorageTypeSelector = ({ selectedStorage, onStorageChange }) => {
    return (
        <div className="storage-type-selector">
            <h4 htmlFor="storageType">S3 Storage Type`</h4>
            <select 
                id="storageType"
                value={selectedStorage}
                onChange={(e) => onStorageChange(e.target.value)}
            >
                <option value="Standard">Standard</option>
                <option value="Intelligent-Tiering">Intelligent-Tiering</option>
                <option value="Standard-IA">Standard-IA</option>
                <option value="OneZone-IA">OneZone-IA</option>
                <option value="Glacier">Glacier</option>
                <option value="Glacier-Deep-Archive">Glacier Deep Archive</option>
            </select>
        </div>
    );
};

export default StorageTypeSelector;
