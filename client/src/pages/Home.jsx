import {ClientsList, ClientToFlight, FlightsList, Header, NewClient, NewFlight} from "../components";
import {useEffect, useState} from "react";
import {clientsNav, flightsNav, mainNavLinks} from "../config/configData";
import {SubMenu} from "../components/SubMenu";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_CLIENTS, QUERY_ALL_FLIGHTS} from "../query";
import {QUERY_ALL_COMPANIES} from "../query/all_companies";
import {QUERY_ALL_DIRECTS} from "../query/all_directs";

export const Home = () => {
    const [mainMenu, setMainMenu] = useState(0)
    const [subMenu, setSubMenu] = useState(0)
    const companiesData = useQuery(QUERY_ALL_COMPANIES)
    const directsData = useQuery(QUERY_ALL_DIRECTS)

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

        switch (item) {
            case '11':
                return <NewClient refetch={clientsRefetch}/>
            case '12':
            case '22':
                return <ClientToFlight
                            clientsRefetch={clientsRefetch}
                            flightsRefetch={flightsRefetch}
                            flights={flights.flights}
                            clients={clients.clients}/>
                return null
            case '13':
                return !clientsLoading && !clientsError
                    ? <ClientsList clients={clients.clients}/> : null
            case '21':
                return <NewFlight
                            refetch={flightsRefetch}
                            companiesData={companiesData}
                            directData={directsData}/>
            case '23':
                return !flightsLoading && !flightsError
                    ? <FlightsList flights={flights.flights}/> : null
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
                list={mainMenu === 1 ? clientsNav : flightsNav}
                menu={subMenu}
                handler={setSubMenu}/>}
            <div className={subMenu ? 'site-wrapper background' : 'site-wrapper'}>
                {showComponent()}
            </div>
        </div>
    )
}