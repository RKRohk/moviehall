import {gql} from '@apollo/client'
export const SUBSCRIBE_TO_ACTION = gql`
subscription SubscribeToAction($roomCode:String!){
  messages(roomCode:$roomCode) {
    payload
    createdBy{
      id
      name
      photoUri
    }
    createdAt
    actionType
  }
}
`