import AuthorCard from './AuthorCard';
import NewsletterCard from './NewsLetterCard';
import RelatedPosts from './RelatedPosts';
import AdSpace from './AdSpace';

export default function SideBar({ author, posts }) {
    return (
        <aside className="sidebar">
            <AuthorCard
                nome={author.nome}
                profissao={author.profissao}
                descricao={author.descricao}
                foto={author.foto}
            />
            <NewsletterCard />
            <AdSpace />
            <RelatedPosts posts={posts} />            
        </aside>
    )
}