package routes

import (
	"onetimeonly/backend/gotobk/handlers"

	"github.com/gorilla/mux"
)

func RegisterRouter() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/health", handlers.HealthCeckHandler).Methods("GET")

	return r
}
