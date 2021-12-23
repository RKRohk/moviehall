package main

import "time"


type TaskType string

const (
	FullHD TaskType = "1080p"
	HD TaskType = "720p"
	SD TaskType = "480p"
	LOW TaskType = "360p"
	SUB TaskType = "SUB"
)

type Task struct {
	ID string `json:"id"`
	CreatedBy string `json:"created_by"`
	CreatedAt time.Time `json:"created_at"`
	Type TaskType `json:"type"`
	Status string `json:"status"`
}