package main

import (
	"context"
	"fmt"
	"github.com/gorilla/mux"
	gqlHandler "github.com/graphql-go/handler"
	"github.com/qq52184962/nblog2/config"
	gqlSchema "github.com/qq52184962/nblog2/gql"
	"github.com/qq52184962/nblog2/router"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path"
	"strings"
	"text/template"
	"time"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	files := path.Join("static", "index.html")
	html, _ := template.ParseFiles(files)
	html.Execute(w, nil)
}

func IHandler(w http.ResponseWriter, r *http.Request) {
	panic("wrong...")
}

func sayhelloName(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()       //解析参数，默认是不会解析的
	fmt.Println(r.Form) //这些信息是输出到服务器端的打印信息
	fmt.Println("path", r.URL.Path)
	fmt.Println("scheme", r.URL.Scheme)
	fmt.Println(r.Form["url_long"])
	for k, v := range r.Form {
		fmt.Println("key:", k)
		fmt.Println("val:", strings.Join(v, ""))
	}
	fmt.Fprintf(w, "Hello astaxie!") //这个写入到w的是输出到客户端的
}

// cleanup code
func closeServer(server *http.Server) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()

	server.Shutdown(ctx)
	log.Println("server shutting down...")
}

func initServer(cfg *config.Config) *http.Server {
	router := mux.NewRouter()

	// serve static file
	router.PathPrefix(fmt.Sprintf("/%s/", cfg.StaticRoutePrefix)).Handler(http.StripPrefix(fmt.Sprintf("/%s/", cfg.StaticRoutePrefix), http.FileServer(http.Dir(cfg.StaticDir))))

	// graphql
	router.Handle("/gql", gqlHandler.New(&gqlHandler.Config{
		Schema:   &gqlSchema.Schema,
		Pretty:   true,
		GraphiQL: true,
	}))

	// register route handler
	router.HandleFunc("/", IndexHandler)
	router.HandleFunc("/s", IHandler)

	// middleware
	router.Use(route.ErrorHandler)
	router.Use(route.Logger)
	// custom not found handler
	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Request not found."))
	})

	server := &http.Server{
		Addr:         fmt.Sprintf("0.0.0.0:%d", cfg.ListenPort),
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      router,
	}
	return server
}

func main() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, os.Kill)

	cfg := config.Read()

	server := initServer(&cfg)

	go func() {
		if err := server.ListenAndServe(); err != nil {
			log.Println(err)
		}
	}()

	<-c

	// handle shutdown
	closeServer(server)
	log.Println("exit ...")
	os.Exit(0)
}
