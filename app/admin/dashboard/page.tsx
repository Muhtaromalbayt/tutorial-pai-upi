"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check authentication
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/auth/session");
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                router.push("/admin/login");
            }
        } catch (error) {
            router.push("/admin/login");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-neutral-600">Memuat...</p>
                </div>
            </div>
        );
    }

    const menuItems = [
        {
            title: "Kalender & Events",
            description: "Kelola kalender kegiatan dan event",
            href: "/admin/calendar",
            icon: "📅",
            color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
            title: "Kuliah Dhuha",
            description: "Atur jadwal dan materi Kuliah Dhuha",
            href: "/admin/kuliah-dhuha",
            icon: "🕌",
            color: "bg-green-50 text-green-600 border-green-200"
        },
        {
            title: "Seminar PAI",
            description: "Kelola jadwal seminar",
            href: "/admin/seminar",
            icon: "🎓",
            color: "bg-purple-50 text-purple-600 border-purple-200"
        },
        {
            title: "Mentoring",
            description: "Atur jadwal mentoring",
            href: "/admin/mentoring",
            icon: "👥",
            color: "bg-yellow-50 text-yellow-600 border-yellow-200"
        },
        {
            title: "Bina Kader",
            description: "Kelola jadwal Bina Kader",
            href: "/admin/bina-kader",
            icon: "🎯",
            color: "bg-orange-50 text-orange-600 border-orange-200"
        },
        {
            title: "Berita & Pengumuman",
            description: "Tambah dan edit berita",
            href: "/admin/news",
            icon: "📰",
            color: "bg-red-50 text-red-600 border-red-200"
        },
        {
            title: "Kabinet & Pengurus",
            description: "Kelola data pengurus",
            href: "/admin/cabinet",
            icon: "👤",
            color: "bg-indigo-50 text-indigo-600 border-indigo-200"
        },
    ];

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
                            <p className="text-sm text-neutral-600 mt-1">
                                Selamat datang, {user?.name || "Admin"}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/"
                                className="px-4 py-2 text-sm text-neutral-700 hover:text-primary-600 transition-colors"
                            >
                                Lihat Website
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                        Manajemen Konten
                    </h2>
                    <p className="text-neutral-600">
                        Pilih menu di bawah untuk mengelola konten website
                    </p>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block p-6 bg-white rounded-xl border-2 border-neutral-200 hover:border-primary-500 hover:shadow-lg transition-all group"
                        >
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${item.color} border-2`}>
                                <span className="text-2xl">{item.icon}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-neutral-600">
                                {item.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-12">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                        Statistik Cepat
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-xl border border-neutral-200">
                            <p className="text-sm text-neutral-600 mb-1">Total Events</p>
                            <p className="text-3xl font-bold text-primary-600">-</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-neutral-200">
                            <p className="text-sm text-neutral-600 mb-1">Jadwal Aktif</p>
                            <p className="text-3xl font-bold text-green-600">-</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-neutral-200">
                            <p className="text-sm text-neutral-600 mb-1">Berita Published</p>
                            <p className="text-3xl font-bold text-blue-600">-</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-neutral-200">
                            <p className="text-sm text-neutral-600 mb-1">Total Pengurus</p>
                            <p className="text-3xl font-bold text-purple-600">-</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
