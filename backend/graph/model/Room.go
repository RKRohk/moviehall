package model

type Room struct {
	Code             string    `json:"code"`
	Media            *Media    `json:"media"`
	Actions          []*Action `json:"actions"`
	Members          []*User   `json:"members"`
	Timestamp        int       `json:"timestamp"`
	MessageObservers map[string]struct {
		Action chan *Action
	}
	TimeStampObservers map[string]struct {
		Timestamp chan int
	}
}
