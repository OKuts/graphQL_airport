const Clients = require('../models/clients')
const Flights = require('../models/flights')
const Companies = require('../models/companies')
const Directs = require('../models/directs')

const getValue = (arr, key, value, outName) => arr.find(el => el.id === value)[outName]

const getUserFlights = (client, companyList, directList, flightList) => {
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
            const flightList = await Flights.find();
            return await clientList.map( client => {
                return client.doneFlights.length
                    ? getUserFlights(client, companyList, directList, flightList)
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
            const flightList = await Flights.find();
            const clientList = await Clients.find();
            const companyList = await Companies.find();
            const directList = await Directs.find();
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
                    company: getValue(companyList, 'companyId', companyId, 'name'),
                    direct: getValue(directList, 'directId', directId, 'direct')
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
            console.log('updateClient')
            const clients = await Clients.find();
            const  currentClient = clients.find(client => client.id === args.input.currentClient)
            const out = await Clients.updateOne({_id: currentClient.id},
                {$addToSet: {doneFlights: args.input.currentFlight}});
            return currentClient
        },
    }
};

module.exports = {resolvers};