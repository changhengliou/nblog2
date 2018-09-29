package config

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
)

// Config : configuration struct for json marshal
type Config struct {
	// ListenPort : server listen port
	ListenPort int `json:"listenPort"`
	// StaticDir : static file direcory
	StaticDir string `json:"staticDir"`
	// StaticRoutePrefix : static file routing prefix in url
	StaticRoutePrefix string `json:"staticRoutePrefix"`
}

// Read : read from configuration file
func Read() Config {
	var c Config
	f, err := os.Open("config.json")
	if err != nil {
		panic("Failed to find config.json")
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		panic("Failed to read config.json")
	}
	json.Unmarshal(b, &c)
	log.Printf("config: %v", c)
	return c
}
