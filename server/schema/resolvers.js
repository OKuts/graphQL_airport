const Users = require('../models/users')
const Clients = require('../models/clients')
const Flights = require('../models/flights')
const Companies = require('../models/companies')
const Directs = require('../models/directs')

const getValue = (arr, key, value, outName) => arr.find(el => el.id === value)[outName]

const getUserFlights = async (client, companyList, directList) => {
    const flightList = await Flights.find();
    client.chosenFlights = client.doneFlights.map(item => {
        const currentFlight = flightList.find(flight => flight.id === item)
        return {
            date: currentFlight.date,
            time: currentFlight.time,
            company: getValue(companyList, 'companyId', currentFlight.companyId, 'name'),
            direct: getValue(directList, 'directId', currentFlight.directId, 'direct')
        }
    })
    return client
}



const resolvers = {
    Query: {
        clients: async () => {
            const companyList = await Companies.find();
            const directList = await Directs.find();
            const clientList = await Clients.find();
            return clientList.map(client => {
                return client.doneFlights.length
                    ? getUserFlights(client, companyList, directList)
                    : client
            })
        },

        companies: async () => {
            const companyList = await Companies.find();
            return companyList
        },

        directs: async () => {
            const directList = await Directs.find();
            return directList
        },

        flights: async () => {
            const clientList = await Clients.find();
            const flightList = await Flights.find();

            const flights = []
            clientList.forEach(user => {
                if (user.doneFlights) {
                    flights.push(...user.doneFlights)
                }
            })
            const useFlights = [...new Set(flights)]

            return flightList.map(flight => {
                if (useFlights.includes(flight.id)) flight.passengers = clientList.filter(user =>
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
    },
    Mutation: {
        createClient: async (parent, args) => {
            const newClient = new Clients({...args.input})
            return await newClient.save()
        },

        createCompany: async (parent, args) => {
            const newCompany = new Companies({...args.input})
            return await newCompany.save()
        },

        createDirect: async (parent, args) => {
            const newDirect = new Directs({...args.input})
            return await newDirect.save()
        },

        createFlight: async (parent, args) => {
            const newFlight = new Flights({...args.input})
            return await newFlight.save()
        },
    }
};

module.exports = {resolvers};