package utils

import (
	"context"
	"fmt"
	"os"
	"testing"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"github.com/stretchr/testify/assert"
)

func TestMain(t *testing.M) {
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", "../firebase-config.json")
	os.Setenv("FIREBASE_AUTH_EMULATOR_HOST", "localhost:9099")
	os.Setenv("GCLOUD_PROJECT", "moviehall-e7f29")
	code := t.Run()

	os.Exit(code)

}

func TestIfUserIsNotNull(t *testing.T) {

	// opt := option.WithCredentialsFile("../firebase-config.json")
	app, err := firebase.NewApp(context.Background(), nil)

	if err != nil || app == nil {
		t.Fail()
	}

	client, err := app.Auth(context.Background())

	assert.Nil(t, err, "Error while creating client")

	testFirebaseUser, err := client.CreateUser(context.Background(), (&auth.UserToCreate{}).Email("example123@gmail.com").DisplayName("Free Guy"))

	if err != nil || testFirebaseUser == nil {
		fmt.Printf("Error %s\n", err)
	}

	idToken, err := client.CustomToken(context.Background(), testFirebaseUser.UID)

	if err != nil {
		t.Errorf("error while getting custom token %v", err)
	}
	user := VerifyAndGetUser(client, idToken)

	assert.NotNil(t, user)

}
