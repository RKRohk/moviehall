package queue

import (
	"log"
	"sync"
	"testing"
)

func TestConsumer(t *testing.T) {

	connection := NewConnection(config)
	channel := NewChannel(connection)

	// Purge queue before testing
	_, err := channel.QueueDelete(TEST_QUEUE_NAME, false, false, false)
	if err != nil {
		log.Printf("Error deleting queue %v\n", err)
		t.Fail()
	}

	var wg sync.WaitGroup

	var publisher Publisher = NewPublisher(channel)

	messages := []string{"Hi", "User", "How", "Are", "You", "?"}

	for _, message := range messages {
		publisher.Publish(message, TEST_QUEUE_NAME)
		log.Println("Published message ", message, " to queue", "queue_test")
		wg.Add(1)
	}

	consumer := NewConsumer(channel)

	messageChan, err := consumer.Consume(TEST_QUEUE_NAME, "consumer_tester")

	if err != nil {
		log.Printf("Error creating consumer : %v", err)
	}

	//Create subscriber
	go func() {
		for message := range messageChan {
			log.Printf("Received message %v\n", message)
			wg.Done()
		}
	}()

	wg.Wait()
}
