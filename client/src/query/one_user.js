import {gql} from "@apollo/client";

export const QUERY_ONE_USER = gql`
    query ($id: ID!){
      user(id: $id) {
        name
        username
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