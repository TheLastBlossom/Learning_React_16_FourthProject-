import { Global } from "./Global";

export const getProfile = async (id, setProfile) => {
    let token = localStorage.getItem('token');
    const url = Global.baseUrlApi + '/user/profile/' + id;
    let request = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });
    let response = await request.json();
    if (response.status == 200) {
        console.info(response);
        setProfile(response.message);
    }
}
