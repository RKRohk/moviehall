package auth

import "net/http"

type contextKey struct {
	name string
}

var userCtxKey = &contextKey{"user"}

func MiddleWare() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			_, err := r.Cookie("auth-cookie")

			if err != nil {
				http.Error(rw, "invalid cookie", http.StatusForbidden)
			}

		})
	}
}
