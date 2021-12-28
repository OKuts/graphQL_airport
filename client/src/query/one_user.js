import {gql} from "@apollo/client";

export const QUERY_ONE_USER = gql`
    query ($id: ID!){
      user(id: $id) {
        id
        name
        age
        nationality
        chosenFlights {
            id
            date
            name
            direct
        }
      }
}
`