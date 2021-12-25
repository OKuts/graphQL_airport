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
        username: String!
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
        flight(id: ID!): Flight!
    }
    
    enum Nationality {
        CANADA
        GERMANY
        NETHERLANDS
        RUSSIA
    }
`
module.exports = { typeDefs };