import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { PublicLayout } from "../components/layout/public/PublicLayout"
import { SignIn } from "../components/layout/public/user/SignIn"
import { SignUp } from "../components/layout/public/user/SignUp"
import { PrivateLayout } from "../components/layout/private/PrivateLayout"
import { Feed } from "../components/publication/Feed"
import { AuthProvider } from "../context/AuthContext"
import { Logout } from "../components/layout/private/user/Logout"
import { People } from "../components/layout/private/user/People"
import { Confing } from "../components/layout/private/user/Confing"
import { Following } from "../components/follow/Following"
import { Followers } from "../components/follow/Followers"

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
                        <Route path="logout" element={<Logout />}></Route>
                        <Route path="people" element={<People />}></Route>
                        <Route path="config" element={<Confing />}></Route>
                        <Route path="following" element={<Following />}></Route>
                        <Route path="followers" element={<Followers />}></Route>
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
