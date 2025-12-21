"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface KnowledgeSource {
    sourceFile: string;
    chunkCount?: number;
}

export default function KnowledgeCMSPage() {
    const router = useRouter();
    const [sources, setSources] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        sourceFile: "",
        content: "",
    });
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");
        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }
        fetchSources();
    }, [router]);

    const fetchSources = async () => {
        try {
            const res = await fetch("/api/knowledge");
            const data = await res.json();
            setSources(data.sources || []);
        } catch (err) {
            console.error("Failed to fetch sources:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.sourceFile.trim() || !formData.content.trim()) {
            alert("Nama dokumen dan konten harus diisi!");
            return;
        }

        setSaving(true);

        try {
            const res = await fetch("/api/knowledge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sourceFile: formData.sourceFile.trim(),
                    content: formData.content,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert(`Berhasil! Dokumen disimpan dalam ${data.chunksCreated} chunks.`);
                resetForm();
                fetchSources();
            } else {
                alert("Gagal menyimpan: " + (data.error || "Unknown error"));
            }
        } catch (err) {
            alert("Gagal menyimpan dokumen");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (sourceFile: string) => {
        if (!confirm(`Yakin ingin menghapus dokumen "${sourceFile}"?`)) return;

        try {
            const res = await fetch(`/api/knowledge?sourceFile=${encodeURIComponent(sourceFile)}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("Dokumen berhasil dihapus!");
                fetchSources();
            } else {
                alert("Gagal menghapus dokumen");
            }
        } catch {
            alert("Gagal menghapus dokumen");
        }
    };

    const handleContentChange = (value: string) => {
        setFormData({ ...formData, content: value });
        setCharCount(value.length);
    };

    const resetForm = () => {
        setFormData({ sourceFile: "", content: "" });
        setCharCount(0);
        setShowForm(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/cms/dashboard" className="text-sm text-gray-600 hover:text-primary-600 mb-2 inline-block">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Kelola Knowledge Base (Minral AI)</h1>
                            <p className="text-sm text-gray-500 mt-1">Upload dokumen untuk melatih Minral menjawab pertanyaan</p>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            {showForm ? "Tutup Form" : "+ Tambah Dokumen"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-2">Tambah Dokumen Baru</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Copy-paste isi dokumen PDF Anda di sini. Dokumen akan dipecah menjadi chunks dan disimpan untuk RAG.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Dokumen / Sumber *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.sourceFile}
                                    onChange={(e) => setFormData({ ...formData, sourceFile: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="contoh: filosofi-alfath.pdf atau panduan-mentoring.docx"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Isi Dokumen *
                                </label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                    rows={20}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                                    placeholder="Paste isi dokumen Anda di sini...

Tips:
- Copy semua teks dari PDF menggunakan Ctrl+A lalu Ctrl+C
- Atau gunakan tools seperti pdftotext.com untuk mengekstrak teks
- Dokumen panjang tidak masalah, akan dipecah otomatis menjadi chunks"
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-gray-500">
                                        Karakter: {charCount.toLocaleString()} | Estimasi chunks: ~{Math.ceil(charCount / 500)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {charCount > 100000 && (
                                            <span className="text-amber-600">⚠️ Dokumen sangat panjang, proses mungkin perlu waktu</span>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                                >
                                    {saving ? "Menyimpan..." : "Simpan Dokumen"}
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

                {/* Tips Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">💡 Tips Mengekstrak PDF</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Buka PDF di browser, tekan Ctrl+A untuk select all, lalu Ctrl+C untuk copy</li>
                        <li>• Atau gunakan <a href="https://www.pdftotext.com/" target="_blank" rel="noopener noreferrer" className="underline">pdftotext.com</a> untuk konversi online</li>
                        <li>• Untuk hasil terbaik, pastikan teks bersih dari header/footer yang berulang</li>
                    </ul>
                </div>

                {/* Knowledge List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Dokumen Tersimpan ({sources.length})
                        </h2>
                    </div>

                    {sources.length === 0 ? (
                        <div className="p-8 text-center text-gray-600">
                            <div className="text-4xl mb-3">📚</div>
                            <p>Belum ada dokumen. Klik "Tambah Dokumen" untuk menambahkan.</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Dokumen yang diupload akan membantu Minral menjawab pertanyaan berdasarkan pengetahuan tersebut.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {sources.map((source) => (
                                <div key={source} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <span className="text-primary-600 text-lg">📄</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{source}</p>
                                            <p className="text-xs text-gray-500">Tersimpan di knowledge base</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(source)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
