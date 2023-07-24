package routes

import (
	"onetimeonly/backend/gotobk/handlers"

	"github.com/gorilla/mux"
)

func RegisterRouter() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/health", handlers.HealthCeckHandler).Methods("GET")
	r.HandleFunc("/secret/{id}", handlers.GetSecretHandler).Methods("GET")
	r.HandleFunc("/secret", handlers.PostSecretHandler).Methods("POST")
	r.HandleFunc("/secret", handlers.OptionSecretHandler).Methods("OPTIONS")
	return r
}
