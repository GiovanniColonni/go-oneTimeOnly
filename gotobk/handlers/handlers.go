package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	functions "onetimeonly/backend/gotobk/functions"
	model "onetimeonly/backend/gotobk/models"
)

func HealthCeckHandler(w http.ResponseWriter, r *http.Request) {
	//status := &Status{status: "ok"}
	w.WriteHeader(http.StatusOK)
}

func GetSecretHandler(w http.ResponseWriter, r *http.Request) {
	urls := r.URL.Query()
	secretId := urls.Get("id")
	if secretId == "" {
		fmt.Print("bad pyalod request")
		http.Error(w, "bad payload", http.StatusBadRequest)
		return
	}
	secret, err := functions.GetSecret(secretId)
	if err != nil {
		fmt.Print("Can't find secret, err: ", err)
		http.Error(w, "Can't find secret", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(secret))
}

func PostSecretHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Print("Storing secret...")
	var reqBody model.PostSecretRequest

	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		fmt.Print("bad pyalod request", err)
		http.Error(w, "bad payload", http.StatusBadRequest)
		return
	}
	exit := functions.StoreSecret(reqBody)
	if !exit {
		fmt.Print("Error in storing secret")
		http.Error(w, "Error in storing secret", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Stored"))

	fmt.Print("secret stored")
}
