import RelatedPost from "./RelatedPost";

export default function RelatedPosts({ title, posts }) {

    if (!posts || posts.length === 0) return null;

    return (
        <div className="related-posts">
            <h3>{title || "Posts Relacionados" }</h3>
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