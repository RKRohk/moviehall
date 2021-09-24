package graph

import (
	"sync"

	"firebase.google.com/go/v4/auth"
	"github.com/rkrohk/moviehall/graph/model"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.
//go:generate go run ../../testdata/gqlgen.go

type Resolver struct {
	Rooms map[string]*model.Room
	mu    sync.Mutex
	Auth  *auth.Client
}
