package main

import (
	"encoding/json"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

var rabbitMQURL = "amqp://guest:guest@100.98.192.5:5672/"

func main() {

	conn, err := amqp.Dial(rabbitMQURL)
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"conversion_queue",
		false,
		false,
		false,
		false,
		nil)

	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name,
		"",
		false,
		false,
		false,
		false,
		nil,
	)

	failOnError(err, "Failed to register a consumer")

	forever := make(chan bool)

	log.Println("Listening for tasks")

	go func() {
		for msg := range msgs {
			log.Println("Received a message: ", string(msg.Body))
			var task Task
			err := json.Unmarshal(msg.Body, &task)
			if err != nil {
				log.Println("Error unmarshalling message: ", err)
			}
			time.Sleep(time.Duration(2) * time.Second)
			msg.Ack(true)
			log.Println("Task: ", task)
		}
	}()

	<-forever

}
