"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CabinetMember {
    id: string;
    name: string;
    position: string;
    division?: string;
    photo_url?: string;
    email?: string;
    phone?: string;
    bio?: string;
    order_index: number;
}

interface FormData {
    name: string;
    position: string;
    division: string;
    photoUrl: string;
    email: string;
    phone: string;
    bio: string;
    orderIndex: number;
}

export default function KabinetCMSPage() {
    const router = useRouter();
    const [members, setMembers] = useState<CabinetMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        position: "",
        division: "",
        photoUrl: "",
        email: "",
        phone: "",
        bio: "",
        orderIndex: 0,
    });

    useEffect(() => {
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");
        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }
        fetchMembers();
    }, [router]);

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/cabinet");
            const data = await res.json();
            setMembers(data.members || []);
        } catch (err) {
            console.error("Failed to fetch members:", err);
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
                name: formData.name,
                position: formData.position,
                division: formData.division || null,
                photoUrl: formData.photoUrl || null,
                email: formData.email || null,
                phone: formData.phone || null,
                bio: formData.bio || null,
                orderIndex: formData.orderIndex,
            };

            const res = await fetch("/api/cabinet", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert(editingId ? "Anggota berhasil diupdate!" : "Anggota berhasil ditambahkan!");
                resetForm();
                fetchMembers();
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

    const handleEdit = (member: CabinetMember) => {
        setFormData({
            name: member.name,
            position: member.position,
            division: member.division || "",
            photoUrl: member.photo_url || "",
            email: member.email || "",
            phone: member.phone || "",
            bio: member.bio || "",
            orderIndex: member.order_index || 0,
        });
        setEditingId(member.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus anggota ini?")) return;

        try {
            const res = await fetch(`/api/cabinet?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Anggota berhasil dihapus!");
                fetchMembers();
            } else {
                alert("Gagal menghapus anggota");
            }
        } catch {
            alert("Gagal menghapus anggota");
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
            orderIndex: 0,
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
                            <h1 className="text-2xl font-bold text-gray-900">Kelola Kabinet/Pengurus</h1>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors"
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Anggota"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {editingId ? "Edit Anggota" : "Tambah Anggota Baru"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama*</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="Nama Lengkap"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Jabatan*</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="Ketua / Wakil Ketua / dll"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Divisi</label>
                                    <input
                                        type="text"
                                        value={formData.division}
                                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="Bidang Pendidikan / dll"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Urutan</label>
                                    <input
                                        type="number"
                                        value={formData.orderIndex}
                                        onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">URL Foto</label>
                                <input
                                    type="text"
                                    value={formData.photoUrl}
                                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="https://example.com/foto.jpg atau /assets/kabinet/nama.jpg"
                                />
                                <p className="text-xs text-gray-500 mt-1">Gunakan URL gambar dari internet atau path lokal</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="email@upi.edu"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="Deskripsi singkat..."
                                />
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
                        <h2 className="text-lg font-semibold text-gray-900">Daftar Pengurus ({members.length})</h2>
                    </div>

                    {members.length === 0 ? (
                        <div className="p-8 text-center text-gray-600">
                            Belum ada data pengurus. Klik "Tambah Anggota" untuk menambahkan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foto</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jabatan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Divisi</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Urutan</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {members.map((member) => (
                                        <tr key={member.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                {member.photo_url ? (
                                                    <img src={member.photo_url} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{member.position}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{member.division || "-"}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{member.order_index}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                <button onClick={() => handleEdit(member)} className="text-[#055E5B] hover:text-[#044947] mr-4">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900">
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
