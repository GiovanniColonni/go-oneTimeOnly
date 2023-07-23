package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	functions "onetimeonly/backend/gotobk/functions"
	model "onetimeonly/backend/gotobk/models"

	"github.com/gorilla/mux"
)

const (
	origin = "http://localhost:3000"
)

func HealthCeckHandler(w http.ResponseWriter, r *http.Request) {
	//status := &Status{status: "ok"}
	w.Header().Set("Access-Control-Allow-Origin", origin)
	w.WriteHeader(http.StatusOK)
}

func GetSecretHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)["id"]
	secretId := vars

	fmt.Print("secretId: ", secretId, "\n")

	if secretId == "" {
		fmt.Print("bad pyalod request")
		http.Error(w, "bad payload", http.StatusBadRequest)
		return
	}
	secret, err := functions.GetSecret(secretId)
	if err != nil {
		fmt.Print("Can't find secret, err: ", err)
		http.Error(w, "Can't find secret", http.StatusNotFound)
		return
	}

	fmt.Print("\n secret: ", secret, "\n")

	w.Header().Set("Access-Control-Allow-Origin", origin)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(secret))

}

func PostSecretHandler(w http.ResponseWriter, r *http.Request) {
	var reqBody model.PostSecretRequest

	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		fmt.Print("bad pyalod request", err)
		http.Error(w, "bad payload", http.StatusBadRequest)
		return
	}
	fmt.Print("reqBody raw: ", r.Body, "\n")
	fmt.Print("reqBody: ", reqBody, "\n")

	id := functions.StoreSecret(reqBody)
	fmt.Print("secret id: ", id, "\n")

	if id == "" {
		fmt.Print("Error in storing secret")
		http.Error(w, "Error in storing secret", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", origin)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(id))

}
