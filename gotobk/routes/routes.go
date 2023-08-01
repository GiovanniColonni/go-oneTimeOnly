package routes

import (
	"log"
	"net/http"
	"onetimeonly/backend/gotobk/handlers"
	"time"

	"github.com/gorilla/mux"
)

const (
	origin = "http://localhost:3000"
)

// Access cotnrol middlewere
func mdw_AccessControl(next http.Handler) http.Handler {
	return http.HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			(w).Header().Set("Access-Control-Allow-Origin", origin)
			(w).Header().Set("Access-Control-Allow-Headers", "Content-Type")

			next.ServeHTTP(w, r)
		})
}

// Http logging middlewere
func mdw_Logging(next http.Handler) http.Handler {
	return http.HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			log.Println(
				time.Now().UTC(),
				r.Host,
				r.RequestURI,
				r.Method,
				r.RemoteAddr,
			)

			next.ServeHTTP(w, r)
		})
}

func RegisterRouter() *mux.Router {
	r := mux.NewRouter()

	r.Use(mdw_Logging)
	r.Use(mdw_AccessControl)

	r.HandleFunc("/health", handlers.HealthCeckHandler).Methods("GET")
	r.HandleFunc("/secret/{id}", handlers.GetSecretHandler).Methods("GET")
	r.HandleFunc("/secret", handlers.PostSecretHandler).Methods("POST")
	r.HandleFunc("/secret", handlers.OptionSecretHandler).Methods("OPTIONS")
	return r
}
