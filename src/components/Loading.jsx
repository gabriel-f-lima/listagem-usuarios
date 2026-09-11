function Loading() {
  return (
    <div className="loading-wrap" aria-live="polite" aria-busy="true">
      <div className="spinner" />
      <p>Carregando usuários...</p>
    </div>
  );
}

export default Loading;
