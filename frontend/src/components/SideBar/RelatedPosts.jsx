import RelatedPost from "./RelatedPost";

export default function RelatedPosts({ posts }) {
    return (
        <div className="related-posts">
            <h3>Post Relacionados</h3>
            {posts.map((post) => (
                <RelatedPost
                    key={post.id}
                    id={post.id}
                    title={post.titulo}
                    description={post.descricao}
                    category={post.categoria}
                    readTime={post.tempoDeLeitura}
                />
            ))}

        </div>
    )
}