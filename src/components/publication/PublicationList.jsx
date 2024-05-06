/* eslint-disable react/prop-types */
import { Global } from "../../helpers/Global"
import avatar from '../../assets/img/user.png';
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import ReactTimeAgo from 'react-time-ago'
export const PublicationList = ({page, setPage, maxPage, getPublications, publications}) => {
    const token = localStorage.getItem('token');
    const {auth} = useAuth();
    const nextPage = async () => {
        let nextPage = page + 1;
        setPage(nextPage);
        await getPublications(nextPage);
    }
    const deletePublication = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const urlDelete = Global.baseUrlApi + '/publication/delete/' + id;
                let requestDeletePublication = await fetch(urlDelete, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": token
                    }
                });

                let responseDelete = await requestDeletePublication.json();
                if (responseDelete.status == 200) {
                    await getPublications(1, true);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your post has been deleted.",
                        icon: "success"
                    });
                }

            }
        });

    }

    return (
        <>
            <div className="content__posts">
                {publications.length > 1 && publications.map((pub, index) => (
                    <div className="posts__post" key={index}>

                        <div className="post__container">

                            <div className="post__image-user">
                                <a href="#" className="post__image-link">
                                    {pub.user.image != 'default_img.png' && <img src={Global.baseUrlApi + '/user/avatar/' + pub.user.image} className="post__user-image" alt="Foto de perfil" />}
                                    {pub.user.image == 'default_img.png' && <img src={avatar} className="post__user-image" alt="Foto de perfil" />}
                                </a>
                            </div>

                            <div className="post__body">

                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">{pub.user.name}</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date">Last seen: <ReactTimeAgo date={pub.created_at} locale="es-ES"/></a>
                                </div>

                                <h4 className="post__content">{pub.text}</h4>
                                {pub.file && <img src={Global.baseUrlApi + '/publication/media/' + pub.file} className="post__image" alt={pub.file} />}
                            </div>

                        </div>

                        {auth._id == pub.user._id && <div className="post__buttons">

                            <button className="post__button" onClick={() => deletePublication(pub._id)}>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>

                        </div>}

                    </div>

                )
                )}
            </div>
            {(maxPage > page && maxPage != 0) && <div className="content__container-btn">
                <button className="content__btn-more-post" onClick={nextPage}>
                    Ver mas publicaciones
                </button>
            </div>
            }
        </>
    )
}
