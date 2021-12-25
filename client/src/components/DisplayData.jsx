import {useQuery} from "@apollo/client"
import {QUERY_ALL_FLIGHTS, QUERY_ALL_USERS, QUERY_ONE_FLIGHT, QUERY_ONE_USER} from "../query"
import {useState} from "react"
import {Users, User, Flights, Flight} from ".";

export const DisplayData = () => {
    const [inp, setInp] = useState('')
    const [option, setOption] = useState(0)
    const {data: users, loading: usersLoading, error: usersError} = useQuery(QUERY_ALL_USERS)
    const {data: flights, loading: flightsLoading, error: flightsError} = useQuery(QUERY_ALL_FLIGHTS)
    const {data: user, loading: userLoading, error: userError} = useQuery(QUERY_ONE_USER, {variables: {id: inp}})
    const {data: flight, loading: flightLoading, error: flightError} = useQuery(QUERY_ONE_FLIGHT, {variables: {id: inp}})

    console.log(flights)

    const showPage = () => {
        switch (option) {
            case 1 :
                return !usersLoading && !usersError
                    ? <Users users={users.users}/>
                    : null
            case 3 :
                return !userLoading && inp && !userError
                    ? <User user={user.user}/>
                    : <h1>User error</h1>
            case 2 :
                return !flightsLoading && !flightsError ? <Flights flights={flights.flights}/> : null
            case 4 :
                return !flightLoading && inp && !flightError ? <Flight flight={flight.flight}/> : null
            default:
                return <h1>Select option</h1>
        }
    }

    return (
        <>
            <input
                type="number"
                value={inp}
                onChange={(e) => setInp(e.target.value)}/>
            <br/>
            <button onClick={() => setOption(3)}>user</button>
            <button onClick={() => setOption(1)}>get users</button>
            <button onClick={() => setOption(2)}>get flights</button>
            <button onClick={() => setOption(4)}>flight</button>
            {showPage()}
        </>
    )
}