export const UserTable = ({chosenFlights}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>date</th>
                <th>name</th>
                <th>direct</th>
            </tr>
            </thead>
            <tbody>
            {chosenFlights.map(({id, date, time, name, direct}) =>
                <tr key={id}>
                    <td>{id}</td>
                    <td>{date}</td>
                    <td>{name}</td>
                    <td>{direct}</td>
                </tr>
            )}
            </tbody>

        </table>
    )
}