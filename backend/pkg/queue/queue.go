package queue

type QueueConfig struct {
	URI       string
	QueueName string
}

func NewConfig(URI string) QueueConfig {
	return QueueConfig{URI: URI}
}
