package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"time"

	"github.com/rkrohk/moviehall/graph/generated"
	"github.com/rkrohk/moviehall/graph/model"
	"github.com/rkrohk/moviehall/utils"
)

func (r *mutationResolver) CreateRoom(ctx context.Context, uri model.MediaInput) (*model.Room, error) {
	r.mu.Lock()

	defer r.mu.Unlock()

	user := utils.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("user is not authenticated")
	}

	roomCode := utils.RandomString(8)
	newRoom := &model.Room{
		ID:                 roomCode,
		Code:               roomCode,
		Media:              &model.Media{URI: uri.URI},
		MessageObservers:   make(map[string]struct{ Action chan *model.Action }),
		Timestamp:          0,
		TimeStampObservers: map[string]struct{ Timestamp chan int }{},
		Owner:              user,
	}
	r.Rooms[roomCode] = newRoom

	return newRoom, nil
}

func (r *mutationResolver) SendMessage(ctx context.Context, roomCode string, message string) (*model.Action, error) {
	//TODO(check if user is authenticated and if user is in the room)

	//TODO(get user from context)

	r.mu.Lock()

	defer r.mu.Unlock()

	room := r.Rooms[roomCode]

	if room == nil {
		return nil, fmt.Errorf("Room %s does not exist", roomCode)
	}

	user := utils.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("user is not authenticated")
	}

	newMessage := &model.Action{
		ID:         utils.RandomString(16),
		CreatedBy:  user,
		CreatedAt:  time.Now(),
		Payload:    message,
		ActionType: model.ActionTypeMessage,
	}

	room.Actions = append(room.Actions, newMessage)

	//Sending the new message to every user in the room
	for _, observer := range room.MessageObservers {
		observer.Action <- newMessage
	}

	return newMessage, nil
}

func (r *mutationResolver) Pause(ctx context.Context, roomCode string) (*bool, error) {
	r.mu.Lock()

	defer r.mu.Unlock()

	room := r.Rooms[roomCode]

	if room == nil {
		return nil, fmt.Errorf("Room %s does not exist", roomCode)
	}

	user := utils.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("user is not authenticated")
	}

	if user.ID != room.Owner.ID {
		return nil, fmt.Errorf("user is not room owner")
	}

	newAction := &model.Action{
		ID:         utils.RandomString(10),
		CreatedBy:  user,
		CreatedAt:  time.Now(),
		Payload:    fmt.Sprintf("%s paused the video", user.Name),
		ActionType: model.ActionTypePause,
	}

	room.Actions = append(room.Actions, newAction)

	//Sending the new pause action to every user in the room
	for _, observer := range room.MessageObservers {
		observer.Action <- newAction
	}

	//TODO URGENT! FIX THIS RETURN TYPE ISSUE IT IS A MEMORY LEAK!!!
	return &ret, nil
}

func (r *mutationResolver) Play(ctx context.Context, roomCode string) (*bool, error) {
	r.mu.Lock()

	defer r.mu.Unlock()

	room := r.Rooms[roomCode]

	if room == nil {
		return nil, fmt.Errorf("Room %s does not exist", roomCode)
	}

	user := utils.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("user is not authenticated")
	}

	if user.ID != room.Owner.ID {
		return nil, fmt.Errorf("user is not room owner")
	}

	newAction := &model.Action{
		ID:         utils.RandomString(10),
		CreatedBy:  user,
		CreatedAt:  time.Now(),
		Payload:    fmt.Sprintf("%s played the video", user.Name),
		ActionType: model.ActionTypePlay,
	}

	room.Actions = append(room.Actions, newAction)

	//Sending the new pause action to every user in the room
	for _, observer := range room.MessageObservers {
		observer.Action <- newAction
	}

	//TODO URGENT! FIX THIS RETURN TYPE ISSUE IT IS A MEMORY LEAK!!!
	return &ret, nil
}

func (r *mutationResolver) Seek(ctx context.Context, roomCode string, timeStamp int) (*bool, error) {
	r.mu.Lock()

	defer r.mu.Unlock()

	room := r.Rooms[roomCode]

	if room == nil {
		return nil, fmt.Errorf("Room %s does not exist", roomCode)
	}

	user := utils.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("user is not authenticated")
	}

	if user.ID != room.Owner.ID {
		return nil, fmt.Errorf("user is not room owner")
	}

	newAction := &model.Action{
		ID:              utils.RandomString(10),
		CreatedBy:       user,
		CreatedAt:       time.Now(),
		Payload:         fmt.Sprintf("%s seeked the video", user.Name),
		ActionType:      model.ActionTypeSeek,
		ActionTimeStamp: &timeStamp,
	}

	room.Actions = append(room.Actions, newAction)

	//Sending the new pause action to every user in the room
	for _, observer := range room.MessageObservers {
		observer.Action <- newAction
	}

	//TODO URGENT! FIX THIS RETURN TYPE ISSUE IT IS A MEMORY LEAK!!!
	return &ret, nil
}

func (r *mutationResolver) Update(ctx context.Context, roomCode string, timeStamp int) (*bool, error) {

	r.mu.Lock()
	defer r.mu.Unlock()

	room := r.Rooms[roomCode]

	if room == nil {
		return nil, fmt.Errorf("roomcode %s not found", roomCode)
	}

	user := utils.UserFromContext(ctx)

	if user == nil {
		return nil, fmt.Errorf("user is not authenticated")
	}

	//Also check if user is admin, //TODO later

	room.Timestamp = timeStamp

	//update the time on subscribers
	for _, observer := range room.TimeStampObservers {
		observer.Timestamp <- timeStamp
	}

	return &ret, nil

}

func (r *queryResolver) Media(ctx context.Context) ([]*model.Media, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Room(ctx context.Context, code string) (*model.Room, error) {
	r.mu.Lock()
	room := r.Rooms[code]
	r.mu.Unlock()
	if room != nil {
		return room, nil
	}

	return nil, fmt.Errorf("Room %s not found", code)
}

func (r *subscriptionResolver) Messages(ctx context.Context, roomCode string) (<-chan *model.Action, error) {
	room := r.Rooms[roomCode]

	if room == nil {
		return nil, fmt.Errorf("roomcode %s does not exist", roomCode)
	}

	//Start using Firebase Token ID or something later
	userID := utils.RandomString(10)

	actions := make(chan *model.Action, 1)
	room.MessageObservers[userID] = struct {
		Action chan *model.Action
	}{
		Action: actions,
	}

	go func() {
		<-ctx.Done()
		r.mu.Lock()
		delete(room.MessageObservers, userID)
		r.mu.Unlock()
	}()

	return actions, nil
}

func (r *subscriptionResolver) Timeupdate(ctx context.Context, roomCode string) (<-chan int, error) {
	room := r.Rooms[roomCode]

	if room == nil {
		return nil, fmt.Errorf("roomcode %s does not exist", roomCode)
	}

	//Start using Firebase Token ID or something later
	userID := utils.RandomString(10)

	timestamp := make(chan int, 1)
	room.TimeStampObservers[userID] = struct {
		Timestamp chan int
	}{
		Timestamp: make(chan int),
	}

	go func() {
		<-ctx.Done()
		r.mu.Lock()
		delete(room.TimeStampObservers, userID)
		r.mu.Unlock()
	}()

	return timestamp, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Subscription returns generated.SubscriptionResolver implementation.
func (r *Resolver) Subscription() generated.SubscriptionResolver { return &subscriptionResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }

var ret bool = true
