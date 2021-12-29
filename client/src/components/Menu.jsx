import {mainNavLinks} from "../config/configData";

export const Menu = ({handler, menu}) => {

    return (
        <nav className="app-nav">
            {mainNavLinks.map((link, i) =>
                <span
                    onClick={() => handler(i + 1)}
                    className={i + 1 === menu ? "app-nav__item active" : "app-nav__item"}
                    key={link}>
                    {link}
                </span>)}
        </nav>
    )
}