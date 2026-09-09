import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <Logo />
                <Navigation />
                <SearchBar />
                <button className="btn-subscribe">Subscribe</button>
            </div>
        </header>
    );
}