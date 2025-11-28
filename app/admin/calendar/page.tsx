"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    category: string;
    date: string;
    time?: string;
    location?: string;
}

export default function AdminCalendarPage() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "kuliah_dhuha",
        date: "",
        time: "",
        location: "",
    });

    const categories = [
        { value: "kuliah_dhuha", label: "Kuliah Dhuha" },
        { value: "seminar", label: "Seminar PAI" },
        { value: "mentoring", label: "Mentoring" },
        { value: "bina_kader", label: "Bina Kader" },
        { value: "bina_mentor", label: "Bina Mentor" },
        { value: "other", label: "Lainnya" },
    ];

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("/api/calendar");
            const data = await response.json();
            setEvents(data.events || []);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = "/api/calendar";
            const method = editingId ? "PUT" : "POST";

            const payload = {
                ...formData,
                ...(editingId && { id: editingId }),
            };

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert(editingId ? "Event berhasil diupdate!" : "Event berhasil ditambahkan!");
                resetForm();
                fetchEvents();
            } else {
                alert("Gagal menyimpan event");
            }
        } catch (error) {
            console.error("Error saving event:", error);
            alert("Terjadi kesalahan");
        }
    };

    const handleEdit = (event: CalendarEvent) => {
        setFormData({
            title: event.title,
            description: event.description || "",
            category: event.category,
            date: event.date,
            time: event.time || "",
            location: event.location || "",
        });
        setEditingId(event.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus event ini?")) return;

        try {
            const response = await fetch(`/api/calendar?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Event berhasil dihapus!");
                fetchEvents();
            } else {
                alert("Gagal menghapus event");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Terjadi kesalahan");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            category: "kuliah_dhuha",
            date: "",
            time: "",
            location: "",
        });
        setEditingId(null);
        setShowForm(false);
    };

    const getCategoryLabel = (value: string) => {
        return categories.find((c) => c.value === value)?.label || value;
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link
                                href="/admin/dashboard"
                                className="text-sm text-neutral-600 hover:text-primary-600 mb-2 inline-block"
                            >
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold text-neutral-900">
                                Kelola Kalender & Events
                            </h1>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Event"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {editingId ? "Edit Event" : "Tambah Event Baru"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Nama Event*
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Contoh: Kuliah Dhuha Perdana"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Kategori*
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({ ...formData, category: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Tanggal*
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, date: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Waktu
                                    </label>
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) =>
                                            setFormData({ ...formData, time: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Lokasi
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData({ ...formData, location: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Contoh: Masjid Al-Furqan"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Detail kegiatan..."
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    {editingId ? "Update Event" : "Simpan Event"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-200">
                        <h2 className="text-lg font-semibold text-neutral-900">
                            Daftar Event ({events.length})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-neutral-600">Memuat event...</p>
                        </div>
                    ) : events.length === 0 ? (
                        <div className="p-8 text-center text-neutral-600">
                            Belum ada event. Klik "Tambah Event" untuk menambahkan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-neutral-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Event
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Lokasi
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200">
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-neutral-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                                {new Date(event.date).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                                {event.time && <div className="text-xs text-neutral-400 mt-1">{event.time}</div>}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-900">
                                                <div className="font-medium">{event.title}</div>
                                                {event.description && (
                                                    <div className="text-xs text-neutral-500 truncate max-w-xs">{event.description}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-600">
                                                    {getCategoryLabel(event.category)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">
                                                {event.location || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(event)}
                                                    className="text-primary-600 hover:text-primary-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
