import React, { useState, useEffect } from 'react';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../services/announcementService';
import Header from '../../components/ui/Header'; // Adjust path as needed
import Icon from '../../components/AppIcon'; // Adjust path as needed
import Button from '../../components/ui/Button'; // Adjust path as needed

const AnnouncementsPage = ({ onLogout }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [form, setForm] = useState({ title: "", message: "", targetAudience: "All" });
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
            <Header onLogout={onLogout} />
            <main className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-text-primary mb-6">Manage Announcements</h1>

                    {/* Form Card */}
                    <div className="bg-surface rounded-lg p-6 shadow-card border border-border mb-8">
                        <h2 className="text-xl font-semibold text-text-primary mb-4">{editingId ? 'Edit Announcement' : 'Create New Announcement'}</h2>
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
                            <div className="flex items-center space-x-4">
                                <Button type="submit" variant="primary">{editingId ? 'Update Announcement' : 'Create Announcement'}</Button>
                                {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancel Edit</Button>}
                            </div>
                        </form>
                    </div>

                    {/* Announcements List */}
                    <div className="bg-surface rounded-lg shadow-card border border-border">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-border">
                                <thead className="bg-secondary-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Message</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Audience</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-surface divide-y divide-border">
                                    {isLoading ? (
                                        <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                                    ) : announcements.length > 0 ? (
                                        announcements.map((ann) => (
                                            <tr key={ann.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{ann.title}</td>
                                                <td className="px-6 py-4 whitespace-pre-wrap text-sm text-text-secondary">{ann.message}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{ann.targetAudience}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Button size="sm" variant="outline" onClick={() => handleEdit(ann)}>Edit</Button>
                                                    <Button size="sm" variant="danger" onClick={() => handleDelete(ann.id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="4" className="text-center py-4">No announcements found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnnouncementsPage;
