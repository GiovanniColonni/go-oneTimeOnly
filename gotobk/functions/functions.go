package functions

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"onetimeonly/backend/gotobk/db"
	model "onetimeonly/backend/gotobk/models"
)

const (
	ID_SIZE = 10 // 10 characters
)

type Storage struct {
	id     string
	secret string
}

var DB []Storage

func getRandomId() string {
	randomByte := make([]byte, ID_SIZE)
	_, err := rand.Read(randomByte)
	if err != nil {
		fmt.Print("Error in generating random id")
	}
	return base64.URLEncoding.EncodeToString(randomByte)
}

func StoreSecret(b model.PostSecretRequest) string {
	// store secret + expiration date
	var id string = getRandomId()
	var secret string = b.Payload
	db.StoreSecretDB(id, secret)
	fmt.Print("Secret stored: ", secret)
	return id
}

func GetSecret(id string) (string, error) {
	// check if id is actually a valid id
	for i, s := range DB {
		if s.id == id {
			// remove secret
			fmt.Print("Secret found")
			fmt.Print("Secret: ", s)
			DB = append(DB[:i], DB[i+1:]...)
			return s.secret, nil
		}
	}
	fmt.Print("No Secret find")
	return "", errors.New("no secret find with id")

}
