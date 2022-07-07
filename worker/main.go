package main

import (
	"encoding/json"
	"log"
	"os"

	"github.com/rkrohk/moviehall/pkg/model"
	"github.com/rkrohk/moviehall/pkg/queue"
	"github.com/rkrohk/moviehall/worker/messaging"
)

const (
	PROCESSOR  = "processor"
	TRANSCODER = "transcoder"
)

func main() {
	rabbitmqURI := os.Getenv("RABBITMQ_URI")
	consumer := messaging.NewConsumer(&queue.ConnectionConfig{URI: rabbitmqURI})

	role := os.Getenv("ROLE") //role is either processor or transcoder
	if role == PROCESSOR {
		messages, _ := consumer.Consume("media_added", PROCESSOR)

		for message := range messages {
			var payload model.MediaAddedEvent
			json.Unmarshal(message.Body(), &payload)
			log.Printf("Received payload %v on media_added", payload)
			message.Ack(false)
		}
	}

}
