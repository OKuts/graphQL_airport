export const Flight = ({flight}) => {
    return (
        <>
            <h1>Flight</h1>
            <p>{flight.id}</p>
            <p>{flight.name}</p>
            <p>{flight.direct}</p>
            {flight.passengers &&
            flight.passengers.map((item, i) => <p key={i}>{item.name}</p>)
            }
        </>
    )
}