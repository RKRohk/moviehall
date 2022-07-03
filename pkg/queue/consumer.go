package queue

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type Consumer interface {
	Consume(queue_name string, host_name string) (<-chan (string), error)
}

type RabbitMQConsumer struct {
	channel *amqp.Channel
}

func (rabbitmqConsumer RabbitMQConsumer) Consume(queue_name string, host_name string) (<-chan (string), error) {
	channel := make(chan string, 1)

	consumer, err := rabbitmqConsumer.channel.Consume(queue_name, host_name, false, false, false, false, nil)
	if err != nil {
		log.Printf("error creating consumer %v\n", err)
		return nil, err
	}

	go func() {
		for message := range consumer {
			channel <- string(message.Body)
		}
	}()

	return channel, err
}

func NewConsumer(channel *amqp.Channel) *RabbitMQConsumer {
	return &RabbitMQConsumer{
		channel: channel,
	}
}
