import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService'; // Import the new login service
import ThreeJSBackground from './components/ThreeJSBackground'; // Assuming path
import { UserIcon, LockIcon, SchoolIcon } from './components/Icons'; // Assuming path

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const credentials = {
            username: e.target.usernameOrEmail.value,
            email: e.target.usernameOrEmail.value,
            password: e.target.password.value,
            schoolCode: e.target.schoolCode.value,
        };

        try {
            // Use the new login service
            const data = await login(credentials);

            // Store user data in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.roles[0]);
            localStorage.setItem("schoolCode", data.schoolCode);
            
            // Update global app state
            onLogin(); 

            // Navigate to the dashboard
            navigate('/admin-dashboard');

        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 404)) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('An error occurred. Please check the console and ensure the backend is running.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <ThreeJSBackground />
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">School Portal</h1>
                    <p className="text-gray-300 mt-2">Welcome back! Please sign in.</p>
                </div>
                <form onSubmit={handleFormSubmit}>
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm rounded-lg p-3 mb-4 text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-200 mb-2">Username or Email</label>
                            <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="h-5 w-5 text-gray-400" /></span><input type="text" id="usernameOrEmail" name="usernameOrEmail" required className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="your_username or you@example.com" /></div>
                        </div>
                        <div>
                            <label htmlFor="schoolCode" className="block text-sm font-medium text-gray-200 mb-2">School ID</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <SchoolIcon className="h-5 w-5 text-gray-400" />
                                </span>
                                <input type="text" id="schoolCode" name="schoolCode" required defaultValue="SPH001" className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="e.g. SPH001" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">Password</label>
                            <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon className="h-5 w-5 text-gray-400" /></span><input type="password" id="password" name="password" required className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" placeholder="••••••••" /></div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <Link to="/" className="text-sm text-blue-300 hover:text-blue-200 hover:underline transition-colors">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
