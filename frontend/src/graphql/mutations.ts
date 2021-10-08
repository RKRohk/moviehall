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

export const PAUSE_MUTATION = gql`
    mutation pause($roomCode:String!) {
        pause(roomCode:$roomCode)
    }
`

export const PLAY_MUTATION = gql`
    mutation play($roomCode:String!) {
        play(roomCode:$roomCode)
    }
`

export const SEEK_MUTATION = gql`
    mutation seek($roomCode:String!,$timeStamp:Int!) {
        seek(roomCode:$roomCode,timeStamp:$timeStamp)
    }
`