"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";

export default function PanitiaDelegasiPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const CORRECT_PASSWORD = "delegasi-spai-26";

    useEffect(() => {
        // Check if already authenticated
        const auth = sessionStorage.getItem("panitia-delegasi-auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            sessionStorage.setItem("panitia-delegasi-auth", "true");
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Password salah. Silakan coba lagi.");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6 text-white text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold">Panitia Delegasi</h1>
                            <p className="text-primary-100 mt-2 text-sm">Halaman ini memerlukan password untuk mengakses</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                    placeholder="Masukkan password"
                                    autoFocus
                                />
                                {error && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {error}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Masuk
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-neutral-500 text-sm mt-6">
                        Tutorial SPAI UPI — Kabinet AL-FATH
                    </p>
                </div>
            </div>
        );
    }

    // Authenticated Content
    return (
        <div>
            <Hero
                title="Panitia Delegasi"
                subtitle="Tutorial SPAI — Kabinet AL-FATH"
                height="normal"
                variant="gradient"
            />

            <section className="section-academic">
                <div className="container-upi max-w-6xl">
                    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                            Selamat Datang, Panitia Delegasi!
                        </h2>

                        <p className="text-neutral-600 mb-8 leading-relaxed">
                            Halaman ini berisi informasi khusus untuk panitia delegasi Tutorial SPAI.
                            Silakan akses materi dan informasi yang diperlukan di bawah ini.
                        </p>

                        {/* Content Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">Panduan Delegasi</h3>
                                <p className="text-sm text-neutral-600">Panduan lengkap untuk panitia delegasi Tutorial SPAI</p>
                            </div>

                            <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100">
                                <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center text-white mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">Jadwal Kegiatan</h3>
                                <p className="text-sm text-neutral-600">Timeline dan jadwal kegiatan delegasi</p>
                            </div>

                            <div className="bg-accent-50 rounded-xl p-6 border border-accent-200">
                                <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center text-white mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">Daftar Delegasi</h3>
                                <p className="text-sm text-neutral-600">Data lengkap peserta delegasi per fakultas</p>
                            </div>

                            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                                <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center text-white mb-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">FAQ Panitia</h3>
                                <p className="text-sm text-neutral-600">Pertanyaan yang sering ditanyakan</p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="mt-8 pt-6 border-t border-neutral-200">
                            <button
                                onClick={() => {
                                    sessionStorage.removeItem("panitia-delegasi-auth");
                                    setIsAuthenticated(false);
                                    setPassword("");
                                }}
                                className="text-sm text-neutral-500 hover:text-primary-600 transition-colors"
                            >
                                Keluar dari halaman ini
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
