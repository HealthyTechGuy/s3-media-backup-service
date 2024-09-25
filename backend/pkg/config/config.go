package config

import (
	"encoding/json"
	"os"
	"path/filepath"

	"s3-media-backup-service/pkg/models"
)

func LoadConfig() (*models.Config, error) {
	configPath, err := filepath.Abs("../config.json")
	if err != nil {
		return nil, err
	}

	// Open the config.json file
	file, err := os.Open(configPath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Decode the JSON configuration
	var config models.Config
	if err := json.NewDecoder(file).Decode(&config); err != nil {
		return nil, err
	}

	return &config, nil
}
