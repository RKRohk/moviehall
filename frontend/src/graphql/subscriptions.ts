import {gql} from '@apollo/client'
export const SUBSCRIBE_TO_ACTION = gql`
subscription SubscribeToAction($roomCode:String!){
  messages(roomCode:$roomCode) {
    id
    payload
    createdBy{
      id
      name
      photoUri
    }
    createdAt
    actionType
    actionTimeStamp
  }
}
`

export const SUBSCRIBE_TO_TIMESTAMP = gql`
  subscription TimeStampSubscription($roomCode:String!){
    timeupdate(roomCode:$roomCode)
  }
`