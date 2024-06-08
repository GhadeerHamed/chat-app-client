import {gql} from '@apollo/client'

export const SIGNUP_USER = gql`
mutation SignUp($input: UserRegisterInput!) {
	signupUser(input: $input) {
		id
		firstName
		lastName
		email
		createdAt
	}
}`

export const LOGIN_USER = gql`
mutation SigninUser($input: UserSigninInput!) {
  signinUser(input: $input) {
    token
  }
}
`
export const SEND_MESSAGE = gql`
mutation Mutation($input: MessageInput!) {
  createMessage(input: $input) {
    id
    text
    createdAt
    receiverId
    senderId
  }
}
`
