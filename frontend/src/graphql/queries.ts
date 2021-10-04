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
}
  }
}
`