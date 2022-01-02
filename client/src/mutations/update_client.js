import {gql} from "@apollo/client";

export const UPDATE_CLIENT = gql`
    mutation Mutation($input: UpdateClientInput!) {
      updateClient(input: $input) {
        id
      }
    }
`