"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PHOTO_PLACEHOLDERS, getPlaceholdersGrouped } from "@/lib/photo-placeholders";

interface GalleryItem {
    id: string;
    title: string;
    description?: string;
    image_url: string;
    category: string;
    placeholder?: string;
    is_published: boolean;
}

interface FormData {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    placeholder: string;
    isPublished: boolean;
}

// Helper to convert Google Drive URL to FULL HD direct image URL
function getGoogleDrivePreviewUrl(url: string): string {
    if (!url) return "";

    // Extract file ID
    let fileId = "";

    // Format: https://drive.google.com/file/d/FILE_ID/view
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
        fileId = fileIdMatch[1];
    } else {
        // Format: https://drive.google.com/open?id=FILE_ID
        const openIdMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
        if (openIdMatch) {
            fileId = openIdMatch[1];
        }
    }

    if (fileId) {
        // Use uc?export=view for FULL RESOLUTION original quality
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    // Already a direct URL or other format
    return url;
}

// Get placeholder name by ID
function getPlaceholderName(id: string): string {
    const placeholder = PHOTO_PLACEHOLDERS.find(p => p.id === id);
    return placeholder?.name || id || "Tidak ditentukan";
}

export default function GaleriCMSPage() {
    const router = useRouter();
    const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        imageUrl: "",
        category: "Kegiatan",
        placeholder: "",
        isPublished: true,
    });

    // Group placeholders by page for organized dropdown
    const placeholderGroups = getPlaceholdersGrouped();

    useEffect(() => {
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");
        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }
        fetchGallery();
    }, [router]);

    // Update preview when imageUrl changes
    useEffect(() => {
        if (formData.imageUrl) {
            setPreviewUrl(getGoogleDrivePreviewUrl(formData.imageUrl));
        } else {
            setPreviewUrl("");
        }
    }, [formData.imageUrl]);

    const fetchGallery = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setGalleryList(data.gallery || []);
        } catch (err) {
            console.error("Failed to fetch gallery:", err);
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
                imageUrl: formData.imageUrl,
                category: formData.category,
                placeholder: formData.placeholder || null,
                isPublished: formData.isPublished,
            };

            const res = await fetch("/api/gallery", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert(editingId ? "Foto berhasil diupdate!" : "Foto berhasil ditambahkan!");
                resetForm();
                fetchGallery();
            } else {
                const err = await res.json();
                alert("Gagal menyimpan: " + (err.error || "Unknown error"));
            }
        } catch (err) {
            alert("Gagal menyimpan foto");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (item: GalleryItem) => {
        setFormData({
            title: item.title,
            description: item.description || "",
            imageUrl: item.image_url,
            category: item.category || "Kegiatan",
            placeholder: item.placeholder || "",
            isPublished: item.is_published,
        });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus foto ini?")) return;

        try {
            const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Foto berhasil dihapus!");
                fetchGallery();
            } else {
                alert("Gagal menghapus foto");
            }
        } catch {
            alert("Gagal menghapus foto");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            imageUrl: "",
            category: "Kegiatan",
            placeholder: "",
            isPublished: true,
        });
        setEditingId(null);
        setShowForm(false);
        setPreviewUrl("");
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
                            <h1 className="text-2xl font-bold text-gray-900">Kelola Galeri Foto</h1>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors"
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Foto"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {editingId ? "Edit Foto" : "Tambah Foto Baru"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul*</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                            placeholder="Judul Foto"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">URL Google Drive*</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                            placeholder="https://drive.google.com/file/d/xxx/view"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Paste link Google Drive. Format: drive.google.com/file/d/FILE_ID/view
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                            placeholder="Deskripsi foto..."
                                        />
                                    </div>

                                    {/* PLACEHOLDER DROPDOWN - New Feature */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            📍 Lokasi di Website
                                            <span className="text-gray-400 font-normal ml-1">(opsional)</span>
                                        </label>
                                        <select
                                            value={formData.placeholder}
                                            onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B] bg-white"
                                        >
                                            <option value="">-- Pilih lokasi di website --</option>
                                            {Object.entries(placeholderGroups).map(([page, placeholders]) => (
                                                <optgroup key={page} label={`📄 ${page}`}>
                                                    {placeholders.map(p => (
                                                        <option key={p.id} value={p.id}>
                                                            {p.name}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Pilih di mana foto ini akan ditampilkan di website
                                        </p>
                                        {/* Show selected placeholder description */}
                                        {formData.placeholder && (
                                            <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                                                <p className="text-xs text-blue-700">
                                                    ℹ️ {PHOTO_PLACEHOLDERS.find(p => p.id === formData.placeholder)?.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>

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
                                            <option value="Dokumentasi">Dokumentasi</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isPublished"
                                            checked={formData.isPublished}
                                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                            className="h-4 w-4 text-[#055E5B] focus:ring-[#055E5B] border-gray-300 rounded"
                                        />
                                        <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                                            Publish Sekarang
                                        </label>
                                    </div>
                                </div>

                                {/* Preview Panel */}
                                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">📷 Preview Gambar</h3>
                                    {previewUrl ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/assets/placeholder.png";
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="aspect-video rounded-lg bg-gray-200 flex items-center justify-center">
                                            <div className="text-center text-gray-500">
                                                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-sm">Masukkan URL untuk preview</p>
                                            </div>
                                        </div>
                                    )}
                                    {/* Show where this photo will appear */}
                                    {formData.placeholder && (
                                        <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                                            <p className="text-xs text-green-700 font-medium">
                                                ✓ Akan ditampilkan di: {getPlaceholderName(formData.placeholder)}
                                            </p>
                                        </div>
                                    )}
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

                {/* Gallery Grid */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Daftar Foto ({galleryList.length})</h2>
                    </div>

                    {galleryList.length === 0 ? (
                        <div className="p-8 text-center text-gray-600">
                            Belum ada foto. Klik &quot;Tambah Foto&quot; untuk menambahkan.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            {galleryList.map((item) => (
                                <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 group">
                                    <div className="aspect-video relative bg-gray-200">
                                        <img
                                            src={getGoogleDrivePreviewUrl(item.image_url)}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/assets/placeholder.png";
                                            }}
                                        />
                                        {!item.is_published && (
                                            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                                Draft
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                                        <p className="text-sm text-gray-500 truncate">{item.description || "-"}</p>

                                        {/* Show placeholder location */}
                                        {item.placeholder && (
                                            <div className="mt-2 flex items-center text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                                                <span className="mr-1">📍</span>
                                                {getPlaceholderName(item.placeholder)}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mt-3">
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                {item.category}
                                            </span>
                                            <div className="space-x-2">
                                                <button onClick={() => handleEdit(item)} className="text-sm text-[#055E5B] hover:underline">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="text-sm text-red-600 hover:underline">
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
