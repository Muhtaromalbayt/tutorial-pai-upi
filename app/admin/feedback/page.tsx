"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Attachment {
    type: string;
    name: string;
    data: string;
    mimeType: string;
    size: number;
}

interface Feedback {
    id: string;
    name?: string;
    email?: string;
    isAnonymous: boolean;
    category: string;
    subject: string;
    message: string;
    attachments?: string;
    status: string;
    adminNotes?: string;
    createdAt: string;
}

export default function AdminFeedbackPage() {
    const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [adminNotes, setAdminNotes] = useState("");

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await fetch("/api/feedback");
            const data = await response.json() as any;
            setFeedbackList(data.feedback || []);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch("/api/feedback", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status, adminNotes }),
            });

            if (response.ok) {
                alert("Status berhasil diupdate!");
                fetchFeedback();
                setSelectedFeedback(null);
            }
        } catch (error) {
            alert("Gagal mengupdate status");
        }
    };

    const deleteFeedback = async (id: string) => {
        if (!confirm("Yakin ingin menghapus feedback ini?")) return;

        try {
            const response = await fetch(`/api/feedback?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Feedback berhasil dihapus!");
                fetchFeedback();
                setSelectedFeedback(null);
            }
        } catch (error) {
            alert("Gagal menghapus feedback");
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'suggestion': return '💡';
            case 'complaint': return '⚠️';
            case 'praise': return '👏';
            case 'question': return '❓';
            default: return '📝';
        }
    };

    const filteredFeedback = filterStatus === "all"
        ? feedbackList
        : feedbackList.filter(f => f.status === filterStatus);

    const stats = {
        total: feedbackList.length,
        pending: feedbackList.filter(f => f.status === 'pending').length,
        reviewed: feedbackList.filter(f => f.status === 'reviewed').length,
        resolved: feedbackList.filter(f => f.status === 'resolved').length,
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
                                Kelola Kritik & Saran
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                        <div className="text-sm text-neutral-600">Total Feedback</div>
                        <div className="text-3xl font-bold text-neutral-900 mt-2">{stats.total}</div>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-200">
                        <div className="text-sm text-yellow-700">Pending</div>
                        <div className="text-3xl font-bold text-yellow-900 mt-2">{stats.pending}</div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-200">
                        <div className="text-sm text-blue-700">Reviewed</div>
                        <div className="text-3xl font-bold text-blue-900 mt-2">{stats.reviewed}</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-200">
                        <div className="text-sm text-green-700">Resolved</div>
                        <div className="text-3xl font-bold text-green-900 mt-2">{stats.resolved}</div>
                    </div>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "all" ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                        >
                            Semua ({stats.total})
                        </button>
                        <button
                            onClick={() => setFilterStatus("pending")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "pending" ? 'bg-yellow-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                        >
                            Pending ({stats.pending})
                        </button>
                        <button
                            onClick={() => setFilterStatus("reviewed")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "reviewed" ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                        >
                            Reviewed ({stats.reviewed})
                        </button>
                        <button
                            onClick={() => setFilterStatus("resolved")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === "resolved" ? 'bg-green-600 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                        >
                            Resolved ({stats.resolved})
                        </button>
                    </div>
                </div>

                {/* Feedback List */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-neutral-600">Memuat feedback...</p>
                        </div>
                    ) : filteredFeedback.length === 0 ? (
                        <div className="p-8 text-center text-neutral-600">
                            Belum ada feedback.
                        </div>
                    ) : (
                        <div className="divide-y divide-neutral-200">
                            {filteredFeedback.map((feedback) => (
                                <div
                                    key={feedback.id}
                                    className="p-6 hover:bg-neutral-50 cursor-pointer transition-colors"
                                    onClick={() => {
                                        setSelectedFeedback(feedback);
                                        setAdminNotes(feedback.adminNotes || "");
                                    }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-2xl">{getCategoryIcon(feedback.category)}</span>
                                                <h3 className="font-semibold text-neutral-900">{feedback.subject}</h3>
                                                {feedback.isAnonymous && (
                                                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">Anonim</span>
                                                )}
                                            </div>
                                            <p className="text-sm text-neutral-600 line-clamp-2">{feedback.message}</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
                                                {!feedback.isAnonymous && feedback.name && (
                                                    <span>👤 {feedback.name}</span>
                                                )}
                                                <span>📅 {new Date(feedback.createdAt).toLocaleDateString('id-ID')}</span>
                                                {feedback.attachments && (
                                                    <span>📎 {JSON.parse(feedback.attachments).length} lampiran</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${feedback.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    feedback.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-green-100 text-green-800'
                                                }`}>
                                                {feedback.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Detail Modal */}
            {selectedFeedback && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white">
                            <h2 className="text-xl font-bold text-neutral-900">Detail Feedback</h2>
                            <button
                                onClick={() => setSelectedFeedback(null)}
                                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Info */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-3xl">{getCategoryIcon(selectedFeedback.category)}</span>
                                    <div>
                                        <h3 className="font-bold text-lg text-neutral-900">{selectedFeedback.subject}</h3>
                                        <p className="text-sm text-neutral-600 capitalize">{selectedFeedback.category}</p>
                                    </div>
                                </div>

                                {!selectedFeedback.isAnonymous && (
                                    <div className="bg-neutral-50 p-4 rounded-lg space-y-2">
                                        <div><span className="font-medium">Nama:</span> {selectedFeedback.name}</div>
                                        <div><span className="font-medium">Email:</span> {selectedFeedback.email}</div>
                                    </div>
                                )}

                                <div className="mt-4">
                                    <div className="font-medium mb-2">Pesan:</div>
                                    <p className="text-neutral-700 whitespace-pre-wrap">{selectedFeedback.message}</p>
                                </div>
                            </div>

                            {/* Attachments */}
                            {selectedFeedback.attachments && (
                                <div>
                                    <div className="font-medium mb-3">Lampiran:</div>
                                    <div className="space-y-2">
                                        {JSON.parse(selectedFeedback.attachments).map((att: Attachment, index: number) => (
                                            <div key={index} className="p-3 bg-neutral-50 rounded-lg flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">
                                                        {att.type === 'image' && '🖼️'}
                                                        {att.type === 'video' && '🎥'}
                                                        {att.type === 'pdf' && '📄'}
                                                        {att.type === 'audio' && '🎤'}
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-medium">{att.name}</p>
                                                        <p className="text-xs text-neutral-500">{(att.size / 1024).toFixed(1)} KB</p>
                                                    </div>
                                                </div>
                                                <a
                                                    href={att.data}
                                                    download={att.name}
                                                    className="px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Admin Notes */}
                            <div>
                                <label className="block font-medium mb-2">Catatan Admin:</label>
                                <textarea
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    placeholder="Tambahkan catatan internal..."
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => updateStatus(selectedFeedback.id, 'reviewed')}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Mark as Reviewed
                                </button>
                                <button
                                    onClick={() => updateStatus(selectedFeedback.id, 'resolved')}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Mark as Resolved
                                </button>
                                <button
                                    onClick={() => deleteFeedback(selectedFeedback.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
