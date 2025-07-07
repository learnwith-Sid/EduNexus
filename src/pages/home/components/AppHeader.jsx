import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // Import HashLink
import { Logo } from './Icons';

const AppHeader = ({ navItems = [] }) => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login');
    };
    
    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
            <nav className="w-full flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
                <Link to="/" className="text-white font-bold text-2xl cursor-pointer">
                    <Logo />
                </Link>
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        // Use HashLink for smooth scrolling
                        <HashLink 
                            key={item.name} 
                            to={item.path} 
                            smooth 
                            className="text-gray-200 hover:text-white transition-colors duration-300 text-sm font-medium"
                        >
                            {item.name}
                        </HashLink>
                    ))}
                </div>
                <button onClick={handleGetStartedClick} className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500">
                    Get Started
                </button>
            </nav>
        </header>
    );
};

export default AppHeader;
