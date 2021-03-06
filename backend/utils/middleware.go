package utils

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"firebase.google.com/go/v4/auth"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/rkrohk/moviehall/graph/model"
)

type contextKey struct {
	name string
}

var userCtxKey = &contextKey{"user"}

func Middleware(client *auth.Client) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			header := r.Header["Auth"]
			if len(header) == 0 {
				next.ServeHTTP(rw, r)
			} else {

				bearerToken := strings.Replace(header[0], "Bearer", "", 1)
				bearerToken = strings.Trim(bearerToken, " ")
				user := VerifyAndGetUser(client, bearerToken)

				userCtx := context.WithValue(r.Context(), userCtxKey, user)

				r = r.WithContext(userCtx)

				next.ServeHTTP(rw, r)
			}

		})
	}
}

func WsAuthMiddleware(auth *auth.Client) func(ctx context.Context, initPayload transport.InitPayload) (context.Context, error) {

	fmt.Println("returning middleware")
	return func(ctx context.Context, initPayload transport.InitPayload) (context.Context, error) {
		// fmt.Println(initPayload)
		header := initPayload.GetString("Auth")

		// fmt.Println(header)
		bearerToken := header
		bearerToken = strings.Replace(bearerToken, "Bearer", "", 1)
		bearerToken = strings.Trim(bearerToken, " ")

		// get the user from the database
		user := VerifyAndGetUser(auth, bearerToken)

		// put it in context
		userCtx := context.WithValue(ctx, userCtxKey, user)

		// and return it so the resolvers can see it
		return userCtx, nil
	}
}

func UserFromContext(ctx context.Context) *model.User {
	raw, _ := ctx.Value(userCtxKey).(*model.User)
	return raw
}

func IndexRouter(staticPath, indexPath string) func(rw http.ResponseWriter, r *http.Request) {
	return func(rw http.ResponseWriter, r *http.Request) {
		path, err := filepath.Abs(r.URL.Path)
		if err != nil {

			http.Error(rw, err.Error(), http.StatusBadRequest)
			return
		}
		path = filepath.Join(staticPath, path)

		_, err = os.Stat(path)
		if os.IsNotExist(err) {
			http.ServeFile(rw, r, filepath.Join(staticPath, indexPath))
			return
		} else if err != nil {

			http.Error(rw, err.Error(), http.StatusInternalServerError)
			return
		}

		http.FileServer(http.Dir(staticPath)).ServeHTTP(rw, r)
	}
}
