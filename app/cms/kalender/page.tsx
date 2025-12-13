"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    category: string;
    date: string;
    time?: string;
    location?: string;
    image_url?: string;
}

interface FormData {
    title: string;
    description: string;
    category: string;
    date: string;
    time: string;
    location: string;
    imageUrl: string;
}

export default function KalenderCMSPage() {
    const router = useRouter();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        category: "Kegiatan",
        date: "",
        time: "",
        location: "",
        imageUrl: "",
    });

    useEffect(() => {
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");
        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }
        fetchEvents();
    }, [router]);

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/calendar");
            const data = await res.json();
            setEvents(data.events || []);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...(editingId && { id: editingId }),
                title: formData.title,
                description: formData.description || null,
                category: formData.category,
                date: formData.date,
                time: formData.time || null,
                location: formData.location || null,
                imageUrl: formData.imageUrl || null,
            };

            const res = await fetch("/api/calendar", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert(editingId ? "Event berhasil diupdate!" : "Event berhasil ditambahkan!");
                resetForm();
                fetchEvents();
            } else {
                const err = await res.json();
                alert("Gagal menyimpan: " + (err.error || "Unknown error"));
            }
        } catch (err) {
            alert("Gagal menyimpan data");
        } finally {
            setSaving(false);
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
            imageUrl: event.image_url || "",
        });
        setEditingId(event.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus event ini?")) return;

        try {
            const res = await fetch(`/api/calendar?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Event berhasil dihapus!");
                fetchEvents();
            } else {
                alert("Gagal menghapus event");
            }
        } catch {
            alert("Gagal menghapus event");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            category: "Kegiatan",
            date: "",
            time: "",
            location: "",
            imageUrl: "",
        });
        setEditingId(null);
        setShowForm(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#055E5B]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/cms/dashboard" className="text-sm text-gray-600 hover:text-[#055E5B] mb-2 inline-block">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Kelola Kalender Kegiatan</h1>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors"
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Event"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {editingId ? "Edit Event" : "Tambah Event Baru"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Event*</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="Nama Kegiatan"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="Deskripsi kegiatan..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    >
                                        <option value="Kegiatan">Kegiatan</option>
                                        <option value="Seminar">Seminar</option>
                                        <option value="Kuliah Dhuha">Kuliah Dhuha</option>
                                        <option value="Mentoring">Mentoring</option>
                                        <option value="Bina Kader">Bina Kader</option>
                                        <option value="Bina Mentor">Bina Mentor</option>
                                        <option value="Rapat">Rapat</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal*</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Waktu</label>
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="Masjid Kampus UPI / Online"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="https://example.com/poster.jpg"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors disabled:opacity-50"
                                >
                                    {saving ? "Menyimpan..." : (editingId ? "Update" : "Simpan")}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Daftar Event ({events.length})</h2>
                    </div>

                    {events.length === 0 ? (
                        <div className="p-8 text-center text-gray-600">
                            Belum ada event. Klik "Tambah Event" untuk menambahkan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{event.title}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                    {event.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{event.date}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{event.time || "-"}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{event.location || "-"}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                <button onClick={() => handleEdit(event)} className="text-[#055E5B] hover:text-[#044947] mr-4">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-900">
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
