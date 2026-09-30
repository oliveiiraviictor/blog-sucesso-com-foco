import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ArticleCard } from "../components/ArticleCard";
import { SideBar } from "../components/SideBar";
import { Footer } from "../components/Footer";

import fotoPerfil from "../assets/perfil/img-perfil.jpeg"

import articleService from "../services/articleService";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await articleService.getAll();
                setArticles(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <p>Carregando artigos...</p>;
    if (error) return <p>Erro ao carregar artigos: {error}</p>;

    const popularArticles = [...articles].sort((a, b) => b.visualizacoes - a.visualizacoes).slice(0, 3);
    const recentArticles = [...articles].reverse().slice(0, 5);

    return (
        <>
            <Header />
            <Hero />
            <main className="home-content container">
                <section className="articles-section">
                    <h2>Artigos Recentes</h2>
                    {/* Trocamos grid para list para o layout horizontal */}
                    <div className="articles-list"> 
                    {recentArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            id={article.id}
                            titulo={article.titulo}
                            descricao={article.descricao}
                            imagemCapa={article.imagemCapa}
                            categoria={article.categoria.nome}
                            autor={article.autor.nome}
                            data={new Date(article.createdAt).toLocaleDateString('pt-BR')}
                            tempoDeLeitura={article.tempoDeLeitura}
                        />
                    ))}
                    </div>
                </section>

                <SideBar 
                    author={{
                        nome: "Victor Oliveira",
                        profissao: "Desenvolvedor Junior",
                        descricao: "Realizando o desenvolvimento web para praticar e se torna um desenvolvedor melhor",
                        foto: fotoPerfil
                    }}
                    posts={popularArticles.map(post => ({
                        id: post.id,
                        title: post.titulo,
                        description: post.descricao,
                        category: post.categoria.nome,
                        readTime: post.tempoDeLeitura || 5
                    }))}
                />
            </main>
            <Footer />
        </>
    )
}