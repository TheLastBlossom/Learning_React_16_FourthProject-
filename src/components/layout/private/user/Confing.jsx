import { useState } from "react";
import { Global } from "../../../../helpers/Global";
import { SerializeForm } from "../../../../helpers/SerializeForm";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "../../../../hooks/UseForm";

export const Confing = () => {
    // eslint-disable-next-line no-unused-vars
    const { form, setForm } = useForm({});
    const { auth, setAuth } = useAuth();
    const [updated, setUpdated] = useState('');
    let token = localStorage.getItem('token');

    const updateUser = async (e) => {
        e.preventDefault();
        let object = SerializeForm(e.target);
        delete object.image;
        delete object.password;

        const urlUserUpdate = Global.baseUrlApi + '/user/update';
        let requestUU = await fetch(urlUserUpdate, {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
        let responseUU = await requestUU.json();
        if (responseUU.status == 200) {
            setUpdated('OK');
            delete responseUU.message.password;
            setAuth(responseUU.message)
        } else {
            setUpdated('ERROR');
        }
        //upload profile image if there's one
        let fileInput = document.querySelector('#image');
        if (responseUU.status == 200 && fileInput.files[0]) {
            let formData = new FormData();
            formData.append('image', fileInput.files[0]);
            let urlUploadProfile = Global.baseUrlApi + '/user/upload';
            let requestUP = await fetch(urlUploadProfile, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": token
                }
            });
            let responseUP = await requestUP.json();
            if (responseUP.status == 200) {
                setUpdated('OK');
                delete responseUP.message.password;
                setAuth(responseUP.message)
            } else {
                setUpdated('ERROR');
            }
        }


        setTimeout(() => {
            setUpdated('');
        }, 2000);
    }

    return (
        <section className="layout__content">
            <header className="content__header content__header--public">
                <h1 className="content__title">Config</h1>
            </header>
            <div className="content__posts">
                {updated == 'OK' ? <strong className="alert alert-success">User updated sucessfully!</strong> : ''}
                {updated == 'ERROR' ? <strong className="alert alert-danger"> An error ocurred while updating the user, try later.</strong> : ''}
                {/* {saved == 'DUPLICATED' ? <strong className="alert alert-danger">A user with this email or nickname already exists.</strong> : ''} */}
                <form className="register-form" onSubmit={updateUser}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" defaultValue={auth.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" name="surname" id="surname" defaultValue={auth.surname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nick">Nick</label>
                        <input type="text" name="nick" id="nick" defaultValue={auth.nick} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" defaultValue={auth.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea name="bio" id="bio" cols="30" rows="10" defaultValue={auth.bio}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Avatar</label>
                        <div className="avatar">
                            {auth.image != 'default_img.png' && <img src={Global.baseUrlApi + '/user/avatar/' + auth.image} className="container-avatar__img" alt="Foto de perfil" />}
                            {auth.image == 'default_img.png' && <img src={auth.image} className="container-avatar__img" alt="Foto de perfil" />}
                        </div>
                        <input type="file" name="image" id="image" />
                    </div>
                    <br></br>
                    <input type="submit" value="Registrarse" className="btn btn-success" />
                </form>
            </div>
        </section>
    )
}
