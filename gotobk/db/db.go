package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

// use planetscale for the DB ?

// https://planetscale.com/docs/tutorials/connect-go-app

// table secrets

const ()

var (
	database *sql.DB
)

func Connect() {

	db, err := sql.Open("mysql", os.Getenv("DSN"))
	if err != nil {
		fmt.Printf("Error opening database: %s\n", err.Error())
		panic(err.Error())
	}
	fmt.Print("Pool status", fmt.Sprint(db.Stats().OpenConnections))
	database = db
}

func StoreSecretDB(id string, secret string) {
	query := "INSERT INTO secrets (secret) VALUES (?)"
	result, err := database.Query(query, secret)
	if err != nil {
		fmt.Printf("Error querying database: %s\n", err.Error())
		panic(err.Error())
	}
	defer result.Close()
}

func RetrieveSecretDB(id string) {
	query := "SELECT * FROM secrets where id = ?"
	result, err := database.Query(query, id)
	if err != nil {
		fmt.Printf("Error querying database: %s\n", err.Error())
		panic(err.Error())
	}
	defer result.Close()
}
