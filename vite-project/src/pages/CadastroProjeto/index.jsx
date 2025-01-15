import { useState } from "react";
import axios from "axios";
import "./styleCadPro.css";
import { useNavigate } from "react-router-dom";

const CadastroProjeto = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [tarefas, setTarefas] = useState([{ descricao: "", prazo: "", status: "", nome: "" }]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const adicionarTarefa = () => {
        setTarefas([...tarefas, { descricao: "", prazo: "", status: "", nome: "" }]);
    };

    const removerTarefa = (index) => {
        const novasTarefas = tarefas.filter((_, i) => i !== index);
        setTarefas(novasTarefas);
    };

    const atualizarTarefa = (index, campo, valor) => {
        const novasTarefas = tarefas.map((tarefa, i) =>
            i === index ? { ...tarefa, [campo]: valor } : tarefa
        );
        setTarefas(novasTarefas);
    };

    const formatDateToDDMMYYYY = (date) => {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedDate.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const prazoFormatado = dataEntrega ? formatDateToDDMMYYYY(dataEntrega) : null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nome = titulo.trim();
        const descricao2 = descricao.trim();
        if (!nome || !descricao2) {
            alert("Nome e Descrição são campos obrigatórios.");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.log('Token não encontrado');
            return;
        }

        const tarefasValidas = tarefas.map((tarefa, index) => ({
            Descricao: tarefa.descricao.trim(),
            Prazo: tarefa.prazo ? formatDateToDDMMYYYY(tarefa.prazo) : null,
            Status: tarefa.status || "Pendente",
            Nome: tarefa.nome || `Tarefa ${index + 1}`  // Atribuindo o nome baseado no índice
        }));

        try {
            const response = await axios.post(
                'https://localhost:7192/api/projeto',
                {
                    Nome: nome,
                    Descricao: descricao2,
                    Prazo: prazoFormatado,
                    Tarefas: tarefasValidas
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setSuccessMessage("Projeto cadastrado com sucesso!");
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Erro ao cadastrar o projeto:', error.response?.data || error);
            alert(`Erro ao cadastrar o projeto: ${error.response?.data.errors || error}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button onClick={() => navigate('/')}>Voltar</button>
            <h3>Cadastro de Projeto</h3>

            {successMessage && <p className="success-message">{successMessage}</p>}

            <div>
                <label htmlFor="titulo">Nome do Projeto:</label>
                <input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="descricao">Descrição do Projeto:</label>
                <input
                    id="descricao"
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="dataEntrega">Data de Entrega:</label>
                <input
                    id="dataEntrega"
                    type="date"
                    value={dataEntrega}
                    onChange={(e) => setDataEntrega(e.target.value)}
                    required
                />
            </div>

            <h3>Tarefas</h3>
            {tarefas.map((tarefa, index) => (
                <div key={index} className="tarefa-container">
                    <h4>Tarefa {index + 1}</h4>
                    <div>
                        <label>Descrição:</label>
                        <input
                            type="text"
                            value={tarefa.descricao}
                            onChange={(e) =>
                                atualizarTarefa(index, "descricao", e.target.value)
                            }
                            required
                        />
                    </div>
                    <div>
                        <label>Prazo:</label>
                        <input
                            type="date"
                            value={tarefa.prazo}
                            onChange={(e) => atualizarTarefa(index, "prazo", e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <input
                            type="text"
                            value={tarefa.status}
                            onChange={(e) => atualizarTarefa(index, "status", e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Nome da Tarefa:</label>
                        <input
                            type="text"
                            value={tarefa.nome || `Tarefa ${index + 1}`}  // Preenche o nome automaticamente com base no índice
                            onChange={(e) => atualizarTarefa(index, "nome", e.target.value)}
                            required
                        />
                    </div>
                    <button type="button" onClick={() => removerTarefa(index)}>
                        Remover Tarefa
                    </button>
                </div>
            ))}
            <button type="button" onClick={adicionarTarefa}>
                Adicionar Tarefa
            </button>

            <button type="submit">Cadastrar Projeto</button>
        </form>
    );
};

export default CadastroProjeto;
