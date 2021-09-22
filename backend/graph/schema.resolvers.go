package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/rkrohk/moviehall/graph/generated"
	"github.com/rkrohk/moviehall/graph/model"
)

func (r *mutationResolver) CreateRoom(ctx context.Context, roomCode string, uri model.MediaInput) (*model.Room, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) SendMessage(ctx context.Context, roomCode string, message model.MessageInput) (model.Action, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Pause(ctx context.Context, roomCode string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Play(ctx context.Context, roomCode string) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Seek(ctx context.Context, roomCode string, timeStamp int) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) Update(ctx context.Context, roomCode string, timeStamp int) (*bool, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Media(ctx context.Context) ([]*model.Media, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Room(ctx context.Context, code string) (*model.Room, error) {

	//lock
	r.mu.Lock()
	room := r.Rooms[code]

	if room != nil {
		return room, nil
	}

	return nil, fmt.Errorf("Room %s not found", code)
}

func (r *subscriptionResolver) Messages(ctx context.Context, roomCode string) (<-chan model.Action, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *subscriptionResolver) Timeupdate(ctx context.Context, roomCode string) (<-chan int, error) {
	panic(fmt.Errorf("not implemented"))
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
