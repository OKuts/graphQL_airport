import {ClientsList, Header, OneClient, WorkNav} from "../components";
import {clientsNav} from "../config/configData";
import {useState} from "react";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_USERS} from "../query";

export const Clients = () => {
    const {data: users, loading: usersLoading, error: usersError, refetch: usersRefetch} = useQuery(QUERY_ALL_USERS)

    const [menuItem, setMenuItem] = useState(0)

    const showComponent = () => {
        switch (menuItem) {
            case 1: return null
            case 2: return <OneClient />
            case 3: return !usersLoading && !usersError ? <ClientsList users={users.users}/> : null
        }
    }

    return (
        <div>
            <Header/>
            {/*<WorkNav*/}
                handler={setMenuItem}
                list={clientsNav}/>
            <div className={menuItem ? 'site-wrapper background' : 'site-wrapper'}>
                {showComponent()}
            </div>
        </div>
    )
}