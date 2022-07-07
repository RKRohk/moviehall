package model

type MediaAddedEvent struct {
	UserID    string `json:"userID"`
	MediaPath string `json:"mediaPath"`
	Title     string `json:"title"`
}
