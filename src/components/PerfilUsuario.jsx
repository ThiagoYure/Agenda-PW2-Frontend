import React, { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import api from '../API';

const storage = require('./Storage');

function PerfilUsuario() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    let history = useHistory();

    const id = storage.getUser();
    const token = storage.getToken();

    useEffect(() => {
        handleUser();
    }, []);

    const handleUser = () => {
        api.get(`user/${id}`, {
            headers: {
                "Auth-Token": token,
            }
        }).then((response) => {
            console.log(response.data.user);
            setUsername(response.data.user.username);
            setEmail(response.data.user.email);
        }).catch((error) => {
            console.log(error.response.data.message);
        });
    };

    const handleLogout = () => {
        storage.clean();
        history.push("/login");
    };

    const handleAlterarUser = () => {
        api.patch(`user/${id}`, {
            "id": id,
            "username": username,
            "email": email,
        }, {
            headers: {
                "Auth-Token": token,
            }
        }).then((response) => {
            alert("Perfil alterado com sucesso!");
            handleUser();
        }).catch((error) => {
            alert(error.response.data.message);
        });
    };

    const handleDeletarUser = () => {
        api.delete(`user/${id}`, {
            headers: {
                "Auth-Token": token,
            }
        }).then((response) => {
            alert("Perfil deletado com sucesso. Tchau...");
            storage.clean();
            history.push("/login");
        }).catch((error) => {
            alert(error.response.data.message);
        });
    };

    console.log(storage.tamanho());
    if (storage.tamanho() === 0) {
        return <Redirect to="/login" />;
    };

    const voltar = () =>{
        history.push("/home");
    }

    return (
        <div className="Card">
            <h1>Perfil do Usuário</h1>
            <form>
                <div><label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label></div>
                <div><label>
                    Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label></div>
            </form>
            <button onClick={voltar}>Voltar</button>
            <button onClick={handleAlterarUser}>Salvar alterações</button>
            <button onClick={handleDeletarUser}>Excluir conta</button>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}

export default PerfilUsuario;