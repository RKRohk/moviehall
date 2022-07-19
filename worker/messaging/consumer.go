//go:build wireinject
// +build wireinject

package messaging

import (
	"github.com/google/wire"
	"github.com/rkrohk/moviehall/pkg/queue"
)

func NewConsumer(config *queue.ConnectionConfig) queue.Consumer {
	wire.Build(queue.NewConnection, queue.NewChannel, queue.NewConsumer, wire.Bind(new(queue.Consumer), new(*queue.RabbitMQConsumer)))
	return nil
}
