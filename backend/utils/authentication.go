package utils

import (
	"context"
	"log"

	"firebase.google.com/go/v4/auth"
	"github.com/rkrohk/moviehall/graph/model"
)

//VerifyAndGetUser verifies user Identity by using Id Token and returns the user
func VerifyAndGetUser(auth *auth.Client, idToken string) *model.User {

	//User is not signed in
	if len(idToken) == 0 {
		return nil
	}

	token, err := auth.VerifyIDToken(context.Background(), idToken)

	if err != nil {
		log.Printf("error verifying user with idToken %s\n", idToken)
		return nil
	}

	firebaseUser, err := auth.GetUser(context.Background(), token.UID)

	if err != nil {
		log.Printf("error fetching user with uid %s %v\n", token.UID, err)
		return nil
	}

	user := &model.User{Name: firebaseUser.DisplayName, PhotoURI: firebaseUser.PhotoURL, ID: firebaseUser.UID}
	return user
}
