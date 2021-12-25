const userList = require('../data/userData');
const flightList = require('../data/flightData');

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
            const flight =  flightList.filter(({id}) => id == args.id)[0];
            const passengers = userList.filter(user => user.doneFlights ? user.doneFlights.includes(Number(args.id)) : false)
            return passengers.length ? {...flight, passengers } : flight
        },
    }
};

module.exports = {resolvers};