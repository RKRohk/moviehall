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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
