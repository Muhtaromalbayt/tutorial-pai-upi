"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface Attachment {
    type: 'image' | 'video' | 'pdf' | 'audio';
    name: string;
    data: string; // base64
    mimeType: string;
    size: number;
}

export default function KritikSaranPage() {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "suggestion",
        subject: "",
        message: "",
    });
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} terlalu besar. Maksimal 5MB`);
                continue;
            }

            // Determine type
            let type: Attachment['type'] = 'pdf';
            if (file.type.startsWith('image/')) type = 'image';
            else if (file.type.startsWith('video/')) type = 'video';
            else if (file.type.startsWith('audio/')) type = 'audio';

            // Convert to base64
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                setAttachments(prev => [...prev, {
                    type,
                    name: file.name,
                    data: base64,
                    mimeType: file.type,
                    size: file.size,
                }]);
            };
            reader.readAsDataURL(file);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target?.result as string;
                    setAttachments(prev => [...prev, {
                        type: 'audio',
                        name: `voice_note_${Date.now()}.webm`,
                        data: base64,
                        mimeType: 'audio/webm',
                        size: blob.size,
                    }]);
                };
                reader.readAsDataURL(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            alert("Gagal mengakses mikrofon. Pastikan izin mikrofon diberikan.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    isAnonymous,
                    attachments: attachments.length > 0 ? attachments : null,
                }),
            });

            if (response.ok) {
                setSuccess(true);
                
                // Format WhatsApp Message
                const waNumber = "6285165888607";
                let waMessage = `*Kritik & Saran Baru*\n\n`;
                waMessage += `*Kategori:* ${formData.category}\n`;
                waMessage += `*Subjek:* ${formData.subject}\n`;
                waMessage += `*Pesan:*\n${formData.message}\n\n`;
                
                if (!isAnonymous) {
                    waMessage += `*Dari:* ${formData.name} (${formData.email})`;
                } else {
                    waMessage += `*Dari:* Anonim`;
                }

                if (attachments.length > 0) {
                    waMessage += `\n\n(Pengirim menyertakan ${attachments.length} lampiran di website)`;
                }

                // Redirect to WhatsApp
                const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
                window.open(waUrl, '_blank');

                setFormData({ name: "", email: "", category: "suggestion", subject: "", message: "" });
                setAttachments([]);
                setTimeout(() => setSuccess(false), 5000);
            } else {
                alert("Gagal mengirim feedback. Silakan coba lagi.");
            }
        } catch (error) {
            alert("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-neutral-900 mb-3">Kritik & Saran</h1>
                    <p className="text-neutral-600">
                        Sampaikan kritik, saran, atau pertanyaan Anda untuk membantu kami berkembang lebih baik
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 animate-fadeIn">
                        ✓ Terima kasih! Feedback Anda telah berhasil dikirim.
                    </div>
                )}

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Anonymous Toggle */}
                        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                            <div>
                                <label className="font-medium text-neutral-900">Kirim Anonim</label>
                                <p className="text-sm text-neutral-600">Identitas Anda tidak akan ditampilkan</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAnonymous(!isAnonymous)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnonymous ? 'bg-primary-600' : 'bg-neutral-300'
                                    }`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>

                        {/* Identity Fields */}
                        {!isAnonymous && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Nama Lengkap*
                                    </label>
                                    <input
                                        type="text"
                                        required={!isAnonymous}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Nama Anda"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        required={!isAnonymous}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Kategori*
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="suggestion">💡 Saran</option>
                                <option value="complaint">⚠️ Keluhan</option>
                                <option value="praise">👏 Apresiasi</option>
                                <option value="question">❓ Pertanyaan</option>
                                <option value="other">📝 Lainnya</option>
                            </select>
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Subjek*
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Judul singkat feedback Anda"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Pesan*
                            </label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={6}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Sampaikan kritik, saran, atau pertanyaan Anda secara detail..."
                            />
                        </div>

                        {/* Attachments */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Lampiran (Opsional)
                            </label>
                            <div className="space-y-3">
                                {/* File Upload Button */}
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                        Upload File
                                    </button>

                                    {/* Voice Recording Button */}
                                    <button
                                        type="button"
                                        onClick={isRecording ? stopRecording : startRecording}
                                        className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isRecording
                                                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                                                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                            }`}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                        </svg>
                                        {isRecording ? 'Stop Recording' : 'Rekam Suara'}
                                    </button>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*,video/*,.pdf,audio/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />

                                {/* Attachments List */}
                                {attachments.length > 0 && (
                                    <div className="space-y-2">
                                        {attachments.map((att, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">
                                                        {att.type === 'image' && '🖼️'}
                                                        {att.type === 'video' && '🎥'}
                                                        {att.type === 'pdf' && '📄'}
                                                        {att.type === 'audio' && '🎤'}
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-medium text-neutral-900">{att.name}</p>
                                                        <p className="text-xs text-neutral-500">{(att.size / 1024).toFixed(1)} KB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAttachment(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p className="text-xs text-neutral-500">
                                    Maksimal 5MB per file. Format: Gambar, Video, PDF, atau Audio
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Mengirim..." : "Kirim Feedback"}
                        </button>
                    </form>
                </div>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
