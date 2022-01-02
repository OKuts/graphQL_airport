const { ApolloServer } = require("apollo-server")
const mongoose = require('mongoose')

const {typeDefs} = require("./schema/typeDefs");
const {resolvers} = require("./schema/resolvers");

const server = new ApolloServer({ typeDefs, resolvers })

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://okuts:violet@cluster0.6gcyb.mongodb.net/airport')

        server.listen().then(({ url }) => {
            console.log(`YOUR API IS RUNNING AT: ${url} :)`)
        });
    } catch (e) {
        console.log(e)
    }
}

start()


// flightList.forEach(async ({date, name, direct}) => {
//     const flight = new Flights({date, name, direct})
//     await flight.save()
// })

// userList.forEach(async ({name, age,  nationality,  doneFlights}) => {
//     const user = new Users({name, age, nationality, doneFlights})
//     await user.save()
// })