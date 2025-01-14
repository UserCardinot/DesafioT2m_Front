import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotAuthenticated() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/Login');
        }, 3000);
    }, [navigate]);

    return (
        <div className="not-authenticated-container">
            <h1>Você não está autenticado</h1>
            <p>Você será redirecionado para a página de login...</p>
        </div>
    );
}