import {Fragment, useState} from "react";
import arrowUp from "../images/arrow-up.svg";
import arrowDown from "../images/arrow-down.svg";

export const ClientsList = ({users}) => {
    const [currentClient, setCurrentClient] = useState(null)

    return (
        <>
            {users.length &&
            <table className="table table__client">
                <caption>Clients</caption>
                <thead>
                <tr>
                    <th>num</th>
                    <th>name</th>
                    <th>age</th>
                    <th>nationality</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users.map(({id, name, age, nationality, chosenFlights}, i) =>
                    <Fragment key={id}>
                        <tr className="item-flight">
                            <td>{i + 1}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{nationality}</td>
                            <td
                                onClick={() => setCurrentClient(currentClient === i ? null : i)}>
                                {chosenFlights.length
                                    ? <img
                                        className="arrow"
                                        src={currentClient === i ? arrowUp : arrowDown}
                                        alt="arrow-down"/> :
                                    ''}
                            </td>
                        </tr>
                        {chosenFlights &&
                        <tr className={currentClient === i ? "item-client show" : "item-client"}>
                            <td colspan="5">
                                {chosenFlights.map(flight => <p key={flight.id}>
                                    {flight.name} {flight.date} {flight.direct}</p>)}
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