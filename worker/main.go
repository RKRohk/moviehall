package main

import (
	"log"

	"github.com/rkrohk/moviehall/worker/messaging"
)

func main() {
	println("HELLo")
	messages, _ := messaging.NewConsumer().Consume("queue_test", "test_host")
	for message := range messages {
		log.Printf("received message %v", message)
	}
}
