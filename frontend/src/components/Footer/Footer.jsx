import './Footer.css';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <div className="site-name">Sucesso Com Foco</div>
          <p>Potencializando carreiras através da produtividade e foco.</p>
        </div>

        <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Sucesso Com Foco. All rights reserved.</p>
        </div>

        <div className="footer-right">
          <FooterLinks />
          <FooterSocial />
        </div>

      </div>
    </footer>
  );
}