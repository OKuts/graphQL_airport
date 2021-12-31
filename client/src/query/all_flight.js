import {gql} from "@apollo/client";

export const QUERY_ALL_FLIGHTS = gql`
    query{
      flights {
        id
        companyId
        directId
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