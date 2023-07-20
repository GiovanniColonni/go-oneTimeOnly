package main

import (
	"fmt"
	"net/http"
	"os"
)

// ToDo: - Logger from standardlib
//		 - Use standard library net/http for the server + context

func main() {

	http.HandleFunc("/health", HealthCeckHandler)

	http.HandleFunc("/secret", GetSecretHandler)
	http.HandleFunc("/secret", PostSecretHandler)

	fmt.Println("Serving server on http://localhost:8080")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
		os.Exit(1)
	}
}
