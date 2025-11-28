"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to admin dashboard
                router.push("/admin/dashboard");
            } else {
                setError(data.error || "Login gagal. Periksa email dan password Anda.");
            }
        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center space-x-3 mb-4">
                        <div className="relative w-16 h-16">
                            <Image
                                src="/assets/logo/upi-logo.jpg"
                                alt="Logo UPI"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="relative w-16 h-16">
                            <Image
                                src="/assets/logo/tutorial-logo.png"
                                alt="Logo Tutorial"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-primary-100">Tutorial PAI–SPAI UPI</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                        Login Admin
                    </h2>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="admin@upi.edu"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Memproses..." : "Login"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-primary-600 hover:text-primary-700">
                            ← Kembali ke Website
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-primary-100 text-sm">
                    <p>Kabinet AL-FATH 2025/2026</p>
                    <p className="mt-1">Menumbuhkan Adab, Menggerakkan Peradaban</p>
                </div>
            </div>
        </div>
    );
}
