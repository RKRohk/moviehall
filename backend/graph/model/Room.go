package model

type Room struct {
	ID               string    `json:"id"`
	Code             string    `json:"code"`
	Media            *Media    `json:"media"`
	Actions          []*Action `json:"actions"`
	Members          []*User   `json:"members"`
	Timestamp        int       `json:"timestamp"`
	Owner            *User     `json:"owner"`
	MessageObservers map[string]struct {
		Action chan *Action
	}
	TimeStampObservers map[string]struct {
		Timestamp chan int
	}
}
