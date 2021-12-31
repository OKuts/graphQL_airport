import {gql} from "@apollo/client";

export const QUERY_ALL_DIRECTS = gql`
    query{
      directs {
        id
        direct
      }
    }
`