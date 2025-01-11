import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [projetos, setProjetos] = useState([
        { id: 1, nome: 'Projeto 1', descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s' },
        { id: 2, nome: 'Projeto 2', descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s' },
        { id: 3, nome: 'Projeto 3', descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s' },
        { id: 4, nome: 'Projeto 4', descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s' },
        { id: 5, nome: 'Projeto 5', descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s' },
        { id: 6, nome: 'Projeto 6', descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s' },
        { id: 7, nome: 'Projeto 7', descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s' }
    ]);
    const navigate = useNavigate();

    const handleCadastrar = () => {
        navigate('/Cadastro');
    };

    const handleEditar = (id) => {
        navigate(`/EditarProjeto/${id}`);
    };

    const handleExcluir = (id) => {
        setProjetos(projetos.filter(projeto => projeto.id !== id));
    };

    return (
        <div className='PageContainer'>
            <div className='PageHeaderContainer'>
                Projetos Cadastrados
            </div>
            <div className='PageContentContainer'>
                {projetos.map(projeto => (
                    <div className="project-card" key={projeto.id}>
                        <h3>{projeto.nome}</h3>
                        <p>{projeto.descricao}</p>
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
                ))}
            </div>

            <div className="button-container"> {/* Novo contêiner para o botão */}
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