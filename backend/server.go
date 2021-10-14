package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/gorilla/websocket"
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

	srv := handler.New(newExecutableSchema)

	//For graphql as graphql uses POST
	srv.AddTransport(transport.POST{})

	srv.AddTransport(transport.GET{})

	srv.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		// InitFunc:              utils.WsAuthMiddleware(auth),
		Upgrader: websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin:     func(r *http.Request) bool { return true },
		},
	})

	srv.Use(extension.Introspection{})

	router := chi.NewRouter()
	if auth == nil {
		log.Fatal("Auth is nil") // Die if you can't get authentication running
	}
	router.Use(utils.Middleware(auth))

	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	workDir, _ := os.Getwd()
	videosDirectory := http.Dir(filepath.Join(workDir, "/videos"))

	router.Get("/videos/*", utils.FileServer(videosDirectory))

	// staticPath := "build"
	// indexPath := "index.html"
	// router.HandleFunc("/", utils.IndexRouter(staticPath, indexPath))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
