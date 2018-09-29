package route

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path"
)

// Middleware :
type Middleware func(http.Handler) http.Handler

// ApplyMiddlewares : utility function that does chain middleware
func ApplyMiddlewares(h http.Handler, middlewares ...Middleware) http.Handler {
	for _, middleware := range middlewares {
		h = middleware(h)
	}
	return h
}

// ErrorHandler : a middleware that handles all the panics from router. once recover, return
// 500 and a custom error page to the user
func ErrorHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("panic: %+v", err)
				w.WriteHeader(http.StatusInternalServerError)
				f, _ := os.Open(path.Join("static", "error.html"))
				io.Copy(w, f)
			}
		}()

		next.ServeHTTP(w, r)
	})
}

// Logger : a log middleware
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf(fmt.Sprintf("[%s]: %s", r.RemoteAddr, r.RequestURI))
		next.ServeHTTP(w, r)
	})
}
