import {useState, Fragment} from "react";
import arrowDown from '../images/arrow-down.svg'
import arrowUp from '../images/arrow-up.svg'

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
                    <th>name</th>
                    <th>direct</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {flights.map(({id, date, name, direct, passengers}, i) =>
                    <Fragment key={id}>
                        <tr className="item-flight">
                            <td>{i + 1}</td>
                            <td>{date}</td>
                            <td>{name}</td>
                            <td>{direct}</td>
                            <td
                                onClick={() => setCurrentFlight(currentFlight === i ? null : i)}>
                                {passengers
                                    ? <img
                                        className="arrow"
                                        src={currentFlight === i ? arrowUp : arrowDown}
                                        alt="arrow-down"/> :
                                    ''}
                            </td>
                        </tr>
                        {passengers &&
                            <tr className={currentFlight === i ? "item-client show": "item-client"}>
                                <td colSpan="5">
                                    {passengers.map(person => <p key={person.id}>{person.name}</p>)}
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