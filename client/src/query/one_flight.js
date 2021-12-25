import {gql} from "@apollo/client";

export const QUERY_ONE_FLIGHT = gql`
    query ($id: ID!){
      flight(id: $id) {
        id
        name
        date
        time
        direct
        passengers {
            name
            age
        }
    }
}
`