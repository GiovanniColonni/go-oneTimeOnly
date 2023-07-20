package goto

import (
	"fmt"
	"net/http"
)

func HealthCeckHandler(c *gin.Context) {
	//status := &Status{status: "ok"}

	c.JSON(http.StatusOK, "OK")
}

func GetSecretHandler(c *gin.Context) {

	resp := &GetSecretResponse{status: "ok", exit: true}
	var reqId string = c.Query("id")
	fmt.Print(reqId)
	c.JSON(http.StatusOK, resp)

}

func PostSecretHandler(c *gin.Context) {
	resp := &PostSecretResponse{}
	// take payload and parse into model
	var body PostSecretRequest

	if err := c.BindJSON(&body); err != nil {
		resp.exit = false
		resp.status = "Error"

		fmt.Println("Error binding the request body")
		fmt.Print(err)

		c.JSON(http.StatusBadRequest, err)
		return
	}

	defer c.Request.Body.Close()

	

	c.JSON(http.StatusOK, resp)

}
