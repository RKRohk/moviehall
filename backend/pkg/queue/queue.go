package queue

import (
	"log"
	"os"

	"github.com/rabbitmq/amqp091-go"
)

type ConnectionConfig struct {
	URI string
}
type QueueConfig struct {
	QueueName string
}

func NewConfig(URI string) ConnectionConfig {
	return ConnectionConfig{URI: URI}
}

func NewDefaultConfig() *ConnectionConfig {
	amqpURI := os.Getenv("AMQP_URI")
	if amqpURI == "" {
		log.Panic("Empty amqpURI present")
	}
	return &ConnectionConfig{
		URI: amqpURI,
	}
}

func NewQueue(channel *amqp091.Channel, queue_name string) *amqp091.Queue {
	queue, err := channel.QueueDeclare(queue_name, true, false, false, false, nil)
	if err != nil {
		log.Panicf("Could not declare queue %v: error: %v", queue_name, err)
	}
	return &queue
}
