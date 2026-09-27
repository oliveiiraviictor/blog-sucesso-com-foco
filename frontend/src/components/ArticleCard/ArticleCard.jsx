import { Link } from 'react-router-dom';
import './ArticleCard.css';

export default function ArticleCard({
    id,
    titulo,
    descricao,
    imagemCapa,
    categoria,
    autor,
    data,
    tempoDeLeitura
}){
    return (
        <article className="article-card">
            <Link to={`/article/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={imagemCapa} alt={titulo} />
            <div className="article-content">
                <h2>{titulo}</h2>
                <p>{descricao}</p>
                <div className="article-meta">
                    <span>{categoria}</span>
                    <span>{autor}</span>
                    <span>{data}</span>
                    <span>{tempoDeLeitura} min de leitura</span>
                </div>
            </div>
            </Link>
        </article>   
    );
}