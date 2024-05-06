/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import avatar from '../../../../assets/img/user.png';
import { Global } from '../../../../helpers/Global';
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago'

export const UserList = ({ users, loading, setLoading, following, setFollowing, page, maxPage, nextPage }) => {
    const { auth, counter, setCounter } = useAuth();
    const [loggedFollowing, setLoggedFollowing] = useState([]);
    const token = localStorage.getItem('token');
    const getLoggedFollowing = async (nextPage = 1) => {
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
        if (responseUL.status == 200) {                       
            setLoggedFollowing(responseUL.following);
        }
        setLoading(false);
    }    

    const newFollow = async (id) => {
        const newFollow = Global.baseUrlApi + '/follow/save';
        let token = localStorage.getItem('token');
        setLoading(true);
        let requestUL = await fetch(newFollow, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ followed: id })
        });
        const responseUL = await requestUL.json();
        if (responseUL.status == 200) {
            let newFollowed = responseUL.followed.followed;
            setFollowing([...following, newFollowed]);
            setLoggedFollowing([...loggedFollowing, newFollowed]);
            setCounter(
                {
                    "following": counter.following + 1,
                    "followed": counter.followed,
                    "publications": counter.publications
                }
            );
        }
        setLoading(false);

    }
    const unfollow = async (id) => {
        const unfollow = Global.baseUrlApi + '/follow/unfollow/' + id;
        let token = localStorage.getItem('token');
        setLoading(true);
        let requestUL = await fetch(unfollow, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ followed: id })
        });
        const responseUL = await requestUL.json();
        if (responseUL.status == 200) {
            setFollowing(following.filter(i => i != id));
            setLoggedFollowing(loggedFollowing.filter(i => i != id));
            setCounter(
                {
                    "following": counter.following - 1,
                    "followed": counter.followed,
                    "publications": counter.publications
                }
            );
        }
        setLoading(false);

    }

    useEffect(()=>{        
        getLoggedFollowing();

    }, []);
    return (
        <>
            <div className="content__posts">

                {loading ? <h2>Cargando...</h2> : users.map(user => {
                    return (<div key={user._id} className="posts__post">

                        <div className="post__container">

                            <div className="post__image-user">
                                <Link to={"/network/profile/"+user._id} className="post__image-link">
                                    {user.image != 'default_img.png' && <img src={Global.baseUrlApi + '/user/avatar/' + user.image} className="post__user-image" alt="Foto de perfil" />}
                                    {user.image == 'default_img.png' && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                </Link>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <Link to={"/network/profile/"+user._id} className="user-info__name">{user.name} {user.surname}</Link>
                                    <span className="user-info__divider"> | </span>
                                    <Link to={"/network/profile/"+user._id} className="user-info__create-date">Joined ago: <ReactTimeAgo date={user.created_at} locale="es-ES"/></Link>
                                </div>
                                <h4 className="post__content">{user.bio}</h4>


                            </div>

                        </div>


                        {auth._id != user._id && <div className="post__buttons">
                            {(loggedFollowing.includes(user._id))  ? <button className="post__button" onClick={() => unfollow(user._id)}>
                                Unfollow
                            </button> : <button onClick={() => newFollow(user._id)} className="post__button post__button--green">
                                Follow
                            </button>}
                        </div>}
                    </div>);
                })}
            </div>           
            {(maxPage > page || maxPage == 0) ? (<div className="content__container-btn">
                <button onClick={nextPage} className="content__btn-more-post">
                    Ver mas publicaciones
                </button>
            </div>) : ''}
        </>
    )
}
