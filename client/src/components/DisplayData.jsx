import {useMutation, useQuery} from "@apollo/client"
import {QUERY_ALL_FLIGHTS, QUERY_ALL_USERS, QUERY_ONE_FLIGHT, QUERY_ONE_USER} from "../query"
import {useState} from "react"
import {User, FlightsList, Flight, ClientsList} from ".";
import {CREATE_USER} from "../mutations/create_user";

export const DisplayData = () => {
    const [userId, setUserId] = useState('61caaf2e43b417abe97b6060')
    const [flightId, setFlightId] = useState('61ca8722be34637cf9c9f715')
    const [option, setOption] = useState(0)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    const {data: users, loading: usersLoading, error: usersError, refetch: usersRefetch} = useQuery(QUERY_ALL_USERS)
    const {data: flights, loading: flightsLoading, error: flightsError} = useQuery(QUERY_ALL_FLIGHTS)
    const {data: user, loading: userLoading, error: userError} = useQuery(QUERY_ONE_USER, {variables: {id: userId}})
    const {data: flight, loading: flightLoading, error: flightError} = useQuery(QUERY_ONE_FLIGHT, {variables: {id: flightId}})

    const [createUser] = useMutation(CREATE_USER);

    const showPage = () => {
        switch (option) {
            case 1 :
                return !usersLoading && !usersError ? <ClientsList users={users.users}/> : null
            case 3 :
                return !userLoading && userId && !userError ? <User user={user.user}/> : <h1>Loading ...</h1>
            case 2 :
                return !flightsLoading && !flightsError ? <FlightsList flights={flights.flights}/> : null
            case 4 :
                return !flightLoading && flightId && !flightError ? <Flight flight={flight.flight}/> : <h1>Loading ...</h1>

            default:
                return <h1>Select option</h1>
        }
    }

    const createUserHandler = () => {
        createUser({
            variables: {
                input: {
                    name,
                    age,
                    nationality: 'UKRAINE'
                }
            }
        }).then(({data}) => {
            setUserId(data.createUser.id)
            setOption(3)
            usersRefetch()
        }).catch(err => console.log(err))
    }

    console.log(userId)

    return (
        <>
            <select
                onChange={(e)=> setUserId(e.target.value)}>
                {users?.users.map(user =>
                    <option
                        value={user.id}
                        key={user.id}>
                        {user.name}
                    </option>)}
            </select>
            <br/>
            <span>flight id: </span>
            <input
                type="text"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}/>
            <br/>
            <span>name: </span>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            <span>age: </span>
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(+e.target.value)}/>
            <br/>


            <button onClick={() => setOption(3)}>user</button>
            <button onClick={() => setOption(1)}>get users</button>
            <button onClick={() => setOption(2)}>get flights</button>
            <button onClick={() => setOption(4)}>flight</button>
            <button onClick={createUserHandler}>Create user</button>
            {showPage()}
        </>
    )
}