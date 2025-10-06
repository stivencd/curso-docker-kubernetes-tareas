package api

import (
    "github.com/gin-gonic/gin"
    "go-rest-api/internal/handler"
)

func SetupRoutes() *gin.Engine {
    r := gin.Default()
    r.GET("/albums", handler.GetAlbums)
    r.GET("/albums/:id", handler.GetAlbumById)
	r.GET("/status", handler.GetStatus)
    return r
}
