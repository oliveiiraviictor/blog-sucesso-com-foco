import logoImg from '../../assets/logo_sucesso_com_foco.png';

export default function Logo() {
    return (
        <div className="logo">
            <a href="/">
                <img src={logoImg} alt="Logo Sucesso Com Foco" /> 
                Sucesso Com Foco
            </a>
        </div>
    );
}