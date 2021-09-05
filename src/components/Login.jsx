import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../API';
import jwt from 'jwt-decode';

const storage = require('./Storage');


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    storage.clean();

    const handleLogin = () => {
        api.post("user/login", {
            "email": email,
            "password": password
        }).then((response) => {
            storage.setToken(response.data.token);
            const token = jwt(response.data.token);
            storage.setUser(token.id);
            history.push('/home');
        }).catch((error) => {
            //alert(error.response.data.message);
            alert(error);
        });
    }

    const voltar = () =>{
        history.push("/");
    }

    return (
        <div className="Card">
            <h1>Login</h1>
            <form>
                <div>
                    <label>
                        Email:
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Senha:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                </div>
            </form>
            <button onClick={voltar}>Página Inicial</button>
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}

export default Login;