import {gql} from '@apollo/client'
export const SUBSCRIBE_TO_ACTION = gql`
subscription SubscribeToAction($roomCode:String!,$userName:String!){
  messages(roomCode:$roomCode,userName:$userName) {
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