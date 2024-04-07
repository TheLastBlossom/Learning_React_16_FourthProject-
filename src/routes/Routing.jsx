import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { PublicLayout } from "../components/layout/public/PublicLayout"
import { SignIn } from "../components/layout/public/user/SignIn"
import { SignUp } from "../components/layout/public/user/SignUp"
import { PrivateLayout } from "../components/layout/private/PrivateLayout"
import { Feed } from "../components/publication/Feed"
import { AuthProvider } from "../context/AuthProvider"

export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PublicLayout />}>
                        <Route index element={<SignIn />}></Route>
                        <Route path="signin" element={<SignIn />}></Route>
                        <Route path="signup" element={<SignUp />}></Route>
                    </Route>
                    <Route path="/network" element={<PrivateLayout />}>
                        <Route index element={<Feed />}></Route>
                        <Route path="feed" element={<Feed />}></Route>
                    </Route>
                    <Route path="*" element={
                        <div>
                            <h1>Not found</h1>
                            <Link to={"/"}>Go to home</Link>
                        </div>
                    }>

                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
