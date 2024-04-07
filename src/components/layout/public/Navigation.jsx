import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <NavLink to="/signin" className="menu-list__link">
                        <i className="fa-solid fa-user"></i>
                        <span className="menu-list__title">Sign In</span>
                    </NavLink>
                </li>

                <li className="menu-list__item">
                    <NavLink to="/signup" className="menu-list__link">
                        <i className="fa-solid fa-users"></i>
                        <span className="menu-list__title">Sing up</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
