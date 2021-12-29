const Users = require('../models/users');
const Flights = require('../models/flights');

const getUserFlights = async (user) => {

    const flightList = await Flights.find();
    user.chosenFlights = user.doneFlights.map(item => flightList.find(flight => flight.id === item))

    return user
}

const resolvers = {
    Query: {
        users: async () => {
            const userList = await Users.find();
            return userList.map(user => {
                return user.doneFlights ? getUserFlights(user) : user
            })
        },

        user: async (parent, args) => {
            const userList = await Users.find();
            const user = userList.find(({id}) => id === args.id)
            if (user.doneFlights) {
                return getUserFlights(user)
            }
            return user
        },

        flights: async () => {
            const userList = await Users.find();
            const flightList = await Flights.find();

            const flights = []
            userList.forEach(user => {
                if (user.doneFlights) {
                    flights.push(...user.doneFlights)
                }
            })
            const useFlights = [...new Set(flights)]

            return flightList.map((flight, i) => {
                if (useFlights.includes(flight.id)) flight.passengers = userList.filter(user =>
                    user.doneFlights && user.doneFlights.includes(flight.id))
                return flight
            });
        },

        flight: async (parent, args) => {
            const userList = await Users.find();
            const flightList = await Flights.find();
            const flight = flightList.find(({id}) => id === args.id)
            const passengers = userList.filter(user => user.doneFlights ? user.doneFlights.includes(Number(args.id)) : false)
            return passengers.length ? {...flight, passengers} : flight
        },

        temp: async () => {
            const out = await Flights.find()
            return out
        }
    },
    Mutation: {
        createUser: async (parent, args) => {

            const newUser = new Users({...args.input})

            return await newUser.save()
        },
    }
};

module.exports = {resolvers};