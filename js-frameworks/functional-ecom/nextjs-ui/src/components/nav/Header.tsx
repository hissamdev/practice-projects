export default function Header() {
    return (
        <header>
            <div className="max-w-7xl mx-auto py-6 flex justify-between items-center">
                <div>Icon</div>
                <nav>
                    <ul className="flex items-center gap-4">
                        <li>Products</li>
                        <li>Portfolio</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
