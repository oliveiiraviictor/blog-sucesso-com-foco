export default function Hero() {
    const handleSearch = (e) => {
        e.preventDefault();

    };

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Bem vindo - Eleve sua Produtividade e Eficiência</h1>
                <p>Estratégias práticas de carreira, produtividade e foco para profissionais ambiciosos que buscam o próximo nível de sucesso.</p>
                <form className="hero-search" onSubmit={handleSearch}>
                    <input type="text" placeholder="O que você quer elevar?" />
                    <button type="submit">🔍</button>
                </form>
            </div>
        </section>
    )
}