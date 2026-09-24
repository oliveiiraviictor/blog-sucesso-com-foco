import './Footer.css';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Lado Esquerdo: Logo, Descrição e Copyright empilhados */}
        <div className="footer-info">
          <p className="footer-description">
            O <b>Sucesso com Foco</b> é o seu portal definitivo para desenvolvimento pessoal, produtividade e alta performance. Publicamos artigos, estratégias práticas e guias detalhados para ajudar você a alcançar seus objetivos, cultivar disciplina e construir uma jornada de sucesso com propósito e clareza.
          </p>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Sucesso com Foco. Todos os direitos reservados.</p>
          </div>
        </div>

        {/* Lado Direito: Links em cima e Redes Sociais embaixo */}
        <div className="footer-right">
          <FooterLinks />
          <FooterSocial />
        </div>
        
      </div>
    </footer>
  );
}