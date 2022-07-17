//go:build wireinject
// +build wireinject

package messaging

import (
	"github.com/google/wire"
	"github.com/rkrohk/moviehall/pkg/queue"
)

func NewPublisher(config *queue.ConnectionConfig) queue.Publisher {
	wire.Build(queue.NewConnection, queue.NewChannel, queue.NewPublisher, wire.Bind(new(queue.Publisher), new(*queue.RabbitMQPublisher)))

	return nil
}
