import React, { useState } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import api from '../API'

const storage = require('./Storage');

function NovoContato() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    const id = storage.getUser();
    const token = storage.getToken();

    let history = useHistory();

    const handleCadastroContato = () => {
        api.post("contato", {
            "nome": nome,
            "telefone": telefone,
            "idUser": id,
        }, {
            headers: {
                "Auth-Token": token,
            }
        }).then((response) => {
            alert("Contato criado com sucesso!");
        }).catch((error) => {
            alert(error.response.data.message);
        });
    }

    console.log(storage.tamanho());
    if (storage.tamanho() === 0) {
        return <Redirect to="/login" />;
    };

    const voltar = () =>{
        history.push("/home");
    }

    return (
        <div className="Card">
            <h1>Cadastro de Usuários</h1>
            <form>
                <div><label>
                    Nome:
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                </label></div>
                <div><label>
                    Telefone:
                    <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} />
                </label></div>
            </form>
            <button onClick={voltar}>Voltar</button>
            <button onClick={handleCadastroContato}>Criar</button>
        </div>
    );
}

export default NovoContato;