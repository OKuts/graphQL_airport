import {gql} from "@apollo/client";

export const QUERY_ALL_COMPANIES = gql`
    query{
      companies {
        id
        name
      }
    }
`