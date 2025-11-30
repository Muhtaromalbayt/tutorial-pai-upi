"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Schedule {
    id: string;
    weekNumber: number;
    date: string;
    topic: string;
    speaker?: string;
    materials?: string;
    location: string;
}

export default function AdminSeminarPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        weekNumber: "",
        date: "",
        topic: "",
        speaker: "",
        materials: "",
        location: "Masjid Kampus UPI",
    });

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await fetch("/api/seminar");
            const data = await response.json() as any;
            setSchedules(data.schedules || []);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = "/api/seminar";
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
                alert(editingId ? "Jadwal berhasil diupdate!" : "Jadwal berhasil ditambahkan!");
                resetForm();
                fetchSchedules();
            } else {
                alert("Gagal menyimpan jadwal");
            }
        } catch (error) {
            console.error("Error saving schedule:", error);
            alert("Terjadi kesalahan");
        }
    };

    const handleEdit = (schedule: Schedule) => {
        setFormData({
            weekNumber: schedule.weekNumber.toString(),
            date: schedule.date,
            topic: schedule.topic,
            speaker: schedule.speaker || "",
            materials: schedule.materials || "",
            location: schedule.location,
        });
        setEditingId(schedule.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus jadwal ini?")) return;

        try {
            const response = await fetch(`/api/seminar?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Jadwal berhasil dihapus!");
                fetchSchedules();
            } else {
                alert("Gagal menghapus jadwal");
            }
        } catch (error) {
            console.error("Error deleting schedule:", error);
            alert("Terjadi kesalahan");
        }
    };

    const resetForm = () => {
        setFormData({
            weekNumber: "",
            date: "",
            topic: "",
            speaker: "",
            materials: "",
            location: "Masjid Kampus UPI",
        });
        setEditingId(null);
        setShowForm(false);
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
                                Kelola Jadwal Seminar PAI
                            </h1>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Jadwal"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {editingId ? "Edit Jadwal" : "Tambah Jadwal Baru"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Minggu Ke-*
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.weekNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, weekNumber: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="1"
                                    />
                                </div>
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Topik/Materi*
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.topic}
                                    onChange={(e) =>
                                        setFormData({ ...formData, topic: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Contoh: Seminar Pendidikan Islam"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Pembicara
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.speaker}
                                        onChange={(e) =>
                                            setFormData({ ...formData, speaker: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Nama Pembicara"
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
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Materi (Link atau catatan)
                                </label>
                                <textarea
                                    value={formData.materials}
                                    onChange={(e) =>
                                        setFormData({ ...formData, materials: e.target.value })
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Link Google Drive, PDF, atau catatan"
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    {editingId ? "Update Jadwal" : "Simpan Jadwal"}
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
                            Daftar Jadwal ({schedules.length})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-neutral-600">Memuat jadwal...</p>
                        </div>
                    ) : schedules.length === 0 ? (
                        <div className="p-8 text-center text-neutral-600">
                            Belum ada jadwal. Klik "Tambah Jadwal" untuk menambahkan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-neutral-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Minggu
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Topik
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Pembicara
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
                                    {schedules.map((schedule) => (
                                        <tr key={schedule.id} className="hover:bg-neutral-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                                                Minggu {schedule.weekNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                                {new Date(schedule.date).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-900">
                                                {schedule.topic}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">
                                                {schedule.speaker || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">
                                                {schedule.location}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(schedule)}
                                                    className="text-primary-600 hover:text-primary-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(schedule.id)}
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
