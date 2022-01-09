import {flightsNav} from "../config/configData";
import {Outlet} from "react-router-dom";
import {Menu} from "../components";

export const FlightPage = () => {
    return (
        <>
            <Menu list={flightsNav} cn='submenu'/>
            <Outlet/>
        </>
    )
}