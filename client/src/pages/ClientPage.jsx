import {clientsNav} from "../config/configData";
import {Outlet} from "react-router-dom";
import {Menu} from "../components";

export const ClientPage = () => {

    return (
        <>
            <Menu list={clientsNav} cn='submenu'/>
            <Outlet/>
        </>
    )
}