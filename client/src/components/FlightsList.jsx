import {useState, Fragment} from "react";
import arrowDown from '../images/arrow-down.svg'
import arrowUp from '../images/arrow-up.svg'
import {getValue} from "../helpers/getValue";

export const FlightsList = ({flights, companiesData, directData}) => {
    const [currentFlight, setCurrentFlight] = useState(null)
    const {data: companies} = companiesData
    const {data: directs} = directData

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
                {flights.map(({id, date, time, companyId, directId, passengers}, i) =>
                    <Fragment key={id}>
                        <tr className="item-flight">
                            <td>{i + 1}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>{getValue(companies.companies, 'companyId', companyId, 'name')}</td>
                            <td>{getValue(directs.directs, 'directId', directId, 'direct')}</td>
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