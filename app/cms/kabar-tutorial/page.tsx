"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NewsItem {
    id: string;
    title: string;
    content: string;
    category: string;
    imageUrl?: string;
    image_url?: string;
    author?: string;
    publishedDate?: string;
    published_date?: string;
    isPublished: boolean | number;
    is_published?: boolean | number;
}

interface FormData {
    title: string;
    content: string;
    category: string;
    imageUrl: string;
    author: string;
    publishedDate: string;
    isPublished: boolean;
}

export default function KabarTutorialPage() {
    const router = useRouter();
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
    const [formData, setFormData] = useState<FormData>({
        title: "",
        content: "",
        category: "Kegiatan",
        imageUrl: "",
        author: "",
        publishedDate: "",
        isPublished: false,
    });

    useEffect(() => {
        // Check auth
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");

        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }

        fetchNews();
    }, [router]);

    const fetchNews = async () => {
        try {
            const res = await fetch("/api/news");
            const data = await res.json() as { news: NewsItem[] };
            setNewsList(data.news || []);
        } catch (err) {
            console.error("Failed to fetch news:", err);
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
                content: formData.content,
                category: formData.category,
                imageUrl: formData.imageUrl || null,
                author: formData.author || null,
                publishedDate: formData.publishedDate || null,
                isPublished: formData.isPublished,
            };

            const res = await fetch("/api/news", {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert(editingId ? "Berita berhasil diupdate!" : "Berita berhasil ditambahkan!");
                resetForm();
                fetchNews();
            } else {
                const err = await res.json() as { error?: string };
                alert("Gagal menyimpan: " + (err.error || "Unknown error"));
            }
        } catch (err) {
            alert("Gagal menyimpan berita");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (news: NewsItem) => {
        setFormData({
            title: news.title,
            content: news.content,
            category: news.category || "Kegiatan",
            imageUrl: news.imageUrl || news.image_url || "",
            author: news.author || "",
            publishedDate: news.publishedDate || news.published_date || "",
            isPublished: (news.isPublished !== undefined ? !!news.isPublished : !!news.is_published),
        });
        setEditingId(news.id);
        setShowForm(true);
        setActiveTab("edit");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus berita ini?")) return;

        try {
            const res = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                alert("Berita berhasil dihapus!");
                fetchNews();
            } else {
                alert("Gagal menghapus berita");
            }
        } catch {
            alert("Gagal menghapus berita");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            content: "",
            category: "Kegiatan",
            imageUrl: "",
            author: "",
            publishedDate: "",
            isPublished: false,
        });
        setEditingId(null);
        setShowForm(false);
        setActiveTab("edit");
    };

    // Simple markdown to HTML converter
    const renderMarkdown = (text: string) => {
        if (!text) return "";
        return text
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#055E5B] underline">$1</a>')
            .replace(/^- (.*)$/gim, '<li class="ml-4">• $1</li>')
            .replace(/\n/g, '<br/>');
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
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link
                                href="/cms/dashboard"
                                className="text-sm text-gray-600 hover:text-[#055E5B] mb-2 inline-block"
                            >
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Kelola Kabar Tutorial</h1>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors"
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Berita"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {editingId ? "Edit Berita" : "Tambah Berita Baru"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul*</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="Judul Berita"
                                />
                            </div>

                            {/* Markdown Editor with Tabs */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Konten (Markdown)*</label>
                                <div className="border border-gray-300 rounded-lg overflow-hidden">
                                    {/* Tabs */}
                                    <div className="flex border-b border-gray-300 bg-gray-50">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("edit")}
                                            className={`px-4 py-2 text-sm font-medium ${activeTab === "edit" ? "bg-white text-[#055E5B] border-b-2 border-[#055E5B]" : "text-gray-600 hover:text-gray-900"}`}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("preview")}
                                            className={`px-4 py-2 text-sm font-medium ${activeTab === "preview" ? "bg-white text-[#055E5B] border-b-2 border-[#055E5B]" : "text-gray-600 hover:text-gray-900"}`}
                                        >
                                            👁️ Preview
                                        </button>
                                    </div>

                                    {/* Content */}
                                    {activeTab === "edit" ? (
                                        <textarea
                                            required
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={10}
                                            className="w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#055E5B] font-mono text-sm"
                                            placeholder="Tulis konten dengan Markdown...

Contoh:
# Judul
## Sub Judul

**Teks tebal** dan *teks miring*

- List item 1
- List item 2

[Link](https://example.com)"
                                        />
                                    ) : (
                                        <div
                                            className="p-4 min-h-[250px] prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: renderMarkdown(formData.content) || '<p class="text-gray-400 italic">Tidak ada konten untuk di-preview</p>' }}
                                        />
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Mendukung Markdown: **bold**, *italic*, # heading, - list, [link](url)</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    >
                                        <option value="Kegiatan">Kegiatan</option>
                                        <option value="Seminar">Seminar</option>
                                        <option value="Pengumuman">Pengumuman</option>
                                        <option value="Berita">Berita</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="Nama Penulis"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                        placeholder="/assets/kegiatan/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Publish</label>
                                    <input
                                        type="date"
                                        value={formData.publishedDate}
                                        onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    />
                                </div>
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

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors disabled:opacity-50"
                                >
                                    {saving ? "Menyimpan..." : (editingId ? "Update Berita" : "Simpan Berita")}
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

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Daftar Berita ({newsList.length})
                        </h2>
                    </div>

                    {newsList.length === 0 ? (
                        <div className="p-8 text-center text-gray-600">
                            Belum ada berita. Klik "Tambah Berita" untuk menambahkan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {newsList.map((news) => (
                                        <tr key={news.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{news.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {news.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {news.publishedDate || news.published_date || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {(news.isPublished !== undefined ? !!news.isPublished : !!news.is_published) ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleEdit(news)} className="text-[#055E5B] hover:text-[#044947] mr-4">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(news.id)}
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
