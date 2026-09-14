export default function NewsletterCard() {
    const handleSubscribe = (e) => {
        e.preventDefault();
    };

    return (
        <div className="newsletter-card">
            <h3>Receba nossas dicas exclusivas!</h3>
            <p>Faça parte da nossa comunidade e tire da sua cabeça que tudo que você ver nas redes sociais é verdade. Vem e se transforme gradualmente!</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input type="email" placeholder="Digite seu melhor e-mail" />
                <button type="submit">Quero me inscrever!</button>
            </form>
        </div>
    );
}