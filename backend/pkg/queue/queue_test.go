package queue

import (
	"log"
	"sync"
	"testing"
)

var config = &ConnectionConfig{
	URI: "amqp://guest:guest@rabbitmq:5672/",
}

func TestMessageSentIntegrationTest(t *testing.T) {

	connection := NewConnection(config)
	channel := NewChannel(connection)

	//Purge queue before testing
	_, err := channel.QueueDelete("queue_test", false, false, false)
	if err != nil {
		log.Printf("Error deleting queue %v\n", err)
		t.Fail()
	}

	var wg sync.WaitGroup
	queue := NewQueue(channel, "queue_test")

	publisher := NewPublisher(channel)
	consumer, err := channel.Consume("queue_test", "queue_test_consumer", false, false, false, false, nil)
	if err != nil {
		log.Printf("Error creating consumer for channel %v: error %v\n", "queue_test", err)
		t.Fail()
	}

	//Create subscriber
	go func() {
		for message := range consumer {
			log.Printf("Received message %v\n", message)
			wg.Done()
		}
	}()

	messages := []string{"Hi", "User", "How", "Are", "You", "?"}

	for _, message := range messages {
		publisher.Publish(message, queue)
		log.Println("Published message ", message, " to queue", "queue_test")
		wg.Add(1)
	}

	wg.Wait()
}
