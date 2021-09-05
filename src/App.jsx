import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Login from './components/Login';
import CadastroUsuario from './components/CadastroUsuario';
import HomePageUsuario from './components/HomePageUsuario';
import PerfilUsuario from './components/PerfilUsuario';
import NovoContato from './components/NovoContato';
import ContatoDetalhado from './components/ContatoDetalhado';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="Body">
      <div className="Nav">
          <h2> -- Agenda de Contatos -- </h2>
      </div>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/cadastrousuario" component={CadastroUsuario} />
            <Route path="/home" component={HomePageUsuario} />
            <Route path="/perfil" component={PerfilUsuario} />
            <Route path="/novocontato" component={NovoContato} />
            <Route path="/contatodetalhado/:id" component={ContatoDetalhado} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
