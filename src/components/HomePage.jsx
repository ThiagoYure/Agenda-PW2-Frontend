import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="Home">
            <h1>Home Page</h1>
            <ul>
                <li><Link to="/login" className="Link">Logue</Link></li>
                <li><Link to="/cadastrousuario" className="Link">Cadastre-se</Link></li>
            </ul>
        </div>
    );
}

export default HomePage;