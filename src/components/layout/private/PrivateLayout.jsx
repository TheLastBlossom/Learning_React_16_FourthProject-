import useAuth from "../../../hooks/useAuth"
import { Header } from "./Header"
import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from "./Sidebar"

export const PrivateLayout = () => {
    const { auth, loading } = useAuth();
    if (loading) {
        return <h1>Cargando...</h1>
    } else {
        return (
            <>
                <Header></Header>
                <section className="layout_content">
                    {
                        auth._id ? <Outlet></Outlet>
                            : <Navigate to='/signin' />
                    }
                </section>
                <Sidebar />
            </>
        )
    }
}
