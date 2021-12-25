import {UserTable} from "./UserTable";

export const Users = ({users}) => {
    console.log(users)
    return (
        <>
            <h1>Users</h1>

            {users.map(item =>
                <div
                    className="userData"
                    key={item.id}>
                    <div>
                        <p>{`id: ${item.id}`}</p>
                        <p>{`name: ${item.name}`}</p>
                        <p>{`age: ${item.age}`}</p>
                        <p>{`nationality: ${item.nationality}`}</p>
                    </div>
                    <div>
                        {item.chosenFlights
                            ? <UserTable chosenFlights={item.chosenFlights}/>
                            : <p>Not flights</p>
                        }
                    </div>
                </div>
            )}


        </>
    )
}