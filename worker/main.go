package main

import (
	"encoding/json"
	"log"
	"os"
	"regexp"

	"github.com/rkrohk/moviehall/pkg/model"
	"github.com/rkrohk/moviehall/pkg/queue"
	"github.com/rkrohk/moviehall/worker/messaging"
	ffmpeg_go "github.com/u2takey/ffmpeg-go"
)

const (
	PROCESSOR  = "processor"
	TRANSCODER = "transcoder"
)

func main() {
	rabbitmqURI := os.Getenv("RABBITMQ_URI")
	config := &queue.ConnectionConfig{URI: rabbitmqURI}
	consumer := messaging.NewConsumer(config)
	publisher := messaging.NewPublisher(config)

	role := os.Getenv("ROLE") //role is either processor or transcoder
	if role == PROCESSOR {
		messages, _ := consumer.Consume("media_added", PROCESSOR)

		for message := range messages {
			var payload model.MediaAddedEvent
			json.Unmarshal(message.Body(), &payload)
			log.Printf("Received payload %v on media_added", payload)
			message.Ack(false)
			reg := regexp.MustCompile(`.*\....`)
			newFileName := reg.ReplaceAllString(payload.MediaPath, ".mp4")
			log.Printf("saving %s to %s after conversion\n", payload.MediaPath, newFileName)
			log.Printf("starting to convert %s", payload.MediaPath)
			err := ffmpeg_go.Input(payload.MediaPath).Output(newFileName, ffmpeg_go.KwArgs{"c:v": "libx264", "crf": "20"}).Run()
			if err != nil {
				log.Printf("error converting file %v", err)
			} else {
				log.Printf("conversion complete")
			}
			publisher.Publish("saved!", "conversion_complete")

		}
	}

}
