import {gql} from "@apollo/client";

export const TEMP_FLIGHTS = gql`
    query{
      temp {
        id
        date
        name
        direct
      }
    }
`