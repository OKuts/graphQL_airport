import {gql} from "@apollo/client";

export const CREATE_DIRECT = gql`
    mutation($input: CreateDirectInput!){
      createDirect(input: $input) {
        id
        direct
      }
    }
`