package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/satori/go.uuid"
	"github.com/gin-contrib/cors"
	"io/ioutil"
	"encoding/json"
)

var data struct {
    Prompt string `json:"prompt"`
	Tags   []string `json:"tags"`
}

func main() {

	r := gin.Default()

	r.Use(cors.Default())

	r.POST("/dream", func(c *gin.Context) {
		body, _ := ioutil.ReadAll(c.Request.Body)
		json.Unmarshal(body, &data)
		uuid1 := uuid.NewV4()
		send(uuid1.String(), data.Prompt, data.Tags)

		c.JSON(http.StatusOK, gin.H{
			"id": uuid1.String(),
		})
	})

	r.Run() // listen and serve on 0.0.0.0:8080
}
