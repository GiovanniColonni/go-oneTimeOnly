package main

import (
	"fmt"
	"net/http"
	"onetimeonly/backend/gotobk/routes"
	"os"
)

// other chagn
// ToDo: - Logger from standardlib
//		 - Use standard library net/http for the server + context

func main() {

	r := routes.RegisterRouter()
	fmt.Println("Starting web server at port 8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		fmt.Println("Error occured when starting the server", err.Error())
		os.Exit(1)
	}
}
