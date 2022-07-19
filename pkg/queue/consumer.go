package queue

import (
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

type Consumer interface {
	Consume(queue_name string, host_name string) (<-chan *RabbitMQMessage, error)
}

type Message interface {
	Body() []byte
	Ack(bool) error
}

type RabbitMQMessage struct {
	message amqp.Delivery
}

func (message RabbitMQMessage) Body() []byte {
	return message.message.Body
}

func (message RabbitMQMessage) Ack(multiple bool) error {
	return message.message.Ack(multiple)
}

type RabbitMQConsumer struct {
	channel *amqp.Channel
}

func (rabbitmqConsumer RabbitMQConsumer) Consume(queue_name string, host_name string) (<-chan *RabbitMQMessage, error) {
	channel := make(chan *RabbitMQMessage, 1)

	consumer, err := rabbitmqConsumer.channel.Consume(queue_name, host_name, false, false, false, false, nil)
	if err != nil {
		log.Printf("error creating consumer %v\n", err)
		return nil, err
	}

	go func() {
		for message := range consumer {
			channel <- &RabbitMQMessage{message: message}
		}

	}()

	return channel, err
}

func NewConsumer(channel *amqp.Channel) *RabbitMQConsumer {
	return &RabbitMQConsumer{
		channel: channel,
	}
}
