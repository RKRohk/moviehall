package main

import (
	"encoding/json"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func createTasks() {
	conn, err := amqp.Dial(rabbitMQURL)
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"conversion_queue", // name
		false,              // durable
		false,              // delete when unused
		false,              // exclusive
		false,              // no-wait
		nil,                // arguments
	)
	failOnError(err, "Failed to declare a queue")

	tasks := []*Task{
		{ID: "1", CreatedBy: "rohan", CreatedAt: time.Now(), Status: "pending", Type: FullHD},
		{ID: "2", CreatedBy: "rohan", CreatedAt: time.Now(), Status: "pending", Type: HD},
		{ID: "3", CreatedBy: "rohan", CreatedAt: time.Now(), Status: "pending", Type: SD},
		{ID: "4", CreatedBy: "rohan", CreatedAt: time.Now(), Status: "pending", Type: LOW},
		{ID: "5", CreatedBy: "rohan", CreatedAt: time.Now(), Status: "pending", Type: SUB},
	}

	for _, task := range tasks {
		body, err := json.Marshal(task)
		if err != nil {
			failOnError(err, "Failed to marshal task")
		}
		err = ch.Publish(
			"",     // exchange
			q.Name, // routing key
			false,  // mandatory
			false,
			amqp.Publishing{
				DeliveryMode: amqp.Persistent,
				ContentType:  "text/plain",
				Body:         body,
			})
		failOnError(err, "Failed to publish a message")
		log.Printf(" [x] Sent %s", body)
	}
}
