package model

// Stored Secret
type StoredSecret struct {
	Id     string
	Secret string
}

// REQUESTS

type PostSecretRequest struct {
	Payload string
}

// RESPONSES

type Status struct {
	Status string
}

type GetSecretResponse struct {
	Status string
	Exit   bool
}

type PostSecretResponse struct {
	Status string
	exit   bool
	id     string
}
