import AuthorCard from './AuthorCard';
import RelatedPosts from './RelatedPosts';
import AdSpace from './AdSpace';

import './SideBar.css';

export default function SideBar({ author, posts }) {
    return (
        <aside className="sidebar">
            <AuthorCard
                nome={author.nome}
                profissao={author.profissao}
                descricao={author.descricao}
                foto={author.foto}
            />
            <AdSpace />
            <RelatedPosts title="Artigos Recentes" posts={posts} />            
        </aside>
    )
}