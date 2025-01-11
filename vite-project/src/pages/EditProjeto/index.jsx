import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function CadastroProjeto() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [tarefas, setTarefas] = useState(['']);
    const navigate = useNavigate();

    const handleAdicionarTarefa = () => {
        setTarefas([...tarefas, '']);
    };

    const handleTarefaChange = (index, value) => {
        const novasTarefas = [...tarefas];
        novasTarefas[index] = value;
        setTarefas(novasTarefas);
    };

    const handleRemoverTarefa = (index) => {
        const novasTarefas = tarefas.filter((_, i) => i !== index);
        setTarefas(novasTarefas);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ titulo, descricao, dataEntrega, tarefas });
        navigate('/');
    };

    return (
        <div className='PageContainer'>
            <div className='PageHeaderContainer'>
                Editação de Projeto
            </div>
            <form className='PageContentContainer' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='titulo'>Título do Projeto:</label>
                    <input
                        type='text'
                        id='titulo'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='descricao'>Descrição:</label>
                    <textarea
                        id='descricao'
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='dataEntrega'>Data de Entrega:</label>
                    <input
                        type='date'
                        id='dataEntrega'
                        value={dataEntrega}
                        onChange={(e) => setDataEntrega(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Tarefas:</label>
                    <div className='tarefas-container'>
                        {tarefas.map((tarefa, index) => (
                            <div key={index} className='tarefa-input'>
                                <input
                                    type='text'
                                    value={tarefa}
                                    onChange={(e) => handleTarefaChange(index, e.target.value)}
                                    placeholder={`Tarefa ${index + 1}`}
                                    required
                                />
                                <button type='button' className='remove-task' onClick={() => handleRemoverTarefa(index)}>
                                    &times; {/* Símbolo "X" */}
                                </button>
                            </div>
                        ))}
                        <button type='button' onClick={handleAdicionarTarefa}>
                            Adicionar Tarefa
                        </button>
                    </div>
                </div>
                <button type='submit' className='buttonPress'>
                    Editar Projeto
                </button>
            </form>
        </div>
    );
}