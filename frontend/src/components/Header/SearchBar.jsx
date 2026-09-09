export default function SearchBar() {
    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Buscar..." />
            <button type="submit">🔍</button>
        </form>
    );
}