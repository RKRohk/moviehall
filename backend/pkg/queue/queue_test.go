package queue

import (
	"log"
	"testing"
	"time"

	"github.com/rabbitmq/amqp091-go"
)

func TestMessageSent(t *testing.T) {
	conn := NewPublisher(&QueueConfig{URI: "amqp://guest:guest@rabbitmq:5672/"})
	defer conn.Close()

	channel, err := conn.Channel()
	if err != nil {
		log.Printf("Error opening channel %v", err)
		t.Fail()
	}

	q, _ := channel.QueueDeclare(
		"test", // name
		false,  // durable
		false,  // delete when unused
		false,  // exclusive
		false,  // no-wait
		nil,    // arguments
	)
	defer channel.Close()

	receive, err := channel.Consume(q.Name, "consumer1", false, false, false, false, nil)
	if err != nil {
		log.Printf("Error subscribing to queue %v", err)
		t.Fail()
	}
	go (func() {
		for message := range receive {
			log.Printf("Received message %s", message.Body)
			message.Ack(false)
		}
	})()

	err = channel.Publish("", q.Name, false, false, amqp091.Publishing{
		ContentType: "text/plain",
		Body:        []byte("HELLO WORLD"),
	})
	if err != nil {
		log.Printf("Failed to send message due to error %v", err)
	} else {
		log.Printf("Sent message\n")
	}
	<-time.After(1000 * time.Millisecond)
}
