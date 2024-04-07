import { Header } from "./Header"
import { Outlet } from 'react-router-dom'

export const PublicLayout = () => {
    return (
        <>
            <Header></Header>
            <section className="layout_content">
                <Outlet></Outlet>
            </section>
        </>
    )
}
