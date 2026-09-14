export default function AuthorCard({
    nome,
    profissao,
    descricao,
    foto
}) {
    return (
        <div className="author-card">
            <img src={foto} alt={nome} />
            <h3>{nome}</h3>
            <p className="author-profession">{profissao}</p>
            <p>{descricao}</p>
            <button className="follow-button">Ver Perfil completo</button>
        </div>
    );
}