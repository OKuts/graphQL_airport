import {Menu} from "../components";
import {mainNavLinks} from "../config/configData";
import {Outlet} from "react-router-dom";

export const StartPage = () => {
    return (
        <>
            <header className="app-header">
                <div className="logo"></div>
                <Menu list={mainNavLinks} cn='app-nav'/>
            </header>
            <Outlet/>
        </>
    )
}