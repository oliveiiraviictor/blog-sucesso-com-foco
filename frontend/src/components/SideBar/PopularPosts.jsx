import RelatedPost from './RelatedPost';

export default function PopularPosts({ posts }) {
  return (
    <div className="popular-posts mt-xl">
      <h3 className="headline-md mb-md">Mais Vistos</h3>
      <div className="popular-posts-list">
        {posts.map((post) => (
          <RelatedPost
            key={post.id}
            id={post.id}
            title={post.titulo}
            description={post.descricao}
            category={post.categoria}
            readTime={post.readTime}
          />
        ))}
      </div>
    </div>
  );
}