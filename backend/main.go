package main

import (
	"fmt"
	"net/http"
	"onetimeonly/backend/gotobk/routes"
	"os"

	"github.com/Valgard/godotenv"
)

const (
	host = "localhost:8080"
)

func main() {

	envErr := godotenv.Load(".env")
	if envErr != nil {
		fmt.Println("Error loading .env file")
		os.Exit(1)
	}
	r := routes.RegisterRouter()
	fmt.Println("Starting web server at host", host)
	err := http.ListenAndServe(host, r)
	if err != nil {
		fmt.Println("Error occured when starting the server", err.Error())
		os.Exit(1)
	}
}
