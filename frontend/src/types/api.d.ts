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
  createdBy: GetMessages_room_actions_createdBy;
  createdAt: any;
  payload: string;
  actionType: ActionType;
}

export interface GetMessages_room {
  __typename: "Room";
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
  payload: string;
  createdBy: SubscribeToAction_messages_createdBy;
  createdAt: any;
  actionType: ActionType;
}

export interface SubscribeToAction {
  messages: SubscribeToAction_messages;
}

export interface SubscribeToActionVariables {
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
}

//==============================================================
// END Enums and Input Objects
//==============================================================
