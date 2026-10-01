import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import articleService from '../../services/articleService';
import './ArticlesManagement.css'; // Vamos criar este ficheiro a seguir
import Sidebar from '../../components/SideBarAdmin/SideBar';

export default function ArticlesManagement() {
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Busca os artigos da base de dados ao carregar a página
  useEffect(() => {
    const fetchArtigos = async () => {
      try {
        // Assume-se que tem um método getAll no seu articleService
        const data = await articleService.getAll(); 
        setArtigos(data);
      } catch (error) {
        console.error("Erro ao carregar artigos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtigos();
  }, []);

  // --- LÓGICA PARA O DELETE ---
  const handleDelete = async (id) => {
    // Alerta de confirmação nativo do navegador
    if (window.confirm("Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.")) {
      try {
        // Remove no backend (precisaremos criar esse método no serviço)
        await articleService.delete(id);
        
        // Atualiza a tela imediatamente removendo o artigo da lista, sem precisar recarregar a página
        setArtigos(artigos.filter(artigo => artigo.id !== id));
        
      } catch (error) {
        console.error("Erro ao excluir artigo:", error);
        alert("Erro ao excluir o artigo. Verifique o console.");
      }
    }
  };
  // -------------------------

  // --- LÓGICA DOS KPIs ---
  const totalArtigos = artigos.length;
  
  // Conta quantos artigos têm o status "publicado"
  const artigosPublicados = artigos.filter(artigo => artigo.status === 'publicado').length;
  
  // Soma todas as visualizações usando o reduce
  const totalVisualizacoes = artigos.reduce((soma, artigo) => soma + (artigo.visualizacoes || 0), 0);
  
  // Estimativa de visitantes únicos (geralmente cerca de 60% das visualizações totais)
  const visitantesEstimados = Math.round(totalVisualizacoes * 0.6);
  
  // Calcula a média do tempo de leitura
  const tempoMedio = totalArtigos > 0 
    ? Math.round(artigos.reduce((soma, artigo) => soma + (artigo.tempoDeLeitura || 0), 0) / totalArtigos)
    : 0;

  return (
    <div className="admin-container">
      
      <Sidebar />
      
      <div className="admin-main">
        {/* Aqui entraria a <TopBar /> */}

        <div className="content-header">
          <div>
            <h4 className="section-subtitle">• CONTEÚDO E DESEMPENHO EDITORIAL</h4>
            <h1 className="section-title">Gestão e Desempenho de Artigos</h1>
            <p className="section-desc">Monitore o tráfego em tempo real, gerencie publicações e edite ou exclua conteúdos existentes.</p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">⬇ Exportar Relatório (CSV)</button>
            <button className="btn-primary" onClick={() => navigate('/dashboard')}>
              + Novo Artigo
            </button>
          </div>
        </div>

        {/* Cartões de Métricas (KPIs) */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-title">Total de Artigos <span className="icon-doc">📄</span></div>
            <div className="kpi-value">{totalArtigos} <span>artigos</span></div>
            <div className="kpi-trend positive">{artigosPublicados} publicados | {totalArtigos - artigosPublicados} rascunhos</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-title">Visitantes (Estimativa) <span className="icon-users">👥</span></div>
            <div className="kpi-value">{visitantesEstimados} <span>leitores</span></div>
            <div className="kpi-trend positive">Baseado no tráfego total</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-title">Total de Visualizações <span className="icon-eye">👁️</span></div>
            <div className="kpi-value">{totalVisualizacoes} <span>views</span></div>
            <div className="kpi-trend neutral">Soma global do blog</div>
          </div>
          
          <div className="kpi-card">
            <div className="kpi-title">Tempo Médio Leitura <span className="icon-clock">⏱️</span></div>
            <div className="kpi-value">{tempoMedio}m <span>/ artigo</span></div>
            <div className="kpi-trend warning">Média da plataforma</div>
          </div>
        </div>

        {/* Tabela de Artigos */}
        <div className="table-container">
          <div className="table-filters">
            <div className="tabs">
              <button className="tab active">Todos ({artigos.length})</button>
              <button className="tab">Publicados</button>
              <button className="tab">Rascunhos</button>
            </div>
            <div className="filter-inputs">
              <input type="text" placeholder="🔍 Buscar por título, tag..." />
              <select><option>Todas as Categorias</option></select>
            </div>
          </div>

          <table className="articles-table">
            <thead>
              <tr>
                <th>ARTIGO</th>
                <th>AUTOR</th>
                <th>STATUS</th>
                <th>VISITANTES & DESEMPENHO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center">A carregar dados...</td></tr>
              ) : (
                artigos.map(artigo => (
                  <tr key={artigo.id}>
                    <td className="article-info">
                      {artigo.imagemCapa && <img src={artigo.imagemCapa} alt="Capa" className="thumb" />}
                      <div>
                        <span className="category-badge">{artigo.categoria?.nome || 'Sem Categoria'}</span>
                        <h3 className="article-title">{artigo.titulo}</h3>
                      </div>
                    </td>
                    <td className="author-info">
                      <div className="author-avatar">{artigo.autor?.nome?.charAt(0) || 'U'}</div>
                      <div>
                        <p className="author-name">{artigo.autor?.nome || 'Utilizador'}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${artigo.status === 'rascunho' ? 'draft' : 'published'}`}>
                        {artigo.status === 'rascunho' ? 'Rascunho' : 'Publicado'}
                      </span>
                    </td>
                    <td className="performance-info">
                      <strong>{artigo.visualizacoes}</strong> leitores
                    </td>
                    <td className="table-actions">
                      <button 
                        className="btn-icon edit" 
                        title="Editar Artigo"
                        onClick={() => navigate(`/dashboard/editar/${artigo.id}`)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon delete" 
                        title="Excluir Artigo"
                        onClick={() => handleDelete(artigo.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}