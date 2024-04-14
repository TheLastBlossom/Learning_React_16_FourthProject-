import useAuth from "../../../../hooks/useAuth";

export const Logout = () => {
    localStorage.clear();    
    const {setAuth, setCounter} = useAuth();
    setAuth({});
    setCounter({});
    // window.location.reload();
    return (
        <div>Singing out...</div>
    )
}
