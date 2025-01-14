import React, { useState, useEffect } from 'react';
import './styleHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const [projetos, setProjetos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = 'https://localhost:7192/api/projeto';

        const fetchProjetos = async () => {
            try {
                console.log('Iniciando a requisição para obter projetos');
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('Você precisa estar logado para visualizar os projetos.');
                    return; // Não redireciona, apenas exibe o alerta
                }

                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Resposta recebida:', response.data);
                setProjetos(response.data);
            } catch (error) {
                console.error('Erro ao carregar os projetos:', error);
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        alert('Sessão expirada ou não autorizada. Por favor, faça login novamente.');
                        // Remover o token para evitar problemas de autenticação futura
                        localStorage.removeItem('token');
                        // Não redireciona automaticamente, apenas exibe a mensagem
                    } else {
                        const errorMessage = error.response.data?.message || 'Erro desconhecido';
                        alert(`Erro: ${errorMessage}`);
                    }
                } else if (error.request) {
                    console.error('Sem resposta do servidor:', error.request);
                    alert('Sem resposta do servidor. Tente novamente.');
                } else {
                    console.error('Erro na configuração da requisição:', error.message);
                    alert(`Erro na requisição: ${error.message}`);
                }
            }
        };

        fetchProjetos();
    }, []);




    const handleCadastrar = () => {
        navigate('/Cadastro');
    };

    const handleEditar = (id) => {
        navigate(`/EditarProjeto/${id}`);
    };

    const handleExcluir = async (id) => {
        try {
            await axios.delete(`http://localhost:7192/api/projeto/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setProjetos(projetos.filter(projeto => projeto.id !== id));
        } catch (error) {
            console.error('Erro ao excluir o projeto:', error);
            alert(`Erro ao excluir o projeto: ${error.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/Login');
    };

    return (
        <div className='PageContainer'>
            <div className='PageHeaderContainer'>
                <div className="header-content">
                    <h1>Projetos Cadastrados</h1>
                    <button onClick={handleLogout} className="buttonLogout">
                        Logout
                    </button>
                </div>
            </div>
            <div className='PageContentContainer'>
                {projetos.length > 0 ? (
                    projetos.map(projeto => (
                        <div className="project-card" key={projeto.id}>
                            <div className="project-details">
                                <h3>{projeto.nome}</h3>
                                <p>{projeto.descricao}</p>
                            </div>
                            <div className="task-list">
                                <h4>Tarefas:</h4>
                                {projeto.tarefas && projeto.tarefas.length > 0 ? (
                                    projeto.tarefas.map(tarefa => (
                                        <div key={tarefa.id} className="task-item">
                                            <p><strong>Nome:</strong> {tarefa.nome}</p>
                                            <p><strong>Status:</strong> {tarefa.status}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Sem tarefas associadas.</p>
                                )}
                            </div>
                            <div className="project-actions">
                                <button
                                    onClick={() => handleEditar(projeto.id)}
                                    className="buttonEdit"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleExcluir(projeto.id)}
                                    className="buttonDelete"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Não há projetos cadastrados.</p>
                )}
            </div>

            <div className="button-container">
                <button
                    aria-label="Cadastrar novo projeto"
                    onClick={handleCadastrar}
                    className="buttonPress"
                >
                    <span>Cadastrar novo projeto</span>
                </button>
            </div>
        </div>
    );
}