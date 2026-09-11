function NovoUsuarioComponent({ usuario }) {
  return (
    <div className="success-card">
      <h2>Novo Usuário cadastrado</h2>
      <p>
        <strong>Nome: </strong>
        {usuario.name}
      </p>
      <p>
        <strong>Usuário: </strong>
        {usuario.username}
      </p>
      <p>
        <strong>Email: </strong>
        {usuario.email}
      </p>
    </div>
  );
}

export default NovoUsuarioComponent;