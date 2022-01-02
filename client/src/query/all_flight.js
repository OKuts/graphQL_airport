import {gql} from "@apollo/client";

export const QUERY_ALL_FLIGHTS = gql`
    query{
      flights {
        id
        company
        direct
        date
        time
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