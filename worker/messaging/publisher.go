package messaging

import "github.com/rkrohk/moviehall/pkg/queue"

func Publisher() queue.Publisher {
	connection := queue.NewConnection(&queue.ConnectionConfig{URI: "amqp://guest:guest@rabbitmq:5672/"})
	channel := queue.NewChannel(connection)
	return queue.NewPublisher(channel)
}
