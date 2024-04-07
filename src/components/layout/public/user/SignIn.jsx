import { useState } from "react";
import { Global } from "../../../../helpers/Global";
import { useForm } from "../../../../hooks/UseForm"

export const SignIn = () => {
    // eslint-disable-next-line no-unused-vars
    const { form, setForm, changed } = useForm({});
    const [login, setLogin] = useState('');

    let signIn = async(e) => {
        e.preventDefault();
        let user = form;
        console.log(user);
        const url = Global.baseUrlApi + '/user/signin';
        let request = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let response = await request.json();
        if(response.status == 200){
            setLogin('OK');
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.message));
        }else{
            setLogin('ERROR');
        }
    }
    return (
        <section className="layout__content">

            <header className="content__header content__header--public">
                <h1 className="content__title">Sign In</h1>
            </header>
            <div className="content__posts">
            {login == 'OK' ? <strong className="alert alert-success">Sign In sucessfull!</strong> : ''}
                {login == 'ERROR' ? <strong className="alert alert-danger">Email or password incorrect!</strong> : ''}
                <form className="form-login" onSubmit={signIn}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={changed} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={changed} />
                    </div>
                    <input type="submit" value="Log In" className="btn btn-success" />
                </form>
            </div>
        </section>
    )
}
