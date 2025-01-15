import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cadastro from '../pages/CadastroProjeto';
import EditProjeto from '../pages/EditProjeto';
import Login from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PrivateRoute from './PrivateRoute';
import NotAuthenticated from '../pages/NotAuthenticated/NotAuthenticated';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/Cadastro" element={<PrivateRoute><Cadastro /></PrivateRoute>} />
            <Route path="/EditProjeto/:id" element={<PrivateRoute><EditProjeto /></PrivateRoute>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/not-authenticated" element={<NotAuthenticated />} />
        </Routes>
    );
}
