function UserDetailsComponents({ usuario, onFecharDetalhes }) {
  return (
    <section className="details-card">
      <h2>Detalhes do Usuário</h2>
      <button className="close-button" onClick={onFecharDetalhes}>
        Fechar Detalhes
      </button>

      <p>
        <strong>Nome: </strong>
        {usuario.name}
      </p>

      <p>
        <strong>Email: </strong>
        {usuario.email}
      </p>

      <p>
        <strong>Cidade: </strong>
        {usuario.address?.city || "Não informado"}
      </p>

      <p>
        <strong>Telefone: </strong>
        {usuario.phone}
      </p>

      <p>
        <strong>Website: </strong>
        {usuario.website}
      </p>
    </section>
  );
}

export default UserDetailsComponents;