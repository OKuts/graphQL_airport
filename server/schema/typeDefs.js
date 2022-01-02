const { gql } = require('apollo-server')

const typeDefs = gql`
    
    type FlightOut {
        id: ID!
        date: String!
        time: String!
        company: String!
        direct: String!
        passengers: [Client]
    }
    
    type Flight {
        id: ID!
        date: String!
        time: String!
        companyId: String!
        directId: String!
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
        flights: [FlightOut!]!      
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
    
    input UpdateClientInput {
        currentClient: String!
        currentFlight: String!
    }
    
    type Mutation {
        createClient(input: CreateClientInput!): Client!
        createCompany(input: CreateCompanyInput!): Company!
        createDirect(input: CreateDirectInput!): Direct!
        createFlight(input: CreateFlightInput!): Flight!
        
        updateClient(input: UpdateClientInput!): Client!
    }
`
module.exports = { typeDefs };
