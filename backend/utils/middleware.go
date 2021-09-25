package utils

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"firebase.google.com/go/v4/auth"
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

			if header == nil || len(header) == 0 {
				next.ServeHTTP(rw, r)
			} else {

				bearerToken := strings.Replace(header[0], "Bearer", "", 1)
				bearerToken = strings.Trim(bearerToken, " ")
				fmt.Println(bearerToken)
				user := VerifyAndGetUser(client, bearerToken)

				userCtx := context.WithValue(r.Context(), userCtxKey, user)

				r = r.WithContext(userCtx)

				next.ServeHTTP(rw, r)
			}

		})
	}
}

func UserFromContext(ctx context.Context) *model.User {
	raw, _ := ctx.Value(userCtxKey).(*model.User)
	return raw
}
