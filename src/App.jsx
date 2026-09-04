import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import UserList from "./components/UserList";
import "./style.css";

function App() {
    const url = "https://jsonplaceholder.typicode.com";
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscarUsuarios() {
            try {
                setCarregando(true);
                setError(null);
                const response = await axios.get(`${url}/users`);
                setUsuarios(response.data);
            } catch (err) {
                console.error("Erro ao buscar usuários:", err);
                setError(`Ocorreu um erro ao buscar os usuários: ${err.message}`);
                setUsuarios([]);
            } finally {
                setCarregando(false);
            }
        }

        buscarUsuarios();
    }, []);

    const usuariosFiltrados = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return usuarios;

        return usuarios.filter(
            (user) =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.username.toLowerCase().includes(term)
        );
    }, [usuarios, searchTerm]);

    return (
        <div className="container">
            <h1 className="h1">Lista de Usuários</h1>
            <p>Aqui estão os usuários cadastrados: {usuariosFiltrados.length}</p>
            <h2 className="h2">Buscar Usuários</h2>
            <SearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {carregando && <p>Carregando usuários...</p>}
            {error && <p className="error">{error}</p>}
            {!error && !carregando && <UserList usuarios={usuariosFiltrados} />}
        </div>
    );
}

export default App;