import {gql} from "@apollo/client";

export const QUERY_ALL_USERS = gql`
    query{
      users {
        id
        name
        username
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