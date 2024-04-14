import useAuth from "../../../hooks/useAuth"
import { Header } from "./Header"
import { Navigate, Outlet } from 'react-router-dom'
export const PublicLayout = () => {
    const { auth } = useAuth();       
    return (
        <>
            <Header></Header>
            <section className="layout_content">
                
                {auth._id ?
                    <Navigate to='/network' /> : <Outlet></Outlet>
                }
            </section>
        </>
    )
}
