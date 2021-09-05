import React, { useState, useEffect } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import api from '../API';

const storage = require('./Storage');

function ContatoDetalhado({match}) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    let history = useHistory();

    const id = match.params.id;
    const idUser = storage.getUser();
    const token = storage.getToken();

    useEffect(() => {
        handleContato();
    }, []);

    const handleContato = () => {
        api.get(`contato/detalhes/${id}`, {
            headers: {
                "Auth-Token": token,
            }
        }).then((response) => {
            console.log(response.data.contato);
            setNome(response.data.contato.nome);
            setTelefone(response.data.contato.telefone);
        }).catch((error) => {
            alert(error.response.data.message);
        });
    };

    const handleAlterarContato = () => {
        api.patch(`contato/${id}`,{
            "nome": nome,
            "telefone": telefone,
            "idUser": idUser,
        }, {
            headers: {
                "Auth-Token": token,
            }
        }).then((response) => {
            alert("Contato alterado com sucesso!");
            handleContato();
        }).catch((error) => {
            alert(error.response.data.message);
        });
    };

    const handleDeletarContato = () => {
        api.delete(`contato/${id}`, {
            headers: {
                "Auth-Token": token,
            }
        }).then((response) => {
            alert("Contato deletado com sucesso.");
            history.push("/home");
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
            <h1>Contato Detalhado</h1>
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
            <button onClick={handleAlterarContato}>Salvar alterações</button>
            <button onClick={handleDeletarContato}>Excluir contato</button>
        </div>
    );
}

export default ContatoDetalhado;