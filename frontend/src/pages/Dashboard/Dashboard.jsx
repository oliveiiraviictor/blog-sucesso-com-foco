import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import articleService from '../../services/articleService';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    conteudo: '',
    imagemCapa: '',
    categoriaId: '1',
    tempoDeLeitura: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Vai buscar o utilizador que está logado para usar como autorId
      const userStorage = JSON.parse(localStorage.getItem('user'));
      
      // Se não houver utilizador (em testes), usamos o ID 1 como segurança
      const autorId = userStorage && userStorage.id ? userStorage.id : 1; 

      // 2. Chama o serviço passando os dados exatamente na ordem que definiu
      await articleService.create(
        formData.titulo,
        formData.conteudo,
        formData.imagemCapa,
        autorId,
        parseInt(formData.categoriaId) // Garante que o ID da categoria vai como número
      );
      
      setSuccess(true);
      
      // 3. Limpa o formulário
      setFormData({
        titulo: '',
        descricao: '',
        conteudo: '',
        imagemCapa: '',
        categoriaId: '1',
        tempoDeLeitura: ''
      });
      
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao publicar o artigo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="dashboard-container container">
        <div className="dashboard-header">
          <h2>Painel Administrativo</h2>
          <p>Escreva e publique novos artigos no Sucesso com Foco.</p>
        </div>

        <div className="dashboard-card">
          <form onSubmit={handleSubmit} className="dashboard-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Artigo publicado com sucesso!</div>}

            <div className="form-row">
              <div className="form-group flex-2">
                <label htmlFor="titulo">Título do Artigo</label>
                <input 
                  type="text" 
                  id="titulo" 
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ex: O Guia Definitivo da Técnica Deep Work"
                  required 
                />
              </div>
              
              <div className="form-group flex-1">
                <label htmlFor="tempoDeLeitura">Tempo de Leitura (min)</label>
                <input 
                  type="number" 
                  id="tempoDeLeitura" 
                  name="tempoDeLeitura"
                  value={formData.tempoDeLeitura}
                  onChange={handleChange}
                  placeholder="Ex: 5"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição Breve (Subtítulo)</label>
              <textarea 
                id="descricao" 
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Um resumo cativante que aparecerá no card da página inicial..."
                rows="2"
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="imagemCapa">URL da Imagem de Capa</label>
              <input 
                type="url" 
                id="imagemCapa" 
                name="imagemCapa"
                value={formData.imagemCapa}
                onChange={handleChange}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoriaId">Categoria</label>
              <select 
                id="categoriaId" 
                name="categoriaId" 
                value={formData.categoriaId} 
                onChange={handleChange}
              >
                {/* Aqui futuramente podemos puxar dinamicamente do banco */}
                <option value="1">Produtividade</option>
                <option value="2">Carreira</option>
                <option value="3">Mentalidade</option>
                <option value="4">Negócios</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="conteudo">Conteúdo Completo</label>
              <textarea 
                id="conteudo" 
                name="conteudo"
                value={formData.conteudo}
                onChange={handleChange}
                placeholder="Escreva o conteúdo completo do seu artigo aqui..."
                rows="15"
                required 
              />
            </div>

            <div className="dashboard-actions">
              <button type="submit" className="btn-action" disabled={loading}>
                {loading ? 'Publicando...' : 'Publicar Artigo'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}