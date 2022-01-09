import {StartPage} from "./StartPage";
import {Route, Routes, useLocation} from "react-router-dom";
import {ClientPage} from "./ClientPage";
import {FlightPage} from "./FlightPage";
import {clientsNav, flightsNav} from "../config/configData";
import {newLink} from "../helpers/newLink";
import {ClientsList, ClientToFlight, FlightsList, NewClient, NewFlight} from "../components";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_CLIENTS, QUERY_ALL_FLIGHTS} from "../query";
import {QUERY_ALL_COMPANIES} from "../query/all_companies";
import {QUERY_ALL_DIRECTS} from "../query/all_directs";
import {useEffect, useState} from "react";

const [newClient, clientToFlight, clientsList] = clientsNav
const [newFlight, flightToClient, flightsList] = flightsNav

export const AppRouter = () => {
    const [bgClass, setBgClass] = useState('page-wrapper')
    const companiesData = useQuery(QUERY_ALL_COMPANIES)
    const directsData = useQuery(QUERY_ALL_DIRECTS)
    const isSubMenu = useLocation().pathname.split('/').length === 3

    useEffect(() => {
        setBgClass(isSubMenu ? 'page-wrapper background' : 'page-wrapper')
    }, [isSubMenu])

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

    return (
        <div className={bgClass}>
            <Routes>
                <Route path='/' element={<StartPage/>}>
                    <Route path='clients' element={<ClientPage/>}>
                        <Route path={newLink(newClient)} element={
                            <NewClient refetch={clientsRefetch}/>}/>
                        <Route path={newLink(clientToFlight)} element={
                            flights && clients && <ClientToFlight
                                clientsRefetch={clientsRefetch}
                                flightsRefetch={flightsRefetch}
                                flights={flights.flights}
                                clients={clients.clients}
                            />}/>
                        <Route path={newLink(clientsList)} element={
                            !clientsLoading && !clientsError && <ClientsList clients={clients.clients}/>
                        }/>
                    </Route>
                    <Route path='flights' element={<FlightPage/>}>
                        <Route path={newLink(newFlight)} element={
                            <NewFlight
                                refetch={flightsRefetch}
                                companiesData={companiesData}
                                directData={directsData}
                            />}/>
                        <Route path={newLink(flightToClient)} element={
                            flights && clients && <ClientToFlight
                                clientsRefetch={clientsRefetch}
                                flightsRefetch={flightsRefetch}
                                flights={flights.flights}
                                clients={clients.clients}
                            />}/>
                        <Route path={newLink(flightsList)} element={
                            !flightsLoading && !flightsError && <FlightsList flights={flights.flights}/>
                        }/>
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}