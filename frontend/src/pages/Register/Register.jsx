import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import './Register.css';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [codigoConvite, setCodigoConvite] = useState(''); 
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Validação de frontend antes de chamar a API
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    setLoading(true);

    try {
      await authService.register(nome, email, senha, codigoConvite); 
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="register-container container">
        <div className="register-card">
          <div className="register-header">
            <h2>Crie sua conta</h2>
            <p>Junte-se à nossa comunidade de alta performance.</p>
          </div>

          <form onSubmit={handleRegister} className="register-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input 
                type="text" 
                id="nome" 
                placeholder="Digite seu nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Digite seu melhor e-mail" 
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
                placeholder="Crie uma senha forte" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirme sua Senha</label>
              <input 
                type="password" 
                id="confirmarSenha" 
                placeholder="Digite a senha novamente" 
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="codigoConvite">Código de Convite</label>
              <input 
                  type="text" // Pode ser 'text' se preferir que fique visível
                  id="codigoConvite" 
                  value={codigoConvite}
                  onChange={(e) => setCodigoConvite(e.target.value)}
                  placeholder="Insira o código secreto"
                  required 
              />
            </div>

            <button type="submit" className="btn-action" disabled={loading}>
              {loading ? 'Criando conta...' : 'Registrar'}
            </button>
          </form>

          <div className="register-footer">
            <p>Já tem uma conta? <a href="/login">Faça login aqui</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}