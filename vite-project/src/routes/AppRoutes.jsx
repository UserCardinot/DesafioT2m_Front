import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import EditProjeto from '../pages/EditProjeto';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/EditProjeto" element={<EditProjeto />} />
        </Routes>
    );
}
