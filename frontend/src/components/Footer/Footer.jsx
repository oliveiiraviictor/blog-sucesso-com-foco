import Logo from "../Header/Logo";
import FooterLinks from "./FooterLinks";
import FooterSocialLinks from "./FooterSocial";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-info">
                    <Logo />
                    <p>O <b>Sucesso com Foco</b> é o seu portal definitivo para desenvolvimento pessoal, produtividade e alta performance. Publicamos artigos, estratégias práticas e guias detalhados para ajudar você a alcançar seus objetivos, cultivar disciplina e construir uma jornada de sucesso com propósito e clareza.</p>
                </div>
                <FooterLinks />
                <FooterSocialLinks />
            </div>
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} Sucesso com Foco. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}