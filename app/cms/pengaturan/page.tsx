"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Settings {
    site_title: string;
    site_description: string;
    hero_title: string;
    hero_subtitle: string;
    hero_image_url: string;
    contact_email: string;
    contact_phone: string;
    instagram_url: string;
}

export default function PengaturanCMSPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<Settings>({
        site_title: "",
        site_description: "",
        hero_title: "",
        hero_subtitle: "",
        hero_image_url: "",
        contact_email: "",
        contact_phone: "",
        instagram_url: "",
    });

    useEffect(() => {
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");
        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }
        fetchSettings();
    }, [router]);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            if (data.settings) {
                setSettings((prev) => ({ ...prev, ...data.settings }));
            }
        } catch (err) {
            console.error("Failed to fetch settings:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                alert("Pengaturan berhasil disimpan!");
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

    const handleChange = (key: keyof Settings, value: string) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
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
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/cms/dashboard" className="text-sm text-gray-600 hover:text-[#055E5B] mb-2 inline-block">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">Pengaturan Situs</h1>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={saving}
                            className="px-6 py-2 bg-[#055E5B] text-white rounded-lg hover:bg-[#044947] transition-colors disabled:opacity-50 flex items-center"
                        >
                            {saving ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Settings */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Informasi Umum</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Situs</label>
                                <input
                                    type="text"
                                    value={settings.site_title}
                                    onChange={(e) => handleChange("site_title", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="Tutorial PAI-SPAI UPI"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Situs</label>
                                <textarea
                                    value={settings.site_description}
                                    onChange={(e) => handleChange("site_description", e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="Unit Kegiatan Mahasiswa..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Hero Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Halaman Depan (Hero Section)</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Hero</label>
                                <input
                                    type="text"
                                    value={settings.hero_title}
                                    onChange={(e) => handleChange("hero_title", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="Selamat Datang..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sub-judul Hero</label>
                                <textarea
                                    value={settings.hero_subtitle}
                                    onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="Motto atau tagline..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar Background</label>
                                <input
                                    type="text"
                                    value={settings.hero_image_url}
                                    onChange={(e) => handleChange("hero_image_url", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                    placeholder="/assets/hero/hero-bg.jpg"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Preview: {settings.hero_image_url && (
                                        <img src={settings.hero_image_url} alt="Preview" className="h-20 mt-2 rounded object-cover" />
                                    )}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Kontak & Sosmed</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Kontak</label>
                                <input
                                    type="email"
                                    value={settings.contact_email}
                                    onChange={(e) => handleChange("contact_email", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon / WA</label>
                                <input
                                    type="text"
                                    value={settings.contact_phone}
                                    onChange={(e) => handleChange("contact_phone", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                                <input
                                    type="text"
                                    value={settings.instagram_url}
                                    onChange={(e) => handleChange("instagram_url", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#055E5B] focus:border-[#055E5B]"
                                />
                            </div>
                        </div>
                    </section>
                </form>
            </main>
        </div>
    );
}
