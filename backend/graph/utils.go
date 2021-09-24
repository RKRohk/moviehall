package graph

import (
	"context"
	"log"

	"firebase.google.com/go/v4/auth"
	"github.com/rkrohk/moviehall/graph/model"
)

func getUserFromID(auth *auth.Client, uid string) {

	firebaseUser, err := auth.GetUser(context.Background(), uid)

	if err != nil {
		log.Println("error fetching user with uid %s %v", uid, err)
		return nil, err
	}

	user := &model.User{Name: firebaseUser.DisplayName, PhotoURI: firebaseUser.PhotoURL}
}
