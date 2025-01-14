import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styleSignin.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7192/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            setSuccessMessage('Login realizado com sucesso!');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            setError('Erro ao tentar fazer login. Verifique suas credenciais.');
            console.error('Erro de login:', err);
            setTimeout(() => {
                setError('');
            }, 4000);
        }
    };

    return (
        <div className='page-container'>
            <div className='page-header'>
                Login
            </div>
            <div className='page-content'>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleLogin} className="form-container">
                    <div className="input-container">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="buttonPress">Entrar</button>
                </form>
                <div className="register-link">
                    <p>Ainda não tem uma conta? <a href="/signup">Cadastre-se aqui</a></p>
                </div>
            </div>
        </div>
    );
}
