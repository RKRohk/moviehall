// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//+build !wireinject

package messaging

import (
	"github.com/rkrohk/moviehall/pkg/queue"
)

// Injectors from consumer.go:

func NewConsumer(config *queue.ConnectionConfig) queue.Consumer {
	connection := queue.NewConnection(config)
	channel := queue.NewChannel(connection)
	rabbitMQConsumer := queue.NewConsumer(channel)
	return rabbitMQConsumer
}