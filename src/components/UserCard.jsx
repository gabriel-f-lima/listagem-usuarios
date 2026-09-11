function UserCard({ usuario, onSelecionarUsuario }) {
  return (
    <article className="user-card">
      <div className="avatar" aria-label={`Avatar de ${usuario.name}`}>
        {usuario.name.charAt(0).toUpperCase()}
      </div>

      <div className="user-info">
        <h3>{usuario.name}</h3>
        <p className="user-username">@{usuario.username}</p>
        <a href={`mailto:${usuario.email}`} className="user-email">
          {usuario.email}
        </a>
        <button 
        onClick={() => 
        onSelecionarUsuario(usuario.id)}>
          Ver Detalhes</button>
        <p className="user-phone">{usuario.phone}</p>
        <a href={`https://${usuario.website}`} target="_blank" rel="noreferrer" className="user-website">
          {usuario.website}
        </a>
      </div>
    </article>
  );
}

export default UserCard;
