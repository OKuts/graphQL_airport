import {Menu} from "./Menu";

export const Header = (props) => {
    return (
        <header className="app-header">
            <div className="logo"></div>
            <Menu {...props}/>
        </header>
    )
}