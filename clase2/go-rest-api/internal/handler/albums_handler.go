package handler

import (
    "net/http"
    "go-rest-api/internal/models"
    "github.com/gin-gonic/gin"
)

var albums = []models.Album{
    {ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
    {ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
    {ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func GetAlbums(c *gin.Context) {
   
    c.JSON(http.StatusOK, albums)
}

func GetAlbumById(c *gin.Context) {
    id := c.Param("id")

    for _, a := range albums {
        if a.ID == id {
            c.JSON(http.StatusOK, a)
            return
        }
    }

    c.JSON(http.StatusNotFound, gin.H{"message": "Album not found"})
}

func GetStatus(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}
