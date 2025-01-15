import React, { useState, useEffect } from 'react';
import './styleEdit.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditProjeto() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [tarefas, setTarefas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleAdicionarTarefa = () => {
        setTarefas([...tarefas, { nome: '', descricao: '', dataPrazo: '', status: '' }]);
    };

    const handleTarefaChange = (index, field, value) => {
        const novasTarefas = [...tarefas];
        novasTarefas[index][field] = value;
        setTarefas(novasTarefas);
    };

    const handleRemoverTarefa = (index) => {
        const novasTarefas = tarefas.filter((_, i) => i !== index);
        setTarefas(novasTarefas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const prazoFormatado = new Date(dataEntrega).toISOString().split('T')[0];

        const tarefaIds = tarefas.map(tarefa => tarefa.id || null).filter(id => id);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Você precisa estar logado para editar o projeto.');
                return;
            }

            const response = await axios.put(`https://localhost:7192/api/projeto/${id}`, {
                id,
                nome: titulo,
                descricao,
                prazo: prazoFormatado,
                userId: '019466cd-b568-70ff-970e-9aed45a076b9',
                tarefaIds, // Envia apenas os IDs das tarefas
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            alert('Projeto editado com sucesso!');
            navigate(`/`);
        } catch (error) {
            console.error('Erro ao editar o projeto:', error);
            alert(`Erro ao editar o projeto: ${error.message}`);
        }
    };

    return (
        <div className='PageContainerEdit'>
            <div className='PageHeaderContainerEdit'>
                <button onClick={() => navigate('/')}>Voltar</button>
                <div className="header-content-edit">
                    <h1>Edição de Projeto</h1>
                </div>
            </div>

            <form className='PageContentContainerEdit' onSubmit={handleSubmit}>
                <div className='form-group-edit'>
                    <label>Nome do Projeto:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Nome do Projeto"
                        required
                    />
                </div>

                <div className='form-group-edit'>
                    <label>Descrição do Projeto:</label>
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descrição do Projeto"
                        required
                    />
                </div>

                <div className='form-group-edit'>
                    <label>Data de Entrega:</label>
                    <input
                        type="date"
                        value={dataEntrega}
                        onChange={(e) => setDataEntrega(e.target.value)}
                        required
                    />
                </div>

                {/* Tarefas do Projeto */}
                <div className='form-group-edit'>
                    <label>Tarefas:</label>
                    <div className='tarefas-container-edit'>
                        {tarefas.length > 0 ? (
                            tarefas.map((tarefa, index) => {
                                return (
                                    <div key={index} className='tarefa-input-edit'>
                                        <input
                                            type='text'
                                            value={tarefa.nome}
                                            onChange={(e) => handleTarefaChange(index, 'nome', e.target.value)}
                                            placeholder={`Nome da Tarefa ${index + 1}`}
                                            required
                                        />
                                        <textarea
                                            value={tarefa.descricao}
                                            onChange={(e) => handleTarefaChange(index, 'descricao', e.target.value)}
                                            placeholder={`Descrição da Tarefa ${index + 1}`}
                                        />
                                        <input
                                            type='date'
                                            value={tarefa.dataPrazo}
                                            onChange={(e) => handleTarefaChange(index, 'dataPrazo', e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            value={tarefa.status}
                                            onChange={(e) => handleTarefaChange(index, 'status', e.target.value)}
                                            placeholder={`Status da Tarefa ${index + 1}`}
                                        />
                                        <button type='button' className='remove-task-edit' onClick={() => handleRemoverTarefa(index)}>
                                            &times;
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Não há tarefas cadastradas para este projeto.</p>
                        )}
                        <button type='button' onClick={handleAdicionarTarefa} className="buttonAdicionarTarefaEdit">
                            Adicionar Tarefa
                        </button>
                    </div>
                </div>

                <button type='submit' className='buttonPressEdit'>
                    Editar Projeto
                </button>
            </form>
        </div>
    );
}
