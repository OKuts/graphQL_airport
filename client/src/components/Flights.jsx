export const Flights = ({flights}) => {
    return (
        <>
            <h1>Flights</h1>
            {flights.map(item =>
                <div key={item.id}>
                    <p >{item.id} {item.name} {item.direct} {item.name}</p>
                    {item.passengers && item.passengers.map(item => <p key={item.id}>{item.name}</p>)
                    }
                </div>
            )}
        </>
    )
}