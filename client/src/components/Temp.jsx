export const Temp = ({temp}) => {
    return (
        <>
            <h1>Temp</h1>
            {temp.map(item =><p key={item.id}>{JSON.stringify(item)}</p>)}
        </>
    )
}