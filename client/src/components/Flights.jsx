export const Flights = ({flights}) => {
    return (
        <>
            <h1>Flights</h1>
            {flights.map(item =>
                <>
                    <p key={item.id}>{item.id} {item.name} {item.direct} {item.name}</p>
                    {item.passengers &&
                    item.passengers.map((item, i) => <p key={i}>{item.name}</p>)
                    }
                </>
            )}
        </>
    )
}