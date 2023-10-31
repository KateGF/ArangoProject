import { Link } from 'react-router-dom';

const MainMenu = () => {
    return (
        <nav className="bg-black p-4">
            <ul className="flex space-x-4">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li><Link to="/menu" className="text-white">Menu</Link></li>
                <li><Link to="/adminCuenta" className="text-white">Admin Cuenta</Link></li>
            </ul>
        </nav>
    );
}

export default MainMenu;
