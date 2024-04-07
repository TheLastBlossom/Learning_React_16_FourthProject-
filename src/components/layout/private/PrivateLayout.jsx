import { Header } from "./Header"
import { Outlet } from 'react-router-dom'
import { Sidebar } from "./Sidebar"

export const PrivateLayout = () => {
    return (
        <>
            <Header></Header>
            <section className="layout_content">
                <Outlet></Outlet>
            </section>
            <Sidebar/>
        </>
    )
}
