import {gql} from "@apollo/client";

export const CREATE_CLIENT = gql`
    mutation($input: CreateClientInput!){
      createClient(input: $input) {
        id
        name
        surname
        age
        citizenship
      }
    }
`