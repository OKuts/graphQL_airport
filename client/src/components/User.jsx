import {UserTable} from "./UserTable";

export const User = ({user}) => {
    return (
        <>
            <h1>User</h1>
            <p>{`Name: ${user.name}`}</p>
            <p>{`Age: ${user.age}`}</p>
            {user.chosenFlights.length
                ? <UserTable chosenFlights={user.chosenFlights}/>
                : <p>Not flights</p>
            }
        </>
    )
}