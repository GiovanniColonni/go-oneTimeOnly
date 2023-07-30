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

// other chagn
// TODO: - Logger from standardlib
//		 - unify way in which AccessControl header is set, like a middleware
//	     - write tests
// 		 - use a database
//		 - verify query params
//		 - integrate planet scale

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
