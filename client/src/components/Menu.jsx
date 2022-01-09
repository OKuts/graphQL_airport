import {NavLink} from "react-router-dom";
import {newLink} from "../helpers/newLink";

export const Menu = ({list, cn}) => {

    return (
        <nav className={cn}>
            {list.map((link, i) =>
                <NavLink key={link} to={newLink(link)}>{link}</NavLink>)}
        </nav>
    )
}