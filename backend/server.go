package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/rkrohk/moviehall/graph"
	"github.com/rkrohk/moviehall/graph/generated"
	"github.com/rkrohk/moviehall/graph/model"
	"github.com/rkrohk/moviehall/utils"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	firebaseApp := initializeApp()

	auth := initializeAuth(firebaseApp)

	newExecutableSchema := generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{Rooms: map[string]*model.Room{}, Auth: auth}})

	srv := handler.NewDefaultServer(newExecutableSchema)

	srv.AddTransport(transport.Websocket{
		InitFunc: utils.WsAuthMiddleware(auth),
	})

	router := chi.NewRouter()
	if auth == nil {
		log.Fatal("Auth is nil")
	}
	router.Use(utils.Middleware(auth))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
