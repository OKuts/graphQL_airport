const Clients = require('../models/clients')
const Flights = require('../models/flights')
const Companies = require('../models/companies')
const Directs = require('../models/directs')

const getValue = (arr, value, outName) => arr.find(el => el.id === value)[outName]

const getUserFlights = (client, companyList, directList, flightList) => {
    client.chosenFlights = client.doneFlights.map(item => {
        const currentFlight = flightList.find(flight => flight.id === item)
        return {
            date: currentFlight.date,
            time: currentFlight.time,
            company: getValue(companyList, currentFlight.companyId, 'name'),
            direct: getValue(directList, currentFlight.directId, 'direct')
        }
    })
    return client
}

const resolvers = {
    Query: {
        clients: async () => {
            const [companyList, directList, clientList, flightList] = await Promise.all([
                Companies.find(), Directs.find(), Clients.find(), Flights.find()])

            return clientList.map( client => {
                return client.doneFlights.length
                    ? getUserFlights(client, companyList, directList, flightList)
                    : client
             })
        },

        companies: async () => await Companies.find(),

        directs: async () => await Directs.find(),

        flights: async () => {
            const [companyList, directList, clientList, flightList] = await Promise.all([
                Companies.find(), Directs.find(), Clients.find(), Flights.find()])

            const flights = []
            clientList.forEach(user => {
                if (user.doneFlights) {
                    flights.push(...user.doneFlights)
                }
            })
            const useFlights = [...new Set(flights)]

            return flightList.map(({id, date, time, companyId, directId}) => {
                const out = {
                    id,
                    date,
                    time,
                    company: getValue(companyList, companyId, 'name'),
                    direct: getValue(directList, directId, 'direct')
                }
                if (useFlights.includes(id)) {
                    out.passengers = clientList.filter(user =>
                        user.doneFlights && user.doneFlights.includes(id))
                }
                return out
            });
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

        updateClient: async (parent, args) => {
            const clients = await Clients.find();
            const  currentClient = clients.find(client => client.id === args.input.currentClient)
            const out = await Clients.updateOne({_id: currentClient.id},
                {$addToSet: {doneFlights: args.input.currentFlight}});
            return currentClient
        },
    }
};

module.exports = {resolvers};