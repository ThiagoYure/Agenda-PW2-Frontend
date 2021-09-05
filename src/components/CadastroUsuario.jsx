import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../API'

function CadastroUsuario() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const handleCadastroUsuario = () => {
        api.post("user/register", {
            "username": username,
            "email": email,
            "password": password,
            "confirmado": false
        }).then((response) => {
            alert("Usuário cadastrado com sucesso! Confirme o seu email para conseguir fazer o login.");
            history.push('/login');
        }).catch((error) => {
            alert(error.response.data.message);
        });
    }

    const voltar = () =>{
        history.push("/");
    }

    return (
        <div className="Card">
            <h1>Cadastro de Usuários</h1>
            <form>
                <div>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                </div>
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
            <button onClick={handleCadastroUsuario}>Cadastrar</button>
        </div>
    );
}

export default CadastroUsuario;