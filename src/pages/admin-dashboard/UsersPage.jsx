import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../services/userService'; // We'll use the existing service
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// A reusable card component for displaying a single user
const UserCard = ({ user, onEdit, onDelete }) => {
    const getRoleTagColor = (role) => {
        switch (role) {
            case 'Admin': return 'bg-error-100 text-error-800';
            case 'Teacher': return 'bg-success-100 text-success-800';
            case 'Parent': return 'bg-warning-100 text-warning-800';
            default: return 'bg-primary-100 text-primary-800';
        }
    };

    return (
        <div className="bg-surface rounded-lg p-5 shadow-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary-200">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-text-primary truncate">{user.username || 'N/A'}</p>
                    <p className="text-sm text-text-secondary truncate">{user.email || 'No email'}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getRoleTagColor(user.role)}`}>
                    {user.role}
                </span>
            </div>
            <div className="flex justify-end items-center border-t border-border pt-3 mt-4">
                <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => onEdit(user)} iconName="Edit" />
                    <Button size="sm" variant="ghost" onClick={() => onDelete(user.id)} iconName="Trash" className="text-error" />
                </div>
            </div>
        </div>
    );
};

// Main page component
const UsersPage = ({ onLogout, notifications, setNotifications }) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const controller = new AbortController();
        const loadUsers = async () => {
            setIsLoading(true);
            const data = await getAllUsers(controller.signal);

            const currentAdminUsername = localStorage.getItem('username');
            const otherUsers = data.filter(user => user.username !== currentAdminUsername);

            setUsers(otherUsers);
            setFilteredUsers(otherUsers);
            setIsLoading(false);
        };
        loadUsers();
        return () => controller.abort();
    }, []);

    // Effect to handle filtering and searching
    useEffect(() => {
        let result = users;

        if (activeFilter !== 'All') {
            result = result.filter(user => user.role === activeFilter);
        }

        if (searchTerm) {
            // ** THE FIX **
            // Added optional chaining (?.) and nullish coalescing (?? '')
            // to prevent crashes if username or email is undefined.
            result = result.filter(user =>
                (user.username?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
                (user.email?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
            );
        }

        setFilteredUsers(result);
    }, [searchTerm, activeFilter, users]);

    const roleFilters = ['All', 'Admin', 'Teacher', 'Parent', 'Student'];

    return (
        <div className="min-h-screen bg-background">
            <Header onLogout={onLogout} notifications={notifications} setNotifications={setNotifications} />
            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                        <h1 className="text-3xl font-bold text-text-primary">User Management</h1>
                        <div className="flex items-center gap-4">
                            <div className="relative w-full md:w-64">
                                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-input border-border rounded-md pl-10 pr-4 py-2 text-text-primary focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <Button variant="primary" iconName="UserPlus">Add User</Button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="mb-6">
                        <div className="border-b border-border">
                            <nav className="-mb-px flex space-x-6 overflow-x-auto">
                                {roleFilters.map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                                            ${activeFilter === filter
                                                ? 'border-primary text-primary'
                                                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                                            }`}
                                    >
                                        {filter}s
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Users Grid */}
                    {isLoading ? (
                        <p className="text-center text-text-secondary">Loading users...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <UserCard 
                                        key={user.id} 
                                        user={user} 
                                        onEdit={() => console.log('Edit user:', user.id)}
                                        onDelete={() => console.log('Delete user:', user.id)}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-16 bg-surface rounded-lg border border-border">
                                    <Icon name="SearchX" size={48} className="mx-auto text-text-secondary mb-4" />
                                    <h3 className="text-xl font-semibold text-text-primary">No Users Found</h3>
                                    <p className="text-text-secondary mt-1">Try adjusting your search or filter criteria.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default UsersPage;
