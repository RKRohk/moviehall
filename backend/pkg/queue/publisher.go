package queue

//go:generate mockgen -destination mock_queue_test.go -package queue_test . RabbitMQPublisher,Publisher

import (
	"encoding/json"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type Publisher interface {
	Publish(message interface{}) error
}

type RabbitMQPublisher struct {
	channel *amqp.Channel
	queue   *amqp.Queue
}

func NewConnection(config *QueueConfig) *amqp.Connection {
	conn, err := amqp.Dial(config.URI)
	if err != nil {
		log.Fatalf("Error creating connection %v", err)
	}
	return conn
}

func NewPublisher(config *QueueConfig) *RabbitMQPublisher {
	conn := NewConnection(config)

	channel, err := conn.Channel()
	if err != nil {
		log.Panicf("Error opening channel %v", err)
	}

	queue, err := channel.QueueDeclare(config.QueueName, true, false, false, false, nil)
	if err != nil {
		log.Panicf("Could not declare queue %v: error: %v", config.QueueName, err)
	}

	return &RabbitMQPublisher{
		queue:   &queue,
		channel: channel,
	}

}

func (publisher RabbitMQPublisher) Publish(message interface{}) error {
	body, err := json.Marshal(message)
	if err != nil {
		log.Printf("Failed to convert message %v to byte array: error: %v", message, err)
		return err
	}
	err = publisher.channel.Publish("", publisher.queue.Name, false, false, amqp.Publishing{
		Body: body,
	})
	return err
}
