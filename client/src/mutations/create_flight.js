import {gql} from "@apollo/client";

export const CREATE_FLIGHT = gql`
    mutation($input: CreateFlightInput!){
      createFlight(input: $input) {
        id
        companyId
        directId
        date
        time
      }
    }
`