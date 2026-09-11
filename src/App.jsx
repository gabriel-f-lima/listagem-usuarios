import { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "./components/HeaderComponent";
import Loading from "./components/Loading";
import UserListComponent from "./components/UserListComponent";
import UserDetailsComponents from "./components/UserDetailsComponents";
import UserForm from "./components/UserForm";
import Modal from "./components/Modal";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import "./styles.css";

const filtrarUsuariosPorTermo = (termo) => (usuario) => {
  const termoLower = termo.trim().toLowerCase();

  if (!termoLower) return true;

  return (
    usuario.name.toLowerCase().includes(termoLower) ||
    usuario.email.toLowerCase().includes(termoLower) ||
    usuario.username.toLowerCase().includes(termoLower)
  );
};

function App() {
  const url = "https://jsonplaceholder.typicode.com";
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [modalAberta, setModalAberta] = useState(false);
  const [modalTipo, setModalTipo] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const usuariosFiltrados = usuarios.filter(filtrarUsuariosPorTermo(busca));

  async function buscaUsuario(id) {
    try {
      setMensagemErro("");
      setMensagemSucesso("");
      const response = await axios.get(`${url}/users/${id}`);
      const data = response.data;
      setUsuarioSelecionado(data);
      setModalTipo("detalhes");
      setModalAberta(true);
    } catch (error) {
      console.log("Erro ao buscar usuário:", error);
      setMensagemErro(`Não foi possível buscar o usuário. ${error.message}`);
      setModalTipo("erro");
      setModalAberta(true);
      setErro(`Não foi possível buscar o usuário. ${error.message}`);
    }
  }

  async function buscaUsuarios() {
    try {
      setCarregando(true);
      setErro(null);
      const response = await axios.get(`${url}/users`);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setErro(`Não foi possível buscar os usuários. ${error.message}`);
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  }

  function limparDetalhesUsuario() {
    setUsuarioSelecionado(null);
    setModalAberta(false);
    setModalTipo(null);
  }

  async function cadastrarUsuario(novoUsuario) {
    try {
      setMensagemErro("");
      setMensagemSucesso("");
      const response = await axios.post(`${url}/users`, novoUsuario);
      const data = response.data;
      setMensagemSucesso(`Usuário ${data.name} cadastrado com sucesso!`);
      setModalTipo("sucesso");
      setModalAberta(true);
      setErro("");
      setUsuarios((usuariosAtuais) => [data, ...usuariosAtuais]);
    } catch (error) {
      console.log("Erro ao cadastrar usuário:", error);
      setMensagemErro(`Não foi possível cadastrar o usuário. ${error.message}`);
      setModalTipo("erro");
      setModalAberta(true);
      setErro(`Não foi possível cadastrar o usuário. ${error.message}`);
    }
  }



  useEffect(() => {
    buscaUsuarios();
  }, []);

  return (
    <div className="app-shell">
      <div className="app-container">
        <HeaderComponent />

        <main className="content">
          <div className="search-box">
            <span className="search-icon">🔎</span>
            <input
              type="text"
              className="search-input"
              placeholder="Filtrar usuários..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <UserForm onCadastrar={cadastrarUsuario} />

          <div className="summary">
            <p>Lista atualizada</p>
            <span className="results-chip">{usuariosFiltrados.length} resultados</span>
          </div>

          {erro && <div className="error-message">{erro}</div>}

          {carregando ? (
            <Loading />
          ) : (
            <UserListComponent usuarios={usuariosFiltrados} onSelecionarUsuario={buscaUsuario} />
          )}
        </main>
      </div>

      <Modal
        isOpen={modalAberta}
        onClose={() => {
          setModalAberta(false);
          setModalTipo(null);
          setMensagemSucesso("");
          setMensagemErro("");
        }}
        title={
          modalTipo === "detalhes"
            ? "Detalhes do usuário"
            : modalTipo === "erro"
              ? "Erro"
              : "Sucesso"
        }
      >
        {modalTipo === "detalhes" ? (
          <UserDetailsComponents
            usuario={usuarioSelecionado}
            onFecharDetalhes={limparDetalhesUsuario}
          />
        ) : modalTipo === "erro" ? (
          <ErrorMessage message={mensagemErro} />
        ) : (
          <SuccessMessage message={mensagemSucesso} />
        )}
      </Modal>
    </div>
  );
}

export default App;