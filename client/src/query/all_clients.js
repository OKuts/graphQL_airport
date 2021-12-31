import {gql} from "@apollo/client";

export const QUERY_ALL_CLIENTS = gql`
    query{
      clients {
        id
        name
        surname
        age
        citizenship
        chosenFlights {
            date
            time
            company
            direct
        }
      }
    }
`