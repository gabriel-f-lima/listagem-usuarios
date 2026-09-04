function UserList({ usuarios }) {
    if (usuarios.length === 0) {
        return <p>Nenhum usuário encontrado.</p>;
    }

    return (
        <ul className="ul">
            {usuarios.map((usuario) => (
                <li key={usuario.id} className="li">
                    <hr />
                    <strong>{usuario.name}</strong>
                    <p>Username: {usuario.username}</p>
                    <p>Email: {usuario.email}</p>
                </li>
            ))}
        </ul>
    );
}

export default UserList;