package graph

import (
	"sync"

	"github.com/rkrohk/moviehall/graph/model"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.
//go:generate go run ../../testdata/gqlgen.go

type Resolver struct {
	Rooms map[string]*model.Room
	mu    sync.Mutex
}
