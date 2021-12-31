const { gql } = require('apollo-server')

const typeDefs = gql`
    
    type FlightOut {
        id: ID!
        date: String!
        time: String!
        company: String!
        direct: String!
    }
    
    type Flight {
        id: ID!
        date: String!
        time: String!
        companyId: String!
        directId: String!
        passengers: [Client]
    }

    type Client {
        id: ID!
        name: String!
        surname: String!
        age: Int!
        citizenship: String!
        doneFlights: [String!]
        chosenFlights: [FlightOut!]
    }
    
    type Direct {
        id: ID!
        direct: String!
    }
    
    type Company {
        id: ID!
        name: String!
    }

    type Query {
        clients: [Client!]!
        flights: [Flight!]!      
        directs: [Direct!]! 
        companies: [Company!]! 
        
        flight(id: ID!): Flight!
    }
    
    input CreateClientInput {
        name: String!
        surname: String!
        age: Int!
        citizenship: String!
    }
    
    input CreateFlightInput {
        companyId: String!
        directId: String!
        date: String!
        time: String!
    }
    
    input CreateCompanyInput {
        name: String!
    }
    
        input CreateDirectInput {
        direct: String!
    }
    
    type Mutation {
        createClient(input: CreateClientInput!): Client!
        createCompany(input: CreateCompanyInput!): Company!
        createDirect(input: CreateDirectInput!): Direct!
        createFlight(input: CreateFlightInput!): Flight!
    }
`
module.exports = { typeDefs };
