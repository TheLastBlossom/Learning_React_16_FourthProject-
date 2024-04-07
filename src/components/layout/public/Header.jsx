import { Navigation } from "./Navigation"

export const Header = () => {
    return (
        <header className="layout__navbar">
            <div className="navbar__header">
                <a href="#" className="navbar__title">RSocialNetWork</a>
            </div>
            <Navigation/>
        </header>
    )
}
