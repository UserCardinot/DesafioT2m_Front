import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styleSignup.css';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNumber = /\d/.test(password);
        const isValid = password.length >= 6 && hasUpperCase && hasSpecialChar && hasNumber;
        setPasswordValid(isValid);
        return isValid;
    };

    const handleCadastro = async (dadosCadastro) => {
        try {
            setLoading(true);
            const response = await axios.post('https://localhost:7192/api/auth/signup', dadosCadastro);
            setSuccessMessage('Usuário cadastrado com sucesso!')
            setTimeout(() => {
                navigate('/login');
            }, 2500);
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || 'Erro desconhecido';
                if (error.response.status === 409) {
                    setError('O e-mail já está registrado.');
                } else {
                    setError(errorMessage);
                }
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='page-container'>
            <div className='page-header'>
                Cadastro de Usuário
            </div>
            <div className='page-content'>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={(e) => { e.preventDefault(); handleCadastro({ nome, email, password }) }} className="form-container">
                    <div className="input-container">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
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
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            required
                        />
                        <ul className="password-requirements">
                            <li className={/[A-Z]/.test(password) ? 'valid' : 'invalid'}>Pelo menos 1 letra maiúscula</li>
                            <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'valid' : 'invalid'}>Pelo menos 1 caractere especial</li>
                            <li className={/\d/.test(password) ? 'valid' : 'invalid'}>Pelo menos 1 número</li>
                            <li className={password.length >= 6 ? 'valid' : 'invalid'}>Pelo menos 6 caracteres</li>
                        </ul>
                    </div>
                    <button type="submit" className="buttonPress" disabled={loading || !passwordValid}>
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
                <div className="login-link">
                    <p>Já tem uma conta? <a href="/login">Faça login aqui</a></p>
                </div>
            </div>
        </div>
    );
}
