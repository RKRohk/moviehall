package resolverutils

import (
	"github.com/rkrohk/moviehall/graph/model"
	"github.com/rkrohk/moviehall/utils"
)

//NewRoom creates a new room using creater and media uri
func NewRoom(creator *model.User, uri string) *model.Room {

	roomCode := utils.RandomString(8)

	newRoom := &model.Room{
		ID:                 roomCode,
		Code:               roomCode,
		Media:              &model.Media{URI: uri},
		MessageObservers:   make(map[string]struct{ Action chan *model.Action }),
		Timestamp:          0,
		TimeStampObservers: map[string]struct{ Timestamp chan int }{},
		Owner:              creator,
	}

	return newRoom
}
