import { useEffect, useState } from 'react';
import { Global } from '../../../../helpers/Global';
import { UserList } from './UserList';
export const People = () => {
    const [users, setUsers] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [following, setFollowing] = useState([]);

    const getUsers = async (nextPage = 1) => {
        const urlUserList = Global.baseUrlApi + '/user/list/' + nextPage;
        let token = localStorage.getItem('token');
        setLoading(true);
        let requestUL = await fetch(urlUserList, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        });

        const responseUL = await requestUL.json();
        if (responseUL.status == 200) {
            if (users.length > 1) {
                setUsers([...users, ...responseUL.users]);
            } else {
                setUsers(responseUL.users);
            }
            setMaxPage(responseUL.totalPages);
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
        getUsers(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section className="layout__content">
            <header className="content__header">
                <h1 className="content__title">People</h1>
            </header>   
            <UserList users={users} loading={loading} setLoading={setLoading} following={following} setFollowing={setFollowing} page={page} maxPage={maxPage} nextPage={nextPage}/>       
        </section >
    )
}
