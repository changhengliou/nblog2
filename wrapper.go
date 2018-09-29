package main

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"os/signal"
)

func main() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	// file watcher start
	watcher, _ := fsnotify.NewWatcher()
	defer watcher.Close()

	cmd := exec.Command("go run main.go")
	r, _ := cmd.StdoutPipe()
	fmt.Println(ioutil.ReadAll(r))
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				if event.Op&fsnotify.Write == fsnotify.Write {
					err := cmd.Process.Kill()
					if err != nil {
						log.Println(err)
					}
					cmd = exec.Command("go run main.go")
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Println("error:", err)
			}
		}
	}()

	err := watcher.Add("config.json")
	if err != nil {
		log.Println(err)
	}
	cmd.Wait()

	<-c
	cmd.Process.Kill()
	os.Exit(0)
}
