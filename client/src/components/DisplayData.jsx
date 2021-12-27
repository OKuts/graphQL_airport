import {useMutation, useQuery} from "@apollo/client"
import {QUERY_ALL_FLIGHTS, QUERY_ALL_USERS, QUERY_ONE_FLIGHT, QUERY_ONE_USER} from "../query"
import {useState} from "react"
import {Users, User, Flights, Flight} from ".";
import {CREATE_USER} from "../mutations/create_user";

export const DisplayData = () => {
    const [id, setId] = useState('')
    const [option, setOption] = useState(0)
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const {data: users, loading: usersLoading, error: usersError} = useQuery(QUERY_ALL_USERS)
    const {data: flights, loading: flightsLoading, error: flightsError} = useQuery(QUERY_ALL_FLIGHTS)
    const {data: user, loading: userLoading, error: userError} = useQuery(QUERY_ONE_USER, {variables: {id}})
    const {data: flight, loading: flightLoading, error: flightError} = useQuery(QUERY_ONE_FLIGHT, {variables: {id}})
    const [createUser] = useMutation(CREATE_USER);

    console.log(users)

    const showPage = () => {
        switch (option) {
            case 1 :
                return !usersLoading && !usersError ? <Users users={users.users}/> : null
            case 3 :
                return !userLoading && id && !userError ? <User user={user.user}/> : <h1>Id error</h1>
            case 2 :
                return !flightsLoading && !flightsError ? <Flights flights={flights.flights}/> : null
            case 4 :
                return !flightLoading && id && !flightError ? <Flight flight={flight.flight}/> : <h1>Id error</h1>
            // case 5 :
            //     if (name && age) {
            //         createUser({
            //             variables: {
            //                 input: {
            //                     name,
            //                     age,
            //                     nationality: 'CANADA'
            //                 }
            //             }
            //         }).then(data => console.log(data))
            //     }
            //     setName('')
            //     setAge('')
            //
            //     return name && age ? <h1>Mutation</h1> : <h1>Data error</h1>

            default:
                return <h1>Select option</h1>
        }
    }

    return (
        <>
            <span>id: </span>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}/>
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
            <button onClick={() => setOption(6)}>create flight</button>
            <button onClick={() => createUser({
                variables: {
                input: {
                name,
                age,
                nationality: 'CANADA'
            }
            }
            }).then(data => console.log(data))
            }>Create user</button>
            {showPage()}
        </>
    )
}