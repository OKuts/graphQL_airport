import {gql} from "@apollo/client";

export const QUERY_ALL_FLIGHTS = gql`
    query{
      flights {
        id
        date
        name
        direct
        passengers {
            id
            name
            surname
            age
            citizenship
        }
      }
    }
`