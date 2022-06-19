package queue

import (
	"log"
	"sync"
	"testing"
)

var config = &QueueConfig{
	URI:       "amqp://guest:guest@rabbitmq:5672/",
	QueueName: "queue_test",
}

func TestMessageSentIntegrationTest(t *testing.T) {

	connection := NewConnection(config)
	channel, err := connection.Channel()
	if err != nil {
		log.Println("Error creating channel ", err)
		t.Fail()
	}

	//Purge queue before testing
	_, err = channel.QueueDelete(config.QueueName, false, false, false)
	if err != nil {
		log.Printf("Error deleting queue %v\n", err)
		t.Fail()
	}

	var wg sync.WaitGroup
	publisher := NewPublisher(config)
	consumer, err := channel.Consume(publisher.queue.Name, "queue_test_consumer", false, false, false, false, nil)
	if err != nil {
		log.Printf("Error creating consumer for channel %v: error %v\n", publisher.queue.Name, err)
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
		publisher.Publish(message)
		log.Println("Published message ", message, " to queue", publisher.queue.Name)
		wg.Add(1)
	}

	wg.Wait()
}
