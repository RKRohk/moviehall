package messaging

import "github.com/rkrohk/moviehall/pkg/queue"

func NewConsumer() queue.Consumer {
	connection := queue.NewConnection(&queue.ConnectionConfig{URI: "amqp://guest:guest@rabbitmq:5672/"})
	channel := queue.NewChannel(connection)
	return queue.NewConsumer(channel)
}
