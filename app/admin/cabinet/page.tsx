"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Member {
    id: string;
    name: string;
    position: string;
    division?: string;
    photoUrl?: string;
    email?: string;
    phone?: string;
    bio?: string;
    orderIndex: number;
}

export default function AdminCabinetPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        division: "",
        photoUrl: "",
        email: "",
        phone: "",
        bio: "",
        orderIndex: "0",
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await fetch("/api/cabinet");
            const data = await response.json() as any;
            setMembers(data.members || []);
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = "/api/cabinet";
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
                alert(editingId ? "Pengurus berhasil diupdate!" : "Pengurus berhasil ditambahkan!");
                resetForm();
                fetchMembers();
            } else {
                alert("Gagal menyimpan pengurus");
            }
        } catch (error) {
            console.error("Error saving member:", error);
            alert("Terjadi kesalahan");
        }
    };

    const handleEdit = (member: Member) => {
        setFormData({
            name: member.name,
            position: member.position,
            division: member.division || "",
            photoUrl: member.photoUrl || "",
            email: member.email || "",
            phone: member.phone || "",
            bio: member.bio || "",
            orderIndex: member.orderIndex.toString(),
        });
        setEditingId(member.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus pengurus ini?")) return;

        try {
            const response = await fetch(`/api/cabinet?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Pengurus berhasil dihapus!");
                fetchMembers();
            } else {
                alert("Gagal menghapus pengurus");
            }
        } catch (error) {
            console.error("Error deleting member:", error);
            alert("Terjadi kesalahan");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            position: "",
            division: "",
            photoUrl: "",
            email: "",
            phone: "",
            bio: "",
            orderIndex: "0",
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
                                Kelola Kabinet & Pengurus
                            </h1>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Pengurus"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {editingId ? "Edit Pengurus" : "Tambah Pengurus Baru"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Nama Lengkap*
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Nama Lengkap"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Jabatan*
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.position}
                                        onChange={(e) =>
                                            setFormData({ ...formData, position: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Contoh: Ketua Umum"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Divisi/Biro
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.division}
                                        onChange={(e) =>
                                            setFormData({ ...formData, division: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Contoh: BPO"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Urutan Tampil
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.orderIndex}
                                        onChange={(e) =>
                                            setFormData({ ...formData, orderIndex: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        No. HP/WA
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    URL Foto
                                </label>
                                <input
                                    type="text"
                                    value={formData.photoUrl}
                                    onChange={(e) =>
                                        setFormData({ ...formData, photoUrl: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Bio Singkat
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({ ...formData, bio: e.target.value })
                                    }
                                    rows={3}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    {editingId ? "Update Pengurus" : "Simpan Pengurus"}
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
                            Daftar Pengurus ({members.length})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-neutral-600">Memuat data...</p>
                        </div>
                    ) : members.length === 0 ? (
                        <div className="p-8 text-center text-neutral-600">
                            Belum ada data pengurus. Klik "Tambah Pengurus" untuk menambahkan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-neutral-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Jabatan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Divisi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Urutan
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200">
                                    {members.map((member) => (
                                        <tr key={member.id} className="hover:bg-neutral-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                                                {member.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                                {member.position}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                                {member.division || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                                {member.orderIndex}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(member)}
                                                    className="text-primary-600 hover:text-primary-900 mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(member.id)}
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
