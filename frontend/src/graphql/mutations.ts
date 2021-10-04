import {gql} from "@apollo/client"
export const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage($roomCode:String!,$message:String!){
        sendMessage(roomCode:$roomCode,message:$message){
            payload
        }
    }
`