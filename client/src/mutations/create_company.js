import {gql} from "@apollo/client";

export const CREATE_COMPANY = gql`
    mutation($input: CreateCompanyInput!){
      createCompany(input: $input) {
        id
        name
      }
    }
`