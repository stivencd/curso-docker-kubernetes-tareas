package config

import(
	"log"
	"os"
)

type Config struct {
	Port string
}

func LoadConfig() Config {
	cfg := Config{
        Port:  getEnv("APP_PORT", "8080"),
    }
	log.Printf("Port: %s", cfg.Port)
	return cfg
}

func getEnv(key, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists{
		return value
	}
	return defaultVal
}