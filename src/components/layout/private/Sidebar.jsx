import { Link } from 'react-router-dom';
import avatar from '../../../assets/img/user.png';
import { Global } from '../../../helpers/Global';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useForm } from '../../../hooks/UseForm';
export const Sidebar = () => {
    const { auth, counter, setCounter } = useAuth();
    const { form, changed } = useForm();
    const [isSaved, setIsSaved] = useState('');
    let token = localStorage.getItem('token');
    const savePublication = async (e) => {
        e.preventDefault();
        let publication = form;
        console.log(form)
        const url = Global.baseUrlApi + '/publication/save';
        let request = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(publication),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        let response = await request.json();
        if (response.status == 200) {
            let form = document.querySelector("#publication_form");
            const image = document.querySelector("#image");
            if (image.files[0]) {
                let id = response.message._id;
                const formData = new FormData();
                formData.append("image", image.files[0]);
                const urlUploadImage = Global.baseUrlApi + '/publication/upload/' + id;
                let requestUploadImage = await fetch(urlUploadImage, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        // "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                let responseUploadImage = await requestUploadImage.json();
                if (responseUploadImage.status == 200) {
                    form.reset();
                    setIsSaved('OK');
                    setCounter(
                        {
                            "following": counter.following,
                            "followed": counter.followed,
                            "publications": counter.publications + 1
                        }
                    );
                    setTimeout(() => {
                        setIsSaved('');
                    }, 1000);
                } else {
                    setIsSaved('ERROR');
                    setTimeout(() => {
                        setIsSaved('');
                    }, 1000);
                }

            } else {
                form.reset();
                setIsSaved('OK');
                setCounter(
                    {
                        "following": counter.following,
                        "followed": counter.followed,
                        "publications": counter.publications + 1
                    }
                );
                setTimeout(() => {
                    setIsSaved('');
                }, 1000);
            }

        } else {
            setIsSaved('ERROR');
            setTimeout(() => {
                setIsSaved('');
            }, 1000);
        }

    }
    return (
        <aside className="layout__aside">

            <header className="aside__header">
                <h1 className="aside__title">Hola, {auth.name}</h1>
            </header>

            <div className="aside__container">

                <div className="aside__profile-info">

                    <div className="profile-info__general-info">
                        <div className="general-info__container-avatar">
                            {auth.image != 'default_img.png' && <img src={Global.baseUrlApi + '/user/avatar/' + auth.image} className="container-avatar__img" alt="Foto de perfil" />}
                            {auth.image == 'default_img.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                        </div>

                        <div className="general-info__container-names">
                            <Link to={"/network/profile/" + auth._id} className="container-names__name">{auth.name} {auth.surname}</Link>
                            <p className="container-names__nickname">{auth.nick}</p>
                        </div>
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <Link to={'/network/following/' + auth._id} className="following__link">
                                <span className="following__title">Siguiendo</span>
                                <span className="following__number">{counter.following}</span>
                            </Link>
                        </div>
                        <div className="stats__following">
                            <Link to={'/network/followers/' + auth._id} className="following__link">
                                <span className="following__title">Seguidores</span>
                                <span className="following__number">{counter.followed}</span>
                            </Link>
                        </div>


                        <div className="stats__following">
                            <Link to={"/network/profile/" + auth._id} className="following__link">
                                <span className="following__title">Publicaciones</span>
                                <span className="following__number">{counter.publications}</span>
                            </Link>
                        </div>


                    </div>
                </div>


                <div className="aside__container-form">
                    {isSaved == 'OK' ? <strong className="alert alert-success">Successful publication!</strong> : ''}
                    {isSaved == 'ERROR' ? <strong className="alert alert-danger"> Your post could not be saved, try again.</strong> : ''}
                    <form className="container-form__form-post" onSubmit={savePublication} id='publication_form'>

                        <div className="form-post__inputs">
                            <label htmlFor="text" className="form-post__label">¿Que estas pesando hoy?</label>
                            <textarea name="text" id='text' className="form-post__textarea" onChange={changed}></textarea>
                        </div>

                        <div className="form-post__inputs">
                            <label htmlFor="image" className="form-post__label">Sube tu foto</label>
                            <input type="file" name="image" id='image' className="form-post__image" />
                        </div>

                        <input type="submit" value="Enviar" className="form-post__btn-submit" />

                    </form>

                </div>

            </div>

        </aside>
    )
}
