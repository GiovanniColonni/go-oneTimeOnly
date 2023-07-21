package handlers

import (
	"net/http"
)

func HealthCeckHandler(w http.ResponseWriter, r *http.Request) {
	//status := &Status{status: "ok"}
	w.WriteHeader(http.StatusOK)
}

func GetSecretHandler() {

}

func PostSecretHandler() {

}
