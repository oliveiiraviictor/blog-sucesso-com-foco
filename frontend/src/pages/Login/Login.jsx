import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Chama o serviço que você configurou para bater na API e salvar o token
      await authService.login(email, senha);
      // Redireciona o usuário para a página inicial
      navigate('/dashboard');
    } catch (err) {
      // Captura a mensagem de erro do backend ou exibe uma mensagem genérica
      setError(err.response?.data?.error || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="login-container container">
        <div className="login-card">
          <div className="login-header">
            <h2>Bem-vindo de volta</h2>
            <p>Acesse seu painel e continue sua jornada.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Digite seu e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input 
                type="password" 
                id="senha" 
                placeholder="Digite sua senha" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn-action" disabled={loading}>
              {loading ? 'Autenticando...' : 'Entrar na plataforma'}
            </button>
          </form>

          <div className="login-footer">
            <p>Ainda não tem uma conta? <a href="/register">Inscreva-se gratuitamente</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}