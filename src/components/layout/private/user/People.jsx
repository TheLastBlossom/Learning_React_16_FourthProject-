import { useEffect, useState } from 'react';
import avatar from '../../../../assets/img/user.png';
import { Global } from '../../../../helpers/Global';

export const People = () => {
    const [users, setUsers] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const getUsers = async (nextPage = 1) => {
        const urlUserList = Global.baseUrlApi + '/user/list/' + nextPage;
        let token = localStorage.getItem('token');
        setLoading(true);
        let requestUL = await fetch(urlUserList, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const responseUL = await requestUL.json();
        if (responseUL.status == 200) {
            if (users.length > 1) {
                setUsers([...users, ...responseUL.users]);
            } else {
                setUsers(responseUL.users);
            }
            setMaxPage(responseUL.totalPages);
        }
        setTimeout(() => {
            setLoading(false);

        }, 500);


    }
    const nextPage = async () => {
        let nextPage = page + 1;
        setPage(nextPage);
        await getUsers(nextPage);
    }
    useEffect(() => {
        getUsers(1);
    }, []);
    return (
        <section className="layout__content">

            <header className="content__header">
                <h1 className="content__title">People</h1>
            </header>

            <div className="content__posts">

                {loading ? <h2>Cargando...</h2> : users.map(user => {
                    return (<div key={user._id} className="posts__post">

                        <div className="post__container">

                            <div className="post__image-user">
                                <a href="#" className="post__image-link">
                                    {user.image != 'default_img.png' && <img src={Global.baseUrlApi + '/user/avatar/' + user.image} className="post__user-image" alt="Foto de perfil" />}
                                    {user.image == 'default_img.png' && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                </a>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">{user.name} {user.surname}</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date">{user.created_at}</a>
                                </div>
                                <h4 className="post__content">{user.bio}</h4>


                            </div>

                        </div>


                        <div className="post__buttons">

                            <a href="#" className="post__button post__button--green">
                                Follow
                            </a>
                            <a href="#" className="post__button            ">
                                Unfollow
                            </a>

                        </div>

                    </div>);
                })}
            </div>
            {console.log(maxPage, page, (maxPage > page || maxPage == 0))}
            {(maxPage > page || maxPage == 0) ? (<div className="content__container-btn">
                <button onClick={nextPage} className="content__btn-more-post">
                    Ver mas publicaciones
                </button>
            </div>) : ''}
        </section >
    )
}
