package queue

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type Publisher interface {
	Publish(message interface{}) error
}

func NewPublisher(config *QueueConfig) *amqp.Connection {
	conn, err := amqp.Dial(config.URI)
	if err != nil {
		log.Fatalf("Error creating connection %v", err)
	}
	return conn
}
