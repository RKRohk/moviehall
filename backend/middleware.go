package main

import (
	"context"
	"net/http"

	"firebase.google.com/go/v4/auth"
	"github.com/rkrohk/moviehall/utils"
)

type contextKey struct {
	name string
}

var userCtxKey = &contextKey{"user"}

func middleWare(client *auth.Client) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			header := r.Header["Auth"]

			if len(header) == 0 {
				next.ServeHTTP(rw, r)
				return
			}

			user := utils.VerifyAndGetUser(client, header[0])

			userCtx := context.WithValue(r.Context(), userCtxKey, user)

			r = r.WithContext(userCtx)

			next.ServeHTTP(rw, r)
		})
	}
}
