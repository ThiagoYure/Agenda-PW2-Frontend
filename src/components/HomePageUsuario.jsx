import React, { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import api from '../API'

const storage = require('./Storage');

function HomePageUsuario() {
    const [contatos, setContatos] = useState([]);

    const userId = storage.getUser();
    const token = storage.getToken();

    useEffect(() => {
        handleContatos();
    }, []);

    const handleContatos = () => {
        api.get(`contato/${userId}`, {
            headers: {
                "Auth-Token": token,
            }
        }).then((response) => {
            console.log(response.data.contatos);
            if(response.data.contatos){
                setContatos(response.data.contatos);
            }
        }).catch((error) => {
            //console.log(error.response.data.message);
        });
    };

    console.log(storage.tamanho());
    if (storage.tamanho() === 0) {
        return <Redirect to="/login" />;
    };

    return (
        <div className="Home">
            <h1>Bem vindo a sua agenda de contatos</h1>
            <ul>
                <li><Link to="/perfil" className="Link">Meu perfil</Link></li>
                <li><Link to="/novocontato" className="Link">Novo Contato</Link></li>
            </ul>
            {contatos.length > 0 ?
                <div className="Lista">
                    {contatos.map(contato => (
                        <div key={contato.id} className="Contato">
                            <Link to={`/contatodetalhado/${contato.id}`} className="Link">
                                    <div><b>Nome:</b> {contato.nome}</div>
                                    <div><b>Telefone:</b> {contato.telefone}</div>
                            </Link>
                        </div>
                    ))}
                </div> 
                : <div className="Aviso"><h3>Ainda não há contatos na agenda...</h3></div>
            }

        </div>
    );
}

export default HomePageUsuario;