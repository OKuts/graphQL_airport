const { gql } = require('apollo-server')

const typeDefs = gql`

    type Flight {
        id: ID!
        date: String!
        time: String!
        name: String!
        direct: String!
        passengers: [User]
    }

    type User {
        id: ID!
        name: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        doneFlights: [Int!]
        chosenFlights: [Flight!]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        flights: [Flight]!
        temp: [Flight]!
        flight(id: ID!): Flight!
    }
    
    enum Nationality {
        CANADA
        GERMANY
        NETHERLANDS
        RUSSIA
        UKRAINE
    }
    
    input CreateUserInput {
        name: String!
        age: Int!
        nationality: Nationality = CANADA
    }
    
    input CreateFlightInput {
        name: String!
        direct: String!
    }
    
    input CreateUserFlightInput {
        userId: String!
        flightId: String!
    }
    
    type Mutation {
        createUser(input: CreateUserInput!): User!
        createFlight(input: CreateFlightInput!): Flight!
        createUserFlight(input: CreateUserFlightInput!): User!
    }
`
module.exports = { typeDefs };
