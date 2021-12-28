const userList = require('../data/userData');
const flightList = require('../data/flightData');
// const Users = require('../models/users');
const Flights = require('../models/flights');

const getUserFlights = user => {
    return {...user, chosenFlights: user.doneFlights.map((item, i)=> flightList[item])}
}

const resolvers = {
    Query: {
        users: () => {
            return userList.map(user => {
                return user.doneFlights ? getUserFlights(user) : user
            })
        },

        user: (parent, args) => {
            const user = userList.filter(({id}) => id == args.id)[0]
            if (user.doneFlights) {
                return getUserFlights(user)
            }
            return user
        },

        flights: () => {
            const flights = []
            userList.forEach(user => {
                if (user.doneFlights) {
                    flights.push(...user.doneFlights)
                }
            })
            const useFlights = [...new Set(flights)]
            return flightList.map((flight, i) => {
                return useFlights.includes(Number(flight.id))
                    ? {...flight, passengers: userList.filter(user =>
                            user.doneFlights ? user.doneFlights.includes(Number(flight.id)) : false)}
                    : flight
            });
        },

        flight: (parent, args) => {
            const flight =  flightList.filter(({id}) => id == args.id)[0]
            const passengers = userList.filter(user => user.doneFlights ? user.doneFlights.includes(Number(args.id)) : false)
            return passengers.length ? {...flight, passengers } : flight
        },

        temp: async () => {
            const out = await Flights.find()
            console.log(out)
            return out
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input
            user.id = userList.length + 1
            userList.push(user)
            // console.log(user)
            return user
        },
    }
};

module.exports = {resolvers};