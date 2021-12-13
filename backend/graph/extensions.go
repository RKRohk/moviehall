package graph

import "github.com/rkrohk/moviehall/graph/model"

func (r *Resolver) addRoom(room *model.Room) {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.Rooms[room.Code] = room
}

func (r *Resolver) addActionToRoom(room *model.Room, action *model.Action) {
	room.Actions = append(room.Actions, action)
}
