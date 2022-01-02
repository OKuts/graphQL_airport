import {Fragment, useState} from "react";
import arrowUp from "../images/arrow-up.svg";
import arrowDown from "../images/arrow-down.svg";

export const ClientsList = ({clients}) => {
    const [currentClient, setCurrentClient] = useState(null)

    return (
        <>
            {clients.length &&
            <table className="table table__client">
                <caption>Clients</caption>
                <thead>
                <tr>
                    <th>num</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>age</th>
                    <th>citizenship</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {clients.map(({id, name, surname, age, citizenship, chosenFlights}, i) =>
                    <Fragment key={i}>
                        <tr className="item-flight">
                            <td>{i + 1}</td>
                            <td>{name}</td>
                            <td>{surname}</td>
                            <td>{age}</td>
                            <td>{citizenship}</td>
                            <td
                                onClick={() => setCurrentClient(currentClient === i ? null : i)}
                            >
                                {chosenFlights && (currentClient === i
                                    ? <span className="arrow-up">&#9650;</span>
                                    : <span className="arrow-down">&#9660;</span>)}
                            </td>
                        </tr>
                        {chosenFlights &&
                        <tr className={currentClient === i ? "item-client show" : "item-client"}>
                            <td colSpan="5">
                                {chosenFlights.map((flight, i) => <p key={i}>
                                    {flight.date} {flight.time} {flight.company} {flight.direct}</p>)}
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