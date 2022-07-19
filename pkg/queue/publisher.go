package queue

//go:generate mockgen -destination mock_queue_test.go -package queue_test . RabbitMQPublisher,Publisher

import (
	"encoding/json"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type Publisher interface {
	Publish(message interface{}, queue_name string) error
}

type RabbitMQPublisher struct {
	channel *amqp.Channel
}

func NewConnection(config *ConnectionConfig) *amqp.Connection {
	conn, err := amqp.Dial(config.URI)
	if err != nil {
		log.Fatalf("Error creating connection %v", err)
	}
	return conn
}

func NewChannel(conn *amqp.Connection) *amqp.Channel {
	channel, err := conn.Channel()
	if err != nil {
		log.Panicf("Error opening channel %v", err)
	}
	return channel
}

func NewPublisher(channel *amqp.Channel) *RabbitMQPublisher {

	return &RabbitMQPublisher{
		channel: channel,
	}

}

func (publisher RabbitMQPublisher) Publish(message interface{}, queue_name string) error {
	body, err := json.Marshal(message)
	if err != nil {
		log.Printf("Failed to convert message %v to byte array: error: %v", message, err)
		return err
	}

	queue := NewQueue(publisher.channel, queue_name)

	err = publisher.channel.Publish("", queue.Name, false, false, amqp.Publishing{
		Body: body,
	})
	return err
}
