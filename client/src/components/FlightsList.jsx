import {useState, Fragment} from "react";

export const FlightsList = ({flights}) => {
    const [currentFlight, setCurrentFlight] = useState(null)

    return (
        <>
            {flights.length &&
            <table className="table table__flight">
                <caption>Flights</caption>
                <thead>
                <tr>
                    <th>num</th>
                    <th>date</th>
                    <th>time</th>
                    <th>company</th>
                    <th>direct</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {flights.map(({id, date, time, company, direct, passengers}, i) =>
                    <Fragment key={id}>
                        <tr className="item-flight">
                            <td>{i + 1}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>{company}</td>
                            <td>{direct}</td>
                            <td
                                onClick={() => setCurrentFlight(currentFlight === i ? null : i)}>
                                {passengers && (currentFlight === i
                                    ? <span className="arrow-up">&#9650;</span>
                                    : <span className="arrow-down">&#9660;</span>)}
                            </td>
                        </tr>
                        {passengers &&
                            <tr className={currentFlight === i ? "item-client show": "item-client"}>
                                <td colSpan="5">
                                    {passengers.map(({id, name, surname, age, citizenship}) => <p key={id}>
                                        {name} {surname} {age} {citizenship} </p>)}
                                </td>
                            </tr>}
                    </Fragment>
                )}
                </tbody>
            </table>
            }
        </>
    )
}