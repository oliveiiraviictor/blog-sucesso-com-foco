import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  // Função simples para verificar se o menu está ativo
  const isActive = (path) => location.pathname.includes(path) ? 'active' : '';

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">🎯</div>
        <div className="logo-text">
          <strong>SUCESSO COM FOCO</strong>
          <span>ADMIN PORTAL</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-label">NAVEGAÇÃO</span>
        
        <Link to="/visao-geral" className={`nav-item ${isActive('/visao-geral')}`}>
          <span className="nav-icon">📊</span> Visão Geral
        </Link>
        
        <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
          <span className="nav-icon">📝</span> Artigos
        </Link>
        
        <Link to="/categorias" className={`nav-item ${isActive('/categorias')}`}>
          <span className="nav-icon">📁</span> Categorias
        </Link>
        
        <Link to="/newsletter" className={`nav-item ${isActive('/newsletter')}`}>
          <span className="nav-icon">✉️</span> Newsletter & Leads
        </Link>
        
        <Link to="/relatorios" className={`nav-item ${isActive('/relatorios')}`}>
          <span className="nav-icon">📈</span> Relatórios Analíticos
        </Link>
        
        <Link to="/configuracoes" className={`nav-item ${isActive('/configuracoes')}`}>
          <span className="nav-icon">⚙️</span> Configurações
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="system-status">
          <span className="status-dot"></span> Status do Sistema
        </div>
        <span className="status-desc">Sistemas 100% operacionais</span>
      </div>
    </aside>
  );
}