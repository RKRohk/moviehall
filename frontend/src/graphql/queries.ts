import {gql} from "@apollo/client";

export const GET_MESSAGES_QUERY =  gql`
query GetMessages($roomcode:String!){
  room{
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