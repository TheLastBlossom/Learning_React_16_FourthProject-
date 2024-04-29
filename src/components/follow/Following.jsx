import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { UserList } from '../layout/private/user/UserList';
import useAuth from "../../hooks/useAuth";
import { getProfile } from '../../helpers/GetProfile';
export const Following = () => {
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [following, setFollowing] = useState([]);
    const { auth } = useAuth();
    let token = localStorage.getItem('token');

    const getUsers = async (nextPage = 1) => {
        const urlUserList = Global.baseUrlApi + '/follow/following/' + auth._id + '/' + nextPage;
        setLoading(true);
        let requestUL = await fetch(urlUserList, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        });

        const responseUL = await requestUL.json();
        let cleanUsers = [];
        responseUL.body.forEach((follow) => {
            cleanUsers = [...cleanUsers, follow.followed];
        });
        if (responseUL.status == 200) {
            if (users.length > 1) {
                setUsers([...users, ...cleanUsers]);
            } else {
                setUsers(cleanUsers);
            }
            setMaxPage(responseUL.total);
            setFollowing(responseUL.following);
        }
        setLoading(false);
    }
    const nextPage = async () => {
        let nextPage = page + 1;
        setPage(nextPage);
        await getUsers(nextPage);
    }

    useEffect(() => {
        getProfile(auth._id, setProfile);
        getUsers(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  
    return (
        <section className="layout__content">
            <header className="content__header">
                <h1 className="content__title">The user {profile.name} {profile.surname} is following</h1>
            </header>
            <UserList users={users} loading={loading} setLoading={setLoading} following={following} setFollowing={setFollowing} page={page} maxPage={maxPage} nextPage={nextPage} />
        </section >
    )
}
