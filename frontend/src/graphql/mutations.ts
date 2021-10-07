import {gql} from "@apollo/client"
export const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage($roomCode:String!,$message:String!){
        sendMessage(roomCode:$roomCode,message:$message){
            payload
        }
    }
`

export const CREATE_ROOM_MUTATION = gql`
    mutation createRoom($uri:String!){
        createRoom(uri:{uri:$uri}) {
            code
        }
    }
`