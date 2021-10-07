import {gql} from "@apollo/client";

export const GET_MESSAGES_QUERY =  gql`
query GetMessages($roomCode:ID!){
  room(code:$roomCode){
    actions{
    createdBy{
      id
      name
      photoUri
    }
  createdAt
  payload
  actionType
}
  }
}
`

export const GET_TIMESTAMP_QUERY = gql`
query GetTimeStamp($roomCode:ID!) {
  room(code:$roomCode){
    timestamp
  }
}
`