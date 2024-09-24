import React from 'react';

const StorageTypeSelector = ({ selectedStorage, onStorageChange }) => {
    const storageOptions = ['Standard', 'Glacier', 'Glacier Deep Archive'];

    return (
        <div className="storage-type-selector">
            <label htmlFor="storage-type">Choose S3 Storage Type:</label>
            <select
                id="storage-type"
                value={selectedStorage}
                onChange={(e) => onStorageChange(e.target.value)}
            >
                {storageOptions.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StorageTypeSelector;
