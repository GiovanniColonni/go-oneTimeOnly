package backend

// Stored Secret
type StoredSecret struct {
	Id     string
	Secret string
}

// REQUESTS

type PostSecretRequest struct {
	Id      string
	Payload string
}

// RESPONSES

type Status struct {
	status string
}

type GetSecretResponse struct {
	status string
	exit   bool
}

type PostSecretResponse struct {
	status string
	exit   bool
	id     string
}
