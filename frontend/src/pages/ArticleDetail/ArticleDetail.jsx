import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { SideBar } from '../../components/SideBar';
import articleService from '../../services/articleService';
import fotoPerfil from '../../assets/perfil/img-perfil.jpeg';
import { FiShare2, FiBookmark, FiCheckCircle } from 'react-icons/fi';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        const data = await articleService.getById(id);
        setArticle(data);

        // Busca artigos para a sidebar
        const allArticles = await articleService.getAll();
        const filtered = allArticles
          .filter(item => item.id !== parseInt(id))
          .slice(0, 3);
        setRecentPosts(filtered);
      } catch (err) {
        setError(err.message || 'Erro ao carregar o artigo');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <p className="container mt-xl">Carregando artigo...</p>;
  if (error || !article) return <p className="container mt-xl">Artigo não encontrado.</p>;

  return (
    <>
      <Header />
      
      <main className="article-page-container container">
        <article className="article-main">
          
          
          <nav className="breadcrumbs">
            <Link to="/">Home</Link> &gt; 
            <span className="crumb-category">{article.categoria?.nome}</span> &gt; 
            <span className="crumb-current">{article.titulo}</span>
          </nav>

          
          <header className="article-header">
            <span className="article-category-badge">{article.categoria?.nome}</span>
            <h1 className="article-title">{article.titulo}</h1>
            
            <div className="article-author-meta">
              <div className="author-info-group">
                <img 
                  src={fotoPerfil} 
                  alt={article.autor?.nome} 
                  className="author-avatar" 
                />
                <div>
                  <span className="author-name">{article.autor?.nome}</span>
                  <span className="author-role">Autor(a)</span>
                </div>
              </div>

              <div className="meta-info-group">
                <span>🗓️ {new Date(article.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                
                <span>⏱️ {article.tempoDeLeitura || 5} min de leitura</span>
              </div>
            </div>
          </header>

          
          {article.imagemCapa && (
            <div className="article-featured-image">
              <img src={article.imagemCapa} alt={article.titulo} />
            </div>
          )}

          
          <div className="article-body" style={{ whiteSpace: 'pre-wrap' }}>
            {article.conteudo}
          </div>

          <footer className="article-detail-footer">
            <div className="article-tags">
              <span className="tags-label">Categoria:</span>
              <span className="tag-link">#{article.categoria?.nome}</span>
            </div>

            <div className="article-actions">
              <button className="btn-icon" title="Compartilhar">
                <FiShare2 />
              </button>
              <button className="btn-icon" title="Salvar para ler depois">
                <FiBookmark />
              </button>
            </div>
          </footer>
        </article>

        <SideBar 
          author={{
            nome: article.autor?.nome,
            profissao: "Desenvolvedor / Criador de Conteúdo",
            descricao: "Compartilhando conhecimento sobre desenvolvimento e produtividade.",
            foto: fotoPerfil
          }}
          posts={recentPosts.map(p => ({
            id: p.id,
            title: p.titulo,
            description: p.descricao,
            category: p.categoria?.nome,
            readTime: p.tempoDeLeitura || 5
          }))}
        />
      </main>

      <Footer />
    </>
  );
}