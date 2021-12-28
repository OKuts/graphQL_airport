import {gql} from "@apollo/client";

export const QUERY_ONE_USER = gql`
    query ($id: ID!){
      user(id: $id) {
        id
        name
        age
        nationality
        doneFlights
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