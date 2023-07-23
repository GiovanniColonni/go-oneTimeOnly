package functions

import (
	"errors"
	"fmt"
	model "onetimeonly/backend/gotobk/models"
)

type Storage struct {
	id     string
	secret string
}

var DB []Storage

func StoreSecret(b model.PostSecretRequest) bool {
	// store secret + expiration date
	var secret Storage
	secret.id = b.Id
	secret.secret = b.Payload
	DB = append(DB, secret)
	return true
}

func GetSecret(id string) (string, error) {
	for _, s := range DB {
		if s.id == id {
			return s.secret, nil
		}
	}
	fmt.Print("No Secret find")
	return "", errors.New("no secret find with id")

}
