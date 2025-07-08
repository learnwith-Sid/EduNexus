import React, { useState, useEffect } from 'react';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../services/announcementService';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { formatDistanceToNow } from 'date-fns';

// Skeleton component for a single announcement card
const AnnouncementSkeleton = () => (
    <div className="bg-surface rounded-lg p-5 shadow-card border border-border animate-pulse">
        <div className="h-5 bg-secondary-100 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-secondary-100 rounded w-full mb-1"></div>
        <div className="h-3 bg-secondary-100 rounded w-5/6 mb-4"></div>
        <div className="flex justify-between items-center">
            <div className="h-4 bg-secondary-100 rounded w-1/4"></div>
            <div className="flex space-x-2">
                <div className="h-8 w-16 bg-secondary-100 rounded-md"></div>
                <div className="h-8 w-16 bg-secondary-100 rounded-md"></div>
            </div>
        </div>
    </div>
);

// Card component for a single announcement
const AnnouncementCard = ({ announcement, onEdit, onDelete }) => {
    const getAudienceTagColor = (audience) => {
        switch (audience) {
            case 'Teacher': return 'bg-success-100 text-success-800';
            case 'Parent': return 'bg-warning-100 text-warning-800';
            case 'Student': return 'bg-error-100 text-error-800';
            default: return 'bg-primary-100 text-primary-800';
        }
    };

    return (
        <div className="bg-surface rounded-lg p-5 shadow-card border border-border transition-all duration-300 hover:shadow-lg hover:border-primary-200">
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-text-primary mb-2">{announcement.title}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getAudienceTagColor(announcement.targetAudience)}`}>
                    {announcement.targetAudience}
                </span>
            </div>
            <p className="text-sm text-text-secondary mb-4 whitespace-pre-wrap">{announcement.message}</p>
            <div className="flex justify-between items-center border-t border-border pt-3">
                <p className="text-xs text-text-secondary">
                    Posted {formatDistanceToNow(new Date(announcement.createdAt))} ago
                </p>
                <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => onEdit(announcement)} iconName="Edit" />
                    <Button size="sm" variant="ghost" onClick={() => onDelete(announcement.id)} iconName="Trash" className="text-error" />
                </div>
            </div>
        </div>
    );
};


const AnnouncementsPage = ({ onLogout, notifications, setNotifications }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [form, setForm] = useState({ title: "", message: "", targetAudience: "All" });
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {
        setIsLoading(true);
        const data = await getAnnouncements();
        setAnnouncements(data);
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Title", form.title);
        formData.append("Message", form.message);
        formData.append("TargetAudience", form.targetAudience);

        if (editingId) {
            await updateAnnouncement(editingId, formData);
        } else {
            await createAnnouncement(formData);
        }
        resetForm();
        loadAnnouncements();
    };

    const handleEdit = (announcement) => {
        setEditingId(announcement.id);
        setForm({
            title: announcement.title,
            message: announcement.message,
            targetAudience: announcement.targetAudience,
        });
        // Scroll to the top to make the form visible
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this announcement?")) {
            await deleteAnnouncement(id);
            loadAnnouncements();
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({ title: "", message: "", targetAudience: "All" });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header onLogout={onLogout} notifications={notifications} setNotifications={setNotifications} />
            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-text-primary">Manage Announcements</h1>
                        <Button onClick={loadAnnouncements} variant="outline" iconName="RefreshCw">Refresh</Button>
                    </div>

                    {/* New Two-Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Form */}
                        <div className="lg:col-span-1">
                            <div className="bg-surface rounded-lg p-6 shadow-card border border-border sticky top-24">
                                <h2 className="text-xl font-semibold text-text-primary mb-4">{editingId ? 'Edit Announcement' : 'Create New'}</h2>
                                <form onSubmit={handleFormSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Title</label>
                                        <input id="title" name="title" type="text" value={form.title} onChange={handleInputChange} required className="w-full bg-input border-border rounded-md p-2 text-text-primary focus:ring-primary focus:border-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Message</label>
                                        <textarea id="message" name="message" value={form.message} onChange={handleInputChange} required rows="4" className="w-full bg-input border-border rounded-md p-2 text-text-primary focus:ring-primary focus:border-primary"></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="targetAudience" className="block text-sm font-medium text-text-secondary mb-1">Target Audience</label>
                                        <select id="targetAudience" name="targetAudience" value={form.targetAudience} onChange={handleInputChange} className="w-full bg-input border-border rounded-md p-2 text-text-primary focus:ring-primary focus:border-primary">
                                            <option value="All">All</option>
                                            <option value="Teacher">Teachers</option>
                                            <option value="Parent">Parents</option>
                                            <option value="Student">Students</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center space-x-4 pt-2">
                                        <Button type="submit" variant="primary" className="flex-1">{editingId ? 'Update' : 'Create'}</Button>
                                        {editingId && <Button type="button" variant="ghost" onClick={resetForm}>Cancel</Button>}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Announcements List */}
                        <div className="lg:col-span-2 space-y-6">
                            {isLoading ? (
                                <>
                                    <AnnouncementSkeleton />
                                    <AnnouncementSkeleton />
                                    <AnnouncementSkeleton />
                                </>
                            ) : announcements.length > 0 ? (
                                announcements.map((ann) => (
                                    <AnnouncementCard key={ann.id} announcement={ann} onEdit={handleEdit} onDelete={handleDelete} />
                                ))
                            ) : (
                                <div className="text-center py-16 bg-surface rounded-lg border border-border">
                                    <Icon name="Inbox" size={48} className="mx-auto text-text-secondary mb-4" />
                                    <h3 className="text-xl font-semibold text-text-primary">No Announcements Found</h3>
                                    <p className="text-text-secondary mt-1">Create a new announcement using the form on the left.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnnouncementsPage;
