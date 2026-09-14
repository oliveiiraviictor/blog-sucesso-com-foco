import { truncateText } from "../../utils/textUtils";

export default function RelatedPost({ 
    id,
    title, 
    description,
    category,
    readTime
}) {
    return (
            <div className="related-post-item">
                <span className="category">{category}</span>
                <h4>{title}</h4>
                <a href={`/article/${id}`}>{truncateText(description)}</a>
                <span className="read-time">{readTime} min leitura</span>
            </div>
    )
}