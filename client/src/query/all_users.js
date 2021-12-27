import {gql} from "@apollo/client";

export const QUERY_ALL_USERS = gql`
    query{
      users {
        id
        name
        age
        nationality
        chosenFlights {
            id
            date
            time
            name
            direct
        }
      }
    }
`