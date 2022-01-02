import {useState} from "react";
import {useMutation} from "@apollo/client";
import {UPDATE_CLIENT} from "../mutations/update_client";

export const ClientToFlight = ({clients, flights, clientsRefetch, flightsRefetch}) => {
    const [clientInp, setClientInp] = useState('')
    const [flightInp, setFlightInp] = useState('')
    const [currentClient, setCurrentClient] = useState(null)
    const [currentFlight, setCurrentFlight] = useState(null)
    const [result, setResult] = useState([])

    const [updateClient] = useMutation(UPDATE_CLIENT)

    const clientHandler = selectedClient => {
        setCurrentClient(selectedClient)
        setClientInp(`${selectedClient.name} ${selectedClient.surname}`)
    }

    const flightHandler = selectedFlight => {
        setCurrentFlight(selectedFlight)
        setFlightInp(`${selectedFlight.direct} ${selectedFlight.company}`)
    }

    const handlerSubmit = e => {
        e.preventDefault()
        if (currentClient && currentFlight) {
            setClientInp('')
            setFlightInp('')
            updateClient({
                variables: {
                    input: {
                        currentClient: currentClient.id,
                        currentFlight: currentFlight.id
                    }
                }
            }).then(data => {
                setResult([...result, [currentClient, currentFlight]])
                setCurrentClient(null)
                setCurrentFlight(null)
                clientsRefetch()
                flightsRefetch()
            }).catch(err => console.log(err))
        }
    }

return (
    <>
        <table className="result">
            <tbody>
            {result.map(([client, flight], i) =>
                <tr key={i}>
                    <td>{client.name} {client.surname}</td>
                    <td>{flight.direct}</td>
                    <td>{flight.date}</td>
                    <td>{flight.time}</td>
                    <td>{flight.company}</td>
                    <td style={{color: 'green'}}>✔</td>
                </tr>)
            }
            </tbody>
        </table>
        <div className="client-to-flight">
            <div>
                <table>
                    <tbody>
                    {clients.map(client =>
                        `${client.name} ${client.surname}`.includes(clientInp) &&
                        <tr key={client.id} onClick={() => clientHandler(client)}>
                            <td>{client.name} {client.surname}</td>
                            <td>{client.age}</td>
                            <td>{client.citizenship}</td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
            <form className="select" onSubmit={handlerSubmit}>
                <label htmlFor="client">Client</label>
                <input
                    onChange={(e) => setClientInp(e.target.value)}
                    name="client"
                    value={clientInp}/>
                <label htmlFor="flight">Flight </label>
                <input
                    onChange={(e) => setFlightInp(e.target.value)}
                    name="flight"
                    value={flightInp}/>
                <button>Send</button>
            </form>
            <div>
                <table>
                    <tbody>
                    {flights.map(flight =>
                        `${flight.direct} ${flight.company}`.includes(flightInp) &&
                        <tr key={flight.id} onClick={() => flightHandler(flight)}>
                            <td>{flight.direct}</td>
                            <td>{flight.date}</td>
                            <td>{flight.time}</td>
                            <td>{flight.company}</td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </>
)
}