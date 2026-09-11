import UserCard from "./UserCard";

function UserListComponent({ usuarios, onSelecionarUsuario }) {
  return (
    <section className="user-list-section">
      <p className="results-count">Usuários encontrados: {usuarios.length}</p>

      {usuarios.length > 0 ? (
        <div className="user-list">
          {usuarios.map((usuario) => (
            <UserCard key={usuario.id} usuario={usuario} onSelecionarUsuario={onSelecionarUsuario} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>Nenhum usuário encontrado.</p>
        </div>
      )}
    </section>
  );
}

export default UserListComponent;
