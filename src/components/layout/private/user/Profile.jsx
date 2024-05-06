/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import avatar from '../../../../assets/img/user.png';
import { GetProfile } from '../../../../helpers/GetProfile';
import { Link, useParams } from 'react-router-dom';
import { Global } from '../../../../helpers/Global';
import useAuth from '../../../../hooks/useAuth';
export const Profile = () => {
    const [user, setUser] = useState({});
    const params = useParams();
    const token = localStorage.getItem('token');
    const { auth, setCounter, counter } = useAuth();
    const [counterl, setCounterl] = useState({});
    const [iFollow, setIfollow] = useState(false);
    const getCounters = async () => {
        const urlCounter = Global.baseUrlApi + '/user/counter/' + params.userId;
        let requestCounter = await fetch(urlCounter, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        let responseCounter = await requestCounter.json();
        if (responseCounter.status == 200) {
            setCounterl({
                "following": responseCounter.following,
                "followed": responseCounter.followed,
                "publications": responseCounter.publications
            });
        }
    }

    const newFollow = async (id) => {
        const newFollow = Global.baseUrlApi + '/follow/save';
        let token = localStorage.getItem('token');
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
            setIfollow(true);
            setCounter(
                {
                    "following": counter.following + 1,
                    "followed": counter.followed,
                    "publications": counter.publications
                }
            );
        }
    }
    const unfollow = async (id) => {
        const unfollow = Global.baseUrlApi + '/follow/unfollow/' + id;
        let token = localStorage.getItem('token');
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
            setIfollow(false);
            setCounter(
                {
                    "following": counter.following - 1,
                    "followed": counter.followed,
                    "publications": counter.publications
                }
            );
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            let dataUser = await GetProfile(params.userId, setUser);
            console.info(dataUser);
            if (dataUser.following && dataUser.following._id) setIfollow(true);
            getCounters();
        };

        fetchData();

    }, [params.userId]);


    return (
        <section className="layout__content">
            <header className="aside__profile-info">
                <div className="profile-info__general-info">
                    <div className="general-info__container-avatar">
                        {user.image != 'default_img.png' && <img src={Global.baseUrlApi + '/user/avatar/' + user.image} className="container-avatar__img" alt="Foto de perfil" />}
                        {user.image == 'default_img.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                    </div>

                    <div className="general-info__container-names">
                        <div className="container-names__name">
                            <h1 className='container-names__name_fullname'>{user.name} {user.surname}</h1>&nbsp;
                            {auth._id != user._id &&
                                (iFollow ? <button className="content__button content__button--right content__button--red" onClick={()=>unfollow(params.userId)}>Unfollow</button> : <button className="content__button content__button--right content__button--green" onClick={()=>newFollow(params.userId)}>Follow</button>)
                            }
                        </div>
                        <h2 className="container-names__nickname">{user.nickname}</h2>
                        <p>{user.bio}</p>
                    </div>
                </div>

                <div className="profile-info__stats">
                    <div className="stats__following">
                        <Link to={"/network/following/" + params.userId} className="following__link">
                            <span className="following__title">Siguiendo</span>
                            <span className="following__number">{counterl.following}</span>
                        </Link>
                    </div>
                    <div className="stats__following">
                        <Link to={"/network/followers/" + params.userId} className="following__link">
                            <span className="following__title">Seguidores</span>
                            <span className="following__number">{counterl.followed}</span>
                        </Link>
                    </div>


                    <div className="stats__following">
                        <Link to={"/network/profile/" + params.userId} className="following__link">
                            <span className="following__title">Publicaciones</span>
                            <span className="following__number">{counterl.publications}</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="content__posts">

                <div className="posts__post">

                    <div className="post__container">

                        <div className="post__image-user">
                            <a href="#" className="post__image-link">
                                <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                            </a>
                        </div>

                        <div className="post__body">

                            <div className="post__user-info">
                                <a href="#" className="user-info__name">Victor Robles</a>
                                <span className="user-info__divider"> | </span>
                                <a href="#" className="user-info__create-date">Hace 1 hora</a>
                            </div>

                            <h4 className="post__content">Hola, buenos dias.</h4>

                        </div>

                    </div>


                    <div className="post__buttons">

                        <a href="#" className="post__button">
                            <i className="fa-solid fa-trash-can"></i>
                        </a>

                    </div>

                </div>
            </div>

            <div className="content__container-btn">
                <button className="content__btn-more-post">
                    Ver mas publicaciones
                </button>
            </div>

        </section>


    )
}
