package main

import (
	"fmt"
    "log"
	"go-rest-api/internal/config"
    "go-rest-api/api"
)

func main() {

	cfg := config.LoadConfig()
    router := api.SetupRoutes()
	addr := fmt.Sprintf(":%s", cfg.Port)
    log.Println("Server is running in port: %s", addr)
    router.Run(addr)
}
