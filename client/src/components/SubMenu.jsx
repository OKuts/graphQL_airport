export const SubMenu = ({menu, list, handler}) => {

    return (
        <nav className="submenu">
            {list.map((link, i) =>
                <span
                    onClick={() => handler(i + 1)}
                    className={i + 1 === menu ? "submenu__item active" : "submenu__item"}
                    key={link}>
                    {link}
                </span>)}
        </nav>
    )
}