import {gql} from "@apollo/client";


export const MESSAGES_BY_USER = gql(`
query Query($receiverId: Int!) {
	messagesByUser(receiverId: $receiverId) {
		id
		text
		receiverId
		senderId
		createdAt
	}
}
`)

export const GET_USERS = gql`
query Query {
  users {
    id
    firstName
    lastName
    email
  }
}
`