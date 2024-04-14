import { createContext, useEffect, useState } from "react"
import { Global } from "../helpers/Global";
const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useState({});
    const [counter, setCounter] = useState({});
    const [loading, setLoading] = useState(true);
    const authUser = async () => {
        try {
            let token = localStorage.getItem('token');
            let user = localStorage.getItem('user');
            if (!token || !user) {
                setLoading(false);
                return false;
            }
            let userObj = JSON.parse(user);
            let userId = userObj._id;
            const urlProfile = Global.baseUrlApi + '/user/profile/' + userId;
            const urlCounter = Global.baseUrlApi + '/user/counter';
            let requestProfile = await fetch(urlProfile, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            let requestCounter = await fetch(urlCounter, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            let responseProfile = await requestProfile.json();
            let responseCounter = await requestCounter.json();
            if (responseProfile.status == 200 && responseCounter.status == 200) {
                setAuth(responseProfile.message);
                setCounter({
                    "following": responseCounter.following,
                    "followed": responseCounter.followed,
                    "publications": responseCounter.publications
                });
                setLoading(false);            
            } else {
                setLoading(false);
                return false;
            }
        } catch (error) {
            setLoading(false);
            return false;
        }

    }
    useEffect(() => {
        authUser();
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth, counter, loading, setCounter }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
