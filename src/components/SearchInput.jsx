function SearchInput({ searchTerm, onSearchChange }) {
    return (
        <input
            className="input"
            type="text"
            placeholder="Digite um termo para buscar usuários"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    );
}

export default SearchInput;