import {useMutation, useQuery} from "@apollo/client"
import {QUERY_ALL_FLIGHTS, QUERY_ALL_USERS, QUERY_ONE_FLIGHT, QUERY_ONE_USER} from "../query"
import {useState} from "react"
import {Users, User, Flights, Flight} from ".";
import {CREATE_USER} from "../mutations/create_user";
import {TEMP_FLIGHTS} from "../query/temp";
import {Temp} from "./Temp";

export const DisplayData = () => {
    const [userId, setUserId] = useState('61caaf2e43b417abe97b6060')
    const [flightId, setFlightId] = useState('61ca8722be34637cf9c9f715')
    const [option, setOption] = useState(0)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [newUser, setNewUser] = useState('')
    const {data: users, loading: usersLoading, error: usersError, refetch: usersRefetch} = useQuery(QUERY_ALL_USERS)
    const {data: flights, loading: flightsLoading, error: flightsError} = useQuery(QUERY_ALL_FLIGHTS)
    const {data: user, loading: userLoading, error: userError} = useQuery(QUERY_ONE_USER, {variables: {id: userId}})
    const {data: flight, loading: flightLoading, error: flightError} = useQuery(QUERY_ONE_FLIGHT, {variables: {id: flightId}})

    const {data: temp, loading: tempLoading, error: tempError} = useQuery(TEMP_FLIGHTS)

    const [createUser] = useMutation(CREATE_USER);

    const showPage = () => {
        switch (option) {
            case 1 :
                return !usersLoading && !usersError ? <Users users={users.users}/> : null
            case 3 :
                return !userLoading && userId && !userError ? <User user={user.user}/> : <h1>Id error</h1>
            case 2 :
                return !flightsLoading && !flightsError ? <Flights flights={flights.flights}/> : null
            case 4 :
                return !flightLoading && flightId && !flightError ? <Flight flight={flight.flight}/> : <h1>Id error</h1>
            case 5 :
                return !tempLoading && !tempError ? <Temp temp={temp.temp}/> : <h1>Temp error</h1>
            case 6 :
                return !userLoading && userId && !userError ? <User user={newUser}/> : <h1>Id error</h1>

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
            setNewUser(data.createUser)
            setOption(6)
            usersRefetch()
        }).catch(err => console.log(err))
    }

    return (
        <>
            <span>user id: </span>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}/>
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
            <button onClick={() => setOption(5)}>temp</button>
            {showPage()}
        </>
    )
}