import {gql} from "@apollo/client";

export const CREATE_USER = gql`
    mutation($input: CreateUserInput!){
      createUser(input: $input) {
        name
        age
        nationality
      }
    }
`