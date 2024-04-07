import { useState } from "react";
import { Global } from "../../../../helpers/Global";
import { useForm } from "../../../../hooks/UseForm"

export const SignUp = () => {
    // eslint-disable-next-line no-unused-vars
    const { form, setForm, changed } = useForm({});
    const [saved, setSaved] = useState('');
    let saveUser = async (e) => {
        e.preventDefault();
        let newUser = form;
        const url = Global.baseUrlApi + '/user/signup';
        let request = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await request.json();
        if (data.status == 200) {
            setSaved('OK');
        } else if(data.status == 400){
            setSaved('DUPLICATED');
        }else{
            setSaved('ERROR');
        }
        console.log(data);
    };
    return (
        <section className="layout__content">
            <header className="content__header content__header--public">
                <h1 className="content__title">Sign Up</h1>
            </header>
            <div className="content__posts">
                {saved == 'OK' ? <strong className="alert alert-success">User registed sucessfully!</strong> : ''}
                {saved == 'ERROR' ? <strong className="alert alert-danger"> An error ocurred while registering the user, try later.</strong> : ''}
                {saved == 'DUPLICATED' ? <strong className="alert alert-danger">A user with this email or nickname already exists.</strong> : ''}
                <form className="register-form" onSubmit={saveUser}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" name="surname" id="surname" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nick">Nick</label>
                        <input type="text" name="nick" id="nick" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={changed} />
                    </div>
                    <input type="submit" value="Registrarse" className="btn btn-success" />
                </form>
            </div>
        </section>
    )
}
