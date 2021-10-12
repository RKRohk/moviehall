package main

import (
	"context"
	"fmt"
	"log"
	"os"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
)

func initializeApp() *firebase.App {
	if os.Getenv("PROD") != "true" {
		os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", "./firebase-config.json")
		os.Setenv("FIREBASE_AUTH_EMULATOR_HOST", "localhost:9099")
		os.Setenv("GCLOUD_PROJECT", "moviehall-e7f29")
	}

	fmt.Println(os.Getenv("FIREBASE_AUTH_EMULATOR_HOST"))

	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		log.Fatalf("error initializing app %v\n", err)
	}

	return app
}

func initializeAuth(app *firebase.App) *auth.Client {

	client, err := app.Auth(context.Background())
	if err != nil {
		log.Printf("Error initializing authentication client %v\n", err)
	}
	return client
}
