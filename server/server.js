const { ApolloServer } = require("apollo-server")
const mongoose = require('mongoose')

const {typeDefs} = require("./schema/typeDefs");
const {resolvers} = require("./schema/resolvers");
const Users = require('./models/users')
const Flights = require('./models/flights')
const flightList = require('./data/flightData');


const server = new ApolloServer({ typeDefs, resolvers })

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://okuts:violet@cluster0.6gcyb.mongodb.net/airport')
        const out = await Users.find();
        const out1 = await Flights.find();
        console.log(out)
        // flightList.forEach(async ({date, name, direct}) => {
        //     const flight = new Flights({date, name, direct})
        //     await flight.save()
        // })


        server.listen().then(({ url }) => {
            console.log(`YOUR API IS RUNNING AT: ${url} :)`)
        });

    } catch (e) {
        console.log(e)
    }
}

start()
