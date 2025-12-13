"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface Stats {
    total: number;
    published: number;
    drafts: number;
}

export default function CMSDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<Stats>({ total: 0, published: 0, drafts: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check auth
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");

        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }

        try {
            setUser(JSON.parse(userStr));
        } catch {
            router.push("/cms/login");
            return;
        }

        // Fetch stats
        fetchStats();
    }, [router]);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/news");
            const data = await res.json();
            const news = data.news || [];
            setStats({
                total: news.length,
                published: news.filter((n: any) => n.is_published).length,
                drafts: news.filter((n: any) => !n.is_published).length,
            });
        } catch (err) {
            console.error("Failed to fetch stats:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("cms_user");
        localStorage.removeItem("cms_token");
        router.push("/cms/login");
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
                            <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Selamat datang, {user?.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-sm text-gray-600 hover:text-[#055E5B]"
                            >
                                ← Ke Website
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Berita</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Published</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.published}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Drafts</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.drafts}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Kelola Konten</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link
                            href="/cms/kabar-tutorial"
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#055E5B] hover:bg-[#055E5B]/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-[#055E5B]/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#055E5B]/20 transition-colors">
                                <svg className="w-6 h-6 text-[#055E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#055E5B]">
                                    Kabar Tutorial
                                </h3>
                                <p className="text-sm text-gray-600">Kelola berita dan pengumuman</p>
                            </div>
                        </Link>

                        <Link
                            href="/cms/kabinet"
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#055E5B] hover:bg-[#055E5B]/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#055E5B]">
                                    Kabinet/Pengurus
                                </h3>
                                <p className="text-sm text-gray-600">Kelola struktur organisasi</p>
                            </div>
                        </Link>

                        <Link
                            href="/cms/kalender"
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#055E5B] hover:bg-[#055E5B]/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#055E5B]">
                                    Kalender Kegiatan
                                </h3>
                                <p className="text-sm text-gray-600">Kelola jadwal dan event</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
