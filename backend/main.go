package main

import (
	"fmt"
	"net/http"
	"onetimeonly/backend/gotobk/routes"
	"os"
)

const (
	host = "localhost:8080"
)

func main() {

	r := routes.RegisterRouter()
	fmt.Println("Starting web server at host", host)
	err := http.ListenAndServe(host, r)
	if err != nil {
		fmt.Println("Error occured when starting the server", err.Error())
		os.Exit(1)
	}
}
