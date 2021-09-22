package model

type Room struct {
	Code      string   `json:"code"`
	Media     *Media   `json:"media"`
	Actions   []Action `json:"actions"`
	Members   []*User  `json:"members"`
	Timestamp int      `json:"timestamp"`
	Observers map[string]struct {
		User      User
		Action    chan *Action
		Timestamp chan int
	}
}
