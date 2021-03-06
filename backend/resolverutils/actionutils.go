package resolverutils

import (
	"time"

	"github.com/rkrohk/moviehall/graph/model"
	"github.com/rkrohk/moviehall/utils"
)

func NewAction(createdBy *model.User, payload string, actionType model.ActionType, timestamp *int) *model.Action {

	newAction := &model.Action{
		ID:              utils.RandomString(16),
		CreatedBy:       createdBy,
		CreatedAt:       time.Now(),
		Payload:         payload,
		ActionType:      actionType,
		ActionTimeStamp: timestamp,
	}

	return newAction
}
