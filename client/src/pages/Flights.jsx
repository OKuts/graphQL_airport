import {FlightsList, Header, WorkNav} from "../components";
import {flightsNav} from "../config/configData";
import {useState} from "react";
import {useQuery} from "@apollo/client";
import {QUERY_ALL_FLIGHTS} from "../query";
import {OneFlight} from "../components/OneFlight";

export const Flights = () => {
    const {data: flights, loading: flightsLoading, error: flightsError} = useQuery(QUERY_ALL_FLIGHTS)

    const [menuItem, setMenuItem] = useState(0)

    const showComponent = () => {
        switch (menuItem) {
            case 1: return null
            case 2: return <OneFlight />
            case 3: return !flightsLoading && !flightsError ? <FlightsList flights={flights.flights}/> : null
        }
    }

    return (
        <div>
            <Header/>
            {/*<WorkNav*/}
                handler={setMenuItem}
                list={flightsNav}/>
            <div className={menuItem ? 'site-wrapper background' : 'site-wrapper'}>
                {showComponent()}
            </div>
        </div>
    )
}