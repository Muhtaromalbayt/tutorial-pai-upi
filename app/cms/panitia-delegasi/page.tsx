"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Role configuration
const ROLES = [
    { name: "Penyaji", isRotating: true, ikhwan: 2, akhwat: 1 },
    { name: "MC", isRotating: true, ikhwan: 1, akhwat: 0 },
    { name: "Operator", isRotating: false, ikhwan: 1, akhwat: 1 },
    { name: "Notulensi", isRotating: false, ikhwan: 1, akhwat: 1 },
    { name: "Time Keeper", isRotating: false, ikhwan: 1, akhwat: 1 },
    { name: "Logistik", isRotating: false, ikhwan: 3, akhwat: 3 },
    { name: "Keamanan", isRotating: false, ikhwan: 3, akhwat: 3 },
    { name: "Dokumentasi", isRotating: false, ikhwan: 1, akhwat: 1 },
];

const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8];

interface Member {
    id: string;
    dayType: string;
    role: string;
    weekNumber: number | null;
    name: string;
    gender: string;
    phone: string | null;
    orderIndex: number;
}

interface FormData {
    dayType: string;
    role: string;
    weekNumber: number | null;
    name: string;
    gender: string;
    phone: string;
}

const defaultFormData: FormData = {
    dayType: "rabu",
    role: "Operator",
    weekNumber: null,
    name: "",
    gender: "ikhwan",
    phone: "",
};

export default function CMSPanitiaDelegasi() {
    const router = useRouter();
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>(defaultFormData);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [activeDay, setActiveDay] = useState<"rabu" | "jumat">("rabu");
    const [activeWeek, setActiveWeek] = useState<number | null>(null); // null = all weeks

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
            const res = await fetch("/api/panitia-delegasi");
            const data = await res.json() as { members?: Member[] };
            setMembers(data.members || []);
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const body = {
                ...formData,
                weekNumber: isRotatingRole(formData.role) ? formData.weekNumber : null,
                ...(editingId && { id: editingId }),
            };

            const res = await fetch("/api/panitia-delegasi", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setShowModal(false);
                setEditingId(null);
                setFormData(defaultFormData);
                fetchMembers();
            } else {
                alert("Gagal menyimpan data");
            }
        } catch (error) {
            console.error("Error saving member:", error);
            alert("Terjadi kesalahan");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (member: Member) => {
        setFormData({
            dayType: member.dayType,
            role: member.role,
            weekNumber: member.weekNumber,
            name: member.name,
            gender: member.gender || "ikhwan",
            phone: member.phone || "",
        });
        setEditingId(member.id);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/panitia-delegasi?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setDeleteConfirm(null);
                fetchMembers();
            } else {
                alert("Gagal menghapus data");
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const openAddModal = (role?: string, weekNumber?: number) => {
        setFormData({
            ...defaultFormData,
            dayType: activeDay,
            role: role || defaultFormData.role,
            weekNumber: weekNumber || null,
        });
        setEditingId(null);
        setShowModal(true);
    };

    const isRotatingRole = (role: string) => {
        return role === "Penyaji" || role === "MC";
    };

    // Filter members based on active day and week
    const filteredMembers = members.filter(m => {
        if (m.dayType !== activeDay) return false;
        if (activeWeek !== null && isRotatingRole(m.role)) {
            return m.weekNumber === activeWeek;
        }
        return true;
    });

    // Group members by role
    const membersByRole = ROLES.reduce((acc, role) => {
        acc[role.name] = filteredMembers.filter(m => m.role === role.name);
        return acc;
    }, {} as Record<string, Member[]>);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#055E5B]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/cms/dashboard" className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <span className="text-xl font-bold text-[#055E5B]">Kelola Panitia Delegasi</span>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => openAddModal()}
                                className="flex items-center gap-2 px-4 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Anggota
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Day Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveDay("rabu")}
                        className={`flex-1 py-4 rounded-xl font-medium transition-all ${activeDay === "rabu"
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                            }`}
                    >
                        <div className="text-lg">📅 Rabu</div>
                        <div className="text-sm opacity-80">FPIPS & FPSD</div>
                    </button>
                    <button
                        onClick={() => setActiveDay("jumat")}
                        className={`flex-1 py-4 rounded-xl font-medium transition-all ${activeDay === "jumat"
                                ? "bg-emerald-500 text-white shadow-lg"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300"
                            }`}
                    >
                        <div className="text-lg">📅 Jumat</div>
                        <div className="text-sm opacity-80">FIP, FK & FPEB</div>
                    </button>
                </div>

                {/* Week Filter for Rotating Roles */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium text-gray-700">Filter Pekan (MC & Penyaji):</span>
                        <button
                            onClick={() => setActiveWeek(null)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeWeek === null
                                    ? "bg-gray-800 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            Semua
                        </button>
                        {WEEKS.map(week => (
                            <button
                                key={week}
                                onClick={() => setActiveWeek(week)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeWeek === week
                                        ? activeDay === "rabu" ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                Pekan {week}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {ROLES.map(role => {
                        const roleMembers = membersByRole[role.name] || [];
                        const isRotating = role.isRotating;

                        return (
                            <div
                                key={role.name}
                                className={`bg-white rounded-xl border overflow-hidden ${activeDay === "rabu" ? "border-blue-200" : "border-emerald-200"
                                    }`}
                            >
                                {/* Role Header */}
                                <div className={`px-4 py-3 ${activeDay === "rabu" ? "bg-blue-50" : "bg-emerald-50"
                                    }`}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{role.name}</h3>
                                            <p className="text-xs text-gray-500">
                                                {role.ikhwan} ikhwan, {role.akhwat} akhwat
                                                {isRotating && <span className="ml-1 text-amber-600">(per pekan)</span>}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => openAddModal(role.name, activeWeek || undefined)}
                                            className={`p-1.5 rounded-lg transition-colors ${activeDay === "rabu"
                                                    ? "hover:bg-blue-100 text-blue-600"
                                                    : "hover:bg-emerald-100 text-emerald-600"
                                                }`}
                                            title="Tambah anggota"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Members List */}
                                <div className="p-3 space-y-2 min-h-[100px]">
                                    {roleMembers.length === 0 ? (
                                        <div className="text-center py-4 text-gray-400 text-sm">
                                            Belum ada anggota
                                        </div>
                                    ) : (
                                        roleMembers.map(member => (
                                            <div
                                                key={member.id}
                                                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${member.gender === "akhwat"
                                                            ? "bg-pink-100 text-pink-700"
                                                            : "bg-blue-100 text-blue-700"
                                                        }`}>
                                                        {member.gender === "akhwat" ? "👩" : "👨"}
                                                    </span>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                                        {isRotating && member.weekNumber && (
                                                            <div className="text-xs text-amber-600">Pekan {member.weekNumber}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(member)}
                                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(member.id)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                        title="Hapus"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {editingId ? "Edit Anggota" : "Tambah Anggota Baru"}
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hari</label>
                                    <select
                                        value={formData.dayType}
                                        onChange={(e) => setFormData({ ...formData, dayType: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="rabu">Rabu (FPIPS & FPSD)</option>
                                        <option value="jumat">Jumat (FIP, FK & FPEB)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        {ROLES.map(role => (
                                            <option key={role.name} value={role.name}>
                                                {role.name} {role.isRotating ? "(per pekan)" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {isRotatingRole(formData.role) && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pekan <span className="text-amber-600">(wajib untuk MC & Penyaji)</span>
                                    </label>
                                    <select
                                        value={formData.weekNumber || ""}
                                        onChange={(e) => setFormData({ ...formData, weekNumber: e.target.value ? Number(e.target.value) : null })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Pilih Pekan</option>
                                        {WEEKS.map(week => (
                                            <option key={week} value={week}>Pekan {week}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Masukkan nama lengkap"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="ikhwan">👨 Ikhwan</option>
                                        <option value="akhwat">👩 Akhwat</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        No. WhatsApp <span className="text-gray-400">(opsional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="62812..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 ${formData.dayType === "rabu"
                                            ? "bg-blue-500 hover:bg-blue-600"
                                            : "bg-emerald-500 hover:bg-emerald-600"
                                        }`}
                                >
                                    {saving ? "Menyimpan..." : editingId ? "Update" : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus Anggota?</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Data yang dihapus tidak dapat dikembalikan.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
