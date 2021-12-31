import {ClientsList, CompanyList, DirectList, FlightsList, Header, NewClient, NewFlight} from "../components";
import {useEffect, useState} from "react";
import {clientsNav, companiesNav, flightsNav, mainNavLinks} from "../config/configData";
import {SubMenu} from "../components/SubMenu";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_CLIENTS, QUERY_ALL_FLIGHTS} from "../query";

export const Home = () => {
    const [mainMenu, setMainMenu] = useState(0)
    const [subMenu, setSubMenu] = useState(0)
    const {
        data: clients,
        loading: clientsLoading,
        error: clientsError,
        refetch: clientsRefetch
    } = useQuery(QUERY_ALL_CLIENTS)

    const {
        data: flights,
        loading: flightsLoading,
        error: flightsError,
        refetch: flightsRefetch
    } = useQuery(QUERY_ALL_FLIGHTS)

    useEffect(() => setSubMenu(0), [mainMenu])

    const showComponent = () => {
        const item = `${mainMenu}${subMenu}`
        console.log(item)
        switch (item) {
            case '11':
                return <NewClient refetch={clientsRefetch}/>
            case '12':
                return null
            case '13':
                return !clientsLoading && !clientsError ? <ClientsList clients={clients.clients}/> : null
            case '21':
                return <NewFlight refetch={flightsRefetch} />
            case '22':
                return null
            case '23':
                return !flightsLoading && !flightsError
                    ? <FlightsList flights={flights.flights}/> : null
            case '31':
                return <CompanyList />
            case '32':
                return <DirectList />
        }
    }


    return (
        <div>
            <Header
                list={mainNavLinks}
                menu={mainMenu}
                handler={setMainMenu}/>
            {mainMenu !== 0 &&
            <SubMenu
                list={mainMenu === 1 ? clientsNav : mainMenu === 2 ? flightsNav : companiesNav}
                menu={subMenu}
                handler={setSubMenu}/>}
            <div className={subMenu ? 'site-wrapper background' : 'site-wrapper'}>
                {showComponent()}
            </div>
        </div>
    )
}