package functions

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
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
	var secret Storage
	secret.id = getRandomId()
	secret.secret = b.Payload
	DB = append(DB, secret)
	return secret.id
}

func GetSecret(id string) (string, error) {
	// check if id is actually a valid id
	for i, s := range DB {
		if s.id == id {
			// remove secret
			DB = append(DB[:i], DB[i+1:]...)
			return s.secret, nil
		}
	}
	fmt.Print("No Secret find")
	return "", errors.New("no secret find with id")

}
