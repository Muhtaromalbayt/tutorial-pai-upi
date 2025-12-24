"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DashboardStats {
    news: number;
    drafts: number;
    members: number;
    events: number;
}

export default function CMSDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [stats, setStats] = useState<DashboardStats>({ news: 0, drafts: 0, members: 0, events: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Client-side auth check
        const userStr = localStorage.getItem("cms_user");
        const token = localStorage.getItem("cms_token");

        if (!userStr || !token) {
            router.push("/cms/login");
            return;
        }

        setUser(JSON.parse(userStr));
        fetchStats();
    }, [router]);

    const fetchStats = async () => {
        try {
            // Parallel fetch for all stats
            const [newsRes, cabinetRes, calendarRes] = await Promise.all([
                fetch("/api/news"),
                fetch("/api/cabinet"),
                fetch("/api/calendar")
            ]);

            const newsData = await newsRes.json() as { news?: { is_published: boolean }[] };
            const cabinetData = await cabinetRes.json() as { members?: unknown[] };
            const calendarData = await calendarRes.json() as { events?: unknown[] };

            const newsCount = (newsData.news || []).filter((n) => n.is_published).length;
            const draftsCount = (newsData.news || []).filter((n) => !n.is_published).length;
            const membersCount = (cabinetData.members || []).length;
            const eventsCount = (calendarData.events || []).length;

            setStats({
                news: newsCount,
                drafts: draftsCount,
                members: membersCount,
                events: eventsCount
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem("cms_user");
        localStorage.removeItem("cms_token");
        router.push("/cms/login");
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
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-[#055E5B]">CMS Tutorial PAI-SPAI</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                                title="Logout"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-600">Selamat datang kembali, {user?.name}!</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Berita Published</p>
                                <p className="text-3xl font-bold text-[#055E5B] mt-2">{stats.news}</p>
                            </div>
                            <div className="w-12 h-12 bg-[#055E5B]/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#055E5B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Pengurus</p>
                                <p className="text-3xl font-bold text-teal-600 mt-2">{stats.members}</p>
                            </div>
                            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Event</p>
                                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.events}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Draft Berita</p>
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
                            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-200 transition-colors">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                        <Link
                            href="/cms/kuliah-dhuha"
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#055E5B] hover:bg-[#055E5B]/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#055E5B]">
                                    Kuliah Dhuha
                                </h3>
                                <p className="text-sm text-gray-600">Kelola jadwal & pemateri</p>
                            </div>
                        </Link>

                        <Link
                            href="/cms/seminar-pai"
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#055E5B] hover:bg-[#055E5B]/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-rose-200 transition-colors">
                                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#055E5B]">
                                    Seminar PAI
                                </h3>
                                <p className="text-sm text-gray-600">Kelola jadwal & pemateri</p>
                            </div>
                        </Link>

                        <Link
                            href="/cms/panitia-delegasi"
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#055E5B] hover:bg-[#055E5B]/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-colors">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#055E5B]">
                                    Panitia Delegasi
                                </h3>
                                <p className="text-sm text-gray-600">Kelola tugas & anggota delegasi</p>
                            </div>
                        </Link>

                        <Link
                            href="/cms/galeri"
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#055E5B] hover:bg-[#055E5B]/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-pink-200 transition-colors">
                                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#055E5B]">
                                    Galeri Foto
                                </h3>
                                <p className="text-sm text-gray-600">Kelola foto & dokumentasi</p>
                            </div>
                        </Link>

                        <Link
                            href="/cms/pengaturan"
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#055E5B] hover:bg-[#055E5B]/5 transition-all group"
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-200 transition-colors">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#055E5B]">
                                    Pengaturan Situs
                                </h3>
                                <p className="text-sm text-gray-600">Edit hero & info situs</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
