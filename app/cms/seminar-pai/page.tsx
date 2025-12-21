"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Schedule {
    id: string;
    weekNumber: number;
    dayType: string | null;
    date: string;
    topic: string;
    speaker: string | null;
    materials: string | null;
    location: string | null;
}

interface FormData {
    weekNumber: number;
    dayType: string;
    date: string;
    topic: string;
    speaker: string;
    materials: string[];
    location: string;
}

const defaultFormData: FormData = {
    weekNumber: 2,
    dayType: "Rabu",
    date: "",
    topic: "",
    speaker: "",
    materials: [""],
    location: "Masjid Al Furqon",
};

export default function CMSSeminarPAI() {
    const router = useRouter();
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>(defaultFormData);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");
        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }
        fetchSchedules();
    }, [router]);

    const fetchSchedules = async () => {
        try {
            const res = await fetch("/api/seminar");
            const data = await res.json() as { schedules?: Schedule[] };
            setSchedules(data.schedules || []);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const materialsFiltered = formData.materials.filter(m => m.trim() !== "");
            const body = {
                ...formData,
                materials: materialsFiltered,
                ...(editingId && { id: editingId }),
            };

            const res = await fetch("/api/seminar", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setShowModal(false);
                setEditingId(null);
                setFormData(defaultFormData);
                fetchSchedules();
            } else {
                alert("Gagal menyimpan jadwal");
            }
        } catch (error) {
            console.error("Error saving schedule:", error);
            alert("Terjadi kesalahan");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (schedule: Schedule) => {
        const materials = schedule.materials ? JSON.parse(schedule.materials) as string[] : [""];
        setFormData({
            weekNumber: schedule.weekNumber,
            dayType: schedule.dayType || "Rabu",
            date: schedule.date,
            topic: schedule.topic,
            speaker: schedule.speaker || "",
            materials: materials.length > 0 ? materials : [""],
            location: schedule.location || "Masjid Al Furqon",
        });
        setEditingId(schedule.id);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/seminar?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setDeleteConfirm(null);
                fetchSchedules();
            } else {
                alert("Gagal menghapus jadwal");
            }
        } catch (error) {
            console.error("Error deleting schedule:", error);
        }
    };

    const addMaterialField = () => {
        setFormData((prev) => ({ ...prev, materials: [...prev.materials, ""] }));
    };

    const removeMaterialField = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            materials: prev.materials.filter((_, i) => i !== index),
        }));
    };

    const updateMaterial = (index: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            materials: prev.materials.map((m, i) => (i === index ? value : m)),
        }));
    };

    const openAddModal = () => {
        setFormData(defaultFormData);
        setEditingId(null);
        setShowModal(true);
    };

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
                            <span className="text-xl font-bold text-[#055E5B]">Kelola Seminar PAI</span>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={openAddModal}
                                className="flex items-center gap-2 px-4 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Jadwal
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Info Card */}
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-6 mb-8 text-white">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-1">Jadwal Seminar PAI</h2>
                            <p className="text-white/80 text-sm">
                                Kelola jadwal pemateri dan materi Seminar PAI. <strong>Rabu</strong> untuk FPIPS & FPSD,
                                <strong> Jumat</strong> untuk FIP, FK & FPEB. Materi bisa sama tapi pemateri berbeda per hari.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pekan</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Hari</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Topik</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pemateri</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Materi</th>
                                    <th className="px-4 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {schedules.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p>Belum ada jadwal</p>
                                                <button onClick={openAddModal} className="mt-3 text-[#055E5B] font-medium hover:underline">
                                                    + Tambah jadwal pertama
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    schedules.map((schedule) => {
                                        const materials = schedule.materials ? JSON.parse(schedule.materials) as string[] : [];
                                        return (
                                            <tr key={schedule.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-4">
                                                    <span className="inline-flex items-center justify-center w-10 h-10 bg-rose-500 text-white font-bold rounded-lg">
                                                        {schedule.weekNumber}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${schedule.dayType === 'Jumat'
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                        {schedule.dayType || 'Rabu'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-900">{schedule.date}</td>
                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-gray-900">{schedule.topic}</span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    {schedule.speaker ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                                            👤 {schedule.speaker}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4">
                                                    {materials.length > 0 ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                                            📎 {materials.length} file
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">-</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleEdit(schedule)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirm(schedule.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {editingId ? "Edit Jadwal" : "Tambah Jadwal Baru"}
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
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pekan</label>
                                    <select
                                        value={formData.weekNumber}
                                        onChange={(e) => setFormData({ ...formData, weekNumber: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                        required
                                    >
                                        {[2, 3, 4, 5, 6, 7].map((n) => (
                                            <option key={n} value={n}>Pekan {n}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hari</label>
                                    <select
                                        value={formData.dayType}
                                        onChange={(e) => setFormData({ ...formData, dayType: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="Rabu">Rabu (FPIPS & FPSD)</option>
                                        <option value="Jumat">Jumat (FIP, FK & FPEB)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Topik/Judul Materi</label>
                                <input
                                    type="text"
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    placeholder="Contoh: Adab Menuntut Ilmu"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pemateri</label>
                                <p className="text-xs text-gray-500 mb-1">Pemateri untuk hari {formData.dayType}</p>
                                <input
                                    type="text"
                                    value={formData.speaker}
                                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                                    placeholder="Contoh: Ustadz Ahmad, S.Pd.I"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Masjid Al Furqon"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Link Materi (Google Drive)</label>
                                <p className="text-xs text-gray-500 mb-2">Masukkan link Google Drive untuk file PPT atau PDF</p>
                                <div className="space-y-2">
                                    {formData.materials.map((material, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="url"
                                                value={material}
                                                onChange={(e) => updateMaterial(index, e.target.value)}
                                                placeholder="https://drive.google.com/..."
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                            />
                                            {formData.materials.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeMaterialField(index)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={addMaterialField}
                                    className="mt-2 text-sm text-rose-600 font-medium hover:underline flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Tambah link materi lain
                                </button>
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
                                    className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
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
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus Jadwal?</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Data jadwal yang dihapus tidak dapat dikembalikan.
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
