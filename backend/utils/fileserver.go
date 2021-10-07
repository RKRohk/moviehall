package utils

import (
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
)

//FileServer takes the root path of the server and returns a server which serves files from that path
func FileServer(root http.FileSystem) func(w http.ResponseWriter, r *http.Request) {

	return func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())

		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(root))
		fs.ServeHTTP(w, r)
	}
}
