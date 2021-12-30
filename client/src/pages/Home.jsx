import {ClientsList, FlightsList, Header} from "../components";
import {useEffect, useState} from "react";
import {clientsNav, flightsNav, mainNavLinks} from "../config/configData";
import {SubMenu} from "../components/SubMenu";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_FLIGHTS, QUERY_ALL_USERS} from "../query";
import {NewClient} from "../components/NewClient";

export const Home = () => {
    const [mainMenu, setMainMenu] = useState(0)
    const [subMenu, setSubMenu] = useState(0)
    const {data: users, loading: usersLoading, error: usersError, refetch: usersRefetch} = useQuery(QUERY_ALL_USERS)
    const {data: flights, loading: flightsLoading, error: flightsError} = useQuery(QUERY_ALL_FLIGHTS)

    useEffect(() => setSubMenu(0), [mainMenu])

    const showComponent = () => {
        const item = `${mainMenu}${subMenu}`
        console.log(item)
        switch (item) {
            case '11': return <NewClient />
            case '12': return null
            case '13': return !usersLoading && !usersError ? <ClientsList users={users.users}/> : null
            case '21': return null
            case '22': return null
            case '23': return !flightsLoading && !flightsError ? <FlightsList flights={flights.flights}/> : null
        }
    }

    return (
        <div>
            <Header
                list={mainNavLinks}
                menu={mainMenu}
                handler={setMainMenu}/>
            {mainMenu &&
                <SubMenu
                    list={mainMenu === 1 ? clientsNav : flightsNav}
                    menu={subMenu}
                    handler={setSubMenu}/>}
            <div className={subMenu ? 'site-wrapper background' : 'site-wrapper'}>
                {showComponent()}
            </div>
        </div>
    )
}