/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendMessage
// ====================================================

export interface sendMessage_sendMessage {
  __typename: "Action";
  payload: string;
}

export interface sendMessage {
  sendMessage: sendMessage_sendMessage;
}

export interface sendMessageVariables {
  roomCode: string;
  message: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRoom
// ====================================================

export interface createRoom_createRoom {
  __typename: "Room";
  code: string;
}

export interface createRoom {
  createRoom: createRoom_createRoom;
}

export interface createRoomVariables {
  uri: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: pause
// ====================================================

export interface pause {
  pause: boolean | null;
}

export interface pauseVariables {
  roomCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: play
// ====================================================

export interface play {
  play: boolean | null;
}

export interface playVariables {
  roomCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: seek
// ====================================================

export interface seek {
  seek: boolean | null;
}

export interface seekVariables {
  roomCode: string;
  timeStamp: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: update
// ====================================================

export interface update {
  update: boolean | null;
}

export interface updateVariables {
  roomCode: string;
  timeStamp: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userJoinedRoom
// ====================================================

export interface userJoinedRoom {
  join: boolean | null;
}

export interface userJoinedRoomVariables {
  roomCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMessages
// ====================================================

export interface GetMessages_room_actions_createdBy {
  __typename: "User";
  id: string;
  name: string;
  photoUri: string;
}

export interface GetMessages_room_actions {
  __typename: "Action";
  id: string;
  createdBy: GetMessages_room_actions_createdBy;
  createdAt: any;
  payload: string;
  actionType: ActionType;
}

export interface GetMessages_room {
  __typename: "Room";
  id: string;
  actions: GetMessages_room_actions[];
}

export interface GetMessages {
  room: GetMessages_room | null;
}

export interface GetMessagesVariables {
  roomCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTimeStamp
// ====================================================

export interface GetTimeStamp_room {
  __typename: "Room";
  id: string;
  timestamp: number;
}

export interface GetTimeStamp {
  room: GetTimeStamp_room | null;
}

export interface GetTimeStampVariables {
  roomCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOwner
// ====================================================

export interface GetOwner_room_owner {
  __typename: "User";
  id: string;
}

export interface GetOwner_room {
  __typename: "Room";
  id: string;
  owner: GetOwner_room_owner;
}

export interface GetOwner {
  room: GetOwner_room | null;
}

export interface GetOwnerVariables {
  roomCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MediaUrl
// ====================================================

export interface MediaUrl_room_media {
  __typename: "Media";
  uri: string;
}

export interface MediaUrl_room {
  __typename: "Room";
  timestamp: number;
  media: MediaUrl_room_media;
}

export interface MediaUrl {
  room: MediaUrl_room | null;
}

export interface MediaUrlVariables {
  roomCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubscribeToAction
// ====================================================

export interface SubscribeToAction_messages_createdBy {
  __typename: "User";
  id: string;
  name: string;
  photoUri: string;
}

export interface SubscribeToAction_messages {
  __typename: "Action";
  id: string;
  payload: string;
  createdBy: SubscribeToAction_messages_createdBy;
  createdAt: any;
  actionType: ActionType;
  actionTimeStamp: number | null;
}

export interface SubscribeToAction {
  messages: SubscribeToAction_messages;
}

export interface SubscribeToActionVariables {
  roomCode: string;
  userName: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: TimeStampSubscription
// ====================================================

export interface TimeStampSubscription {
  timeupdate: number;
}

export interface TimeStampSubscriptionVariables {
  roomCode: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ActionType {
  MESSAGE = "MESSAGE",
  PAUSE = "PAUSE",
  PLAY = "PLAY",
  SEEK = "SEEK",
  TYPING = "TYPING",
  UPDATE = "UPDATE",
  USER_JOIN = "USER_JOIN",
  USER_LEAVE = "USER_LEAVE",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
