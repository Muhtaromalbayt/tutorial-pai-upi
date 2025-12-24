"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";

// ===========================================
// KONFIGURASI DASAR
// ===========================================

type DayType = "rabu" | "jumat";

const PASSWORDS: Record<DayType, string> = {
    rabu: "spai-rabu",
    jumat: "spai-jumat",
};

const FAKULTAS: Record<DayType, string> = {
    rabu: "FPIPS & FPSD",
    jumat: "FIP, FK & FPEB",
};

// Role definitions with expected counts
const ROLE_CONFIG = [
    { role: "Penyaji", isRotating: true, ikhwan: 2, akhwat: 1, total: "3 orang" },
    { role: "MC", isRotating: true, ikhwan: 1, akhwat: 0, total: "1 ikhwan" },
    { role: "Operator", isRotating: false, ikhwan: 1, akhwat: 1, total: "1 ikhwan, 1 akhwat" },
    { role: "Notulensi", isRotating: false, ikhwan: 1, akhwat: 1, total: "1 ikhwan, 1 akhwat" },
    { role: "Time Keeper", isRotating: false, ikhwan: 1, akhwat: 1, total: "1 ikhwan, 1 akhwat" },
    { role: "Logistik", isRotating: false, ikhwan: 3, akhwat: 3, total: "3 ikhwan, 3 akhwat" },
    { role: "Keamanan", isRotating: false, ikhwan: 3, akhwat: 3, total: "3 ikhwan, 3 akhwat" },
    { role: "Dokumentasi", isRotating: false, ikhwan: 1, akhwat: 1, total: "1 ikhwan, 1 akhwat" },
];

const RUNDOWN = [
    { time: "15.30 - 15.35", activity: "Pembukaan & Tilawah Al-Quran", pic: "MC" },
    { time: "15.35 - 15.40", activity: "Menyanyikan Lagu Indonesia Raya & Mars UPI", pic: "MC" },
    { time: "15.40 - 15.45", activity: "Sambutan Ketua Pelaksana", pic: "MC" },
    { time: "15.45 - 16.30", activity: "Penyampaian Materi oleh Penyaji", pic: "Penyaji 1, 2, 3" },
    { time: "16.30 - 16.35", activity: "Ice Breaking", pic: "MC" },
    { time: "16.35 - 17.00", activity: "Diskusi & Tanya Jawab", pic: "Fasilitator" },
    { time: "17.00 - 17.15", activity: "Tanggapan & Penguatan Dosen Fasilitator", pic: "Fasilitator" },
    { time: "17.15 - 17.25", activity: "Kesimpulan & Refleksi", pic: "Notulensi" },
    { time: "17.25 - 17.30", activity: "Doa & Penutup", pic: "MC" },
];

// Placeholder contacts - akan diganti dari CMS nanti
const CONTACTS: Record<DayType, Array<{ name: string; role: string; phone: string }>> = {
    rabu: [
        { name: "Nama PJ Rabu 1", role: "Koordinator Delegasi Rabu", phone: "62812xxxxxxxx" },
        { name: "Nama PJ Rabu 2", role: "Wakil Koordinator", phone: "62812xxxxxxxx" },
    ],
    jumat: [
        { name: "Nama PJ Jumat 1", role: "Koordinator Delegasi Jumat", phone: "62812xxxxxxxx" },
        { name: "Nama PJ Jumat 2", role: "Wakil Koordinator", phone: "62812xxxxxxxx" },
    ],
};

const CANVA_LINKS: Record<DayType, string> = {
    rabu: "",
    jumat: "",
};

// ===========================================
// TYPES
// ===========================================

interface DBMember {
    id: string;
    dayType: string;
    role: string;
    weekNumber: number | null;
    name: string;
    gender: string;
    phone: string | null;
}

// ===========================================
// MAIN COMPONENT
// ===========================================

export default function PanitiaDelegasiPage() {
    const [authenticatedDay, setAuthenticatedDay] = useState<DayType | null>(null);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"tugas" | "rundown" | "layout" | "contact" | "diskusi">("tugas");
    const [chatMessages, setChatMessages] = useState<Array<{ name: string; message: string; time: string }>>([]);
    const [newMessage, setNewMessage] = useState("");
    const [userName, setUserName] = useState("");

    // Database members
    const [dbMembers, setDbMembers] = useState<DBMember[]>([]);
    const [membersLoading, setMembersLoading] = useState(false);
    const [expandedRole, setExpandedRole] = useState<string | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<number>(2); // Default to week 2

    useEffect(() => {
        const authDay = sessionStorage.getItem("panitia-delegasi-day") as DayType | null;
        if (authDay && (authDay === "rabu" || authDay === "jumat")) {
            setAuthenticatedDay(authDay);
            fetchMembers(authDay);
        }
        setIsLoading(false);
    }, []);

    const fetchMembers = async (day: DayType) => {
        setMembersLoading(true);
        try {
            const res = await fetch(`/api/panitia-delegasi?day=${day}`);
            const data = await res.json() as { members?: DBMember[] };
            setDbMembers(data.members || []);
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setMembersLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === PASSWORDS.rabu) {
            sessionStorage.setItem("panitia-delegasi-day", "rabu");
            setAuthenticatedDay("rabu");
            setError("");
            fetchMembers("rabu");
        } else if (password === PASSWORDS.jumat) {
            sessionStorage.setItem("panitia-delegasi-day", "jumat");
            setAuthenticatedDay("jumat");
            setError("");
            fetchMembers("jumat");
        } else {
            setError("Password salah. Silakan coba lagi.");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("panitia-delegasi-day");
        setAuthenticatedDay(null);
        setPassword("");
        setDbMembers([]);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && userName.trim()) {
            const now = new Date();
            setChatMessages([
                ...chatMessages,
                {
                    name: userName,
                    message: newMessage,
                    time: `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`,
                },
            ]);
            setNewMessage("");
        }
    };

    // Get members for a specific role (considering rotating roles)
    const getMembersForRole = (role: string, isRotating: boolean) => {
        if (isRotating) {
            return dbMembers.filter(m => m.role === role && m.weekNumber === selectedWeek);
        }
        return dbMembers.filter(m => m.role === role);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    // Login Form
    if (!authenticatedDay) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6 text-white text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold">Panitia Delegasi</h1>
                            <p className="text-primary-100 mt-2 text-sm">Halaman ini memerlukan password untuk mengakses</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="mb-4 p-4 bg-neutral-50 rounded-lg text-sm text-neutral-600">
                                <p className="font-medium mb-2">🔐 Password berdasarkan hari:</p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li><span className="text-blue-600 font-medium">Rabu</span> — FPIPS & FPSD</li>
                                    <li><span className="text-emerald-600 font-medium">Jumat</span> — FIP, FK & FPEB</li>
                                </ul>
                            </div>
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
    const dayColor = authenticatedDay === "rabu" ? "blue" : "emerald";
    const dayName = authenticatedDay === "rabu" ? "Rabu" : "Jumat";

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
            <Hero
                title={`Panitia Delegasi — ${dayName}`}
                subtitle={`Tutorial SPAI — ${FAKULTAS[authenticatedDay]}`}
                height="normal"
                variant="gradient"
            />

            <section className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Day Badge & Logout */}
                    <div className="flex items-center justify-between mb-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${dayColor === "blue"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}>
                            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                            {dayName} — {FAKULTAS[authenticatedDay]}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-neutral-500 hover:text-red-600 transition-colors flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Keluar
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 mb-6 overflow-hidden">
                        <div className="flex overflow-x-auto">
                            {[
                                { id: "tugas", label: "📋 Pembagian Tugas" },
                                { id: "rundown", label: "⏱️ Rundown" },
                                { id: "layout", label: "🗺️ Layout" },
                                { id: "contact", label: "📞 Contact Person" },
                                { id: "diskusi", label: "💬 Ruang Diskusi" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                    className={`flex-1 min-w-[140px] px-4 py-4 text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                            ? dayColor === "blue"
                                                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
                                                : "bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500"
                                            : "text-neutral-500 hover:bg-neutral-50"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 md:p-8">
                        {/* Pembagian Tugas - with clickable cards */}
                        {activeTab === "tugas" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                                        <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${dayColor === "blue" ? "bg-blue-100" : "bg-emerald-100"
                                            }`}>
                                            📋
                                        </span>
                                        Pembagian Tugas Panitia
                                    </h2>
                                    {/* Week selector for rotating roles */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-neutral-500">Pekan:</span>
                                        <select
                                            value={selectedWeek}
                                            onChange={(e) => setSelectedWeek(Number(e.target.value))}
                                            className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${dayColor === "blue"
                                                    ? "border-blue-200 text-blue-700 bg-blue-50"
                                                    : "border-emerald-200 text-emerald-700 bg-emerald-50"
                                                }`}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(w => (
                                                <option key={w} value={w}>Pekan {w}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {membersLoading ? (
                                    <div className="flex justify-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {ROLE_CONFIG.map((config) => {
                                            const members = getMembersForRole(config.role, config.isRotating);
                                            const isExpanded = expandedRole === config.role;

                                            return (
                                                <div
                                                    key={config.role}
                                                    className={`rounded-xl border transition-all cursor-pointer ${dayColor === "blue"
                                                            ? "bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:border-blue-300"
                                                            : "bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:border-emerald-300"
                                                        } ${isExpanded ? "ring-2 " + (dayColor === "blue" ? "ring-blue-400" : "ring-emerald-400") : ""}`}
                                                    onClick={() => setExpandedRole(isExpanded ? null : config.role)}
                                                >
                                                    <div className="p-5">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h3 className="font-semibold text-neutral-900">{config.role}</h3>
                                                            {config.isRotating && (
                                                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                                                    Per Pekan
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className={`text-sm ${dayColor === "blue" ? "text-blue-600" : "text-emerald-600"}`}>
                                                            {config.total}
                                                        </p>
                                                        <div className="mt-3 flex gap-2">
                                                            {config.ikhwan > 0 && (
                                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                                                                    👨 {config.ikhwan}
                                                                </span>
                                                            )}
                                                            {config.akhwat > 0 && (
                                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-700">
                                                                    👩 {config.akhwat}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Expand indicator */}
                                                        <div className={`mt-3 pt-3 border-t flex items-center justify-between text-xs ${dayColor === "blue" ? "border-blue-100 text-blue-600" : "border-emerald-100 text-emerald-600"
                                                            }`}>
                                                            <span>{members.length} anggota terdaftar</span>
                                                            <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>

                                                    {/* Expanded member list */}
                                                    {isExpanded && (
                                                        <div className={`border-t px-5 py-4 ${dayColor === "blue" ? "border-blue-100 bg-blue-50/50" : "border-emerald-100 bg-emerald-50/50"
                                                            }`}>
                                                            {members.length === 0 ? (
                                                                <p className="text-sm text-neutral-400 italic text-center py-2">
                                                                    Belum ada anggota {config.isRotating ? `untuk Pekan ${selectedWeek}` : ""}
                                                                </p>
                                                            ) : (
                                                                <ul className="space-y-2">
                                                                    {members.map((member, idx) => (
                                                                        <li key={member.id} className="flex items-center gap-2 text-sm">
                                                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${member.gender === "akhwat" ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
                                                                                }`}>
                                                                                {idx + 1}
                                                                            </span>
                                                                            <span className="font-medium text-neutral-800">{member.name}</span>
                                                                            {member.phone && (
                                                                                <a
                                                                                    href={`https://wa.me/${member.phone}`}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="ml-auto text-green-600 hover:text-green-700"
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                >
                                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                                                    </svg>
                                                                                </a>
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Summary */}
                                <div className={`mt-6 p-4 rounded-xl ${dayColor === "blue" ? "bg-blue-50" : "bg-emerald-50"
                                    }`}>
                                    <p className="text-sm text-neutral-600">
                                        <strong>Total Panitia:</strong>{" "}
                                        {ROLE_CONFIG.reduce((acc, t) => acc + t.ikhwan + t.akhwat, 0)} orang per pekan
                                        ({ROLE_CONFIG.reduce((acc, t) => acc + t.ikhwan, 0)} ikhwan,{" "}
                                        {ROLE_CONFIG.reduce((acc, t) => acc + t.akhwat, 0)} akhwat)
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Rundown */}
                        {activeTab === "rundown" && (
                            <div>
                                <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${dayColor === "blue" ? "bg-blue-100" : "bg-emerald-100"
                                        }`}>
                                        ⏱️
                                    </span>
                                    Rundown Kegiatan
                                </h2>

                                <div className="relative">
                                    <div className={`absolute left-[72px] top-0 bottom-0 w-0.5 ${dayColor === "blue" ? "bg-blue-200" : "bg-emerald-200"
                                        }`}></div>

                                    <div className="space-y-4">
                                        {RUNDOWN.map((item, index) => (
                                            <div key={index} className="flex gap-4 relative">
                                                <div className={`w-[145px] flex-shrink-0 text-right pr-4 py-3 text-sm font-mono font-medium ${dayColor === "blue" ? "text-blue-600" : "text-emerald-600"
                                                    }`}>
                                                    {item.time}
                                                </div>
                                                <div className={`absolute left-[68px] top-4 w-3 h-3 rounded-full border-2 ${dayColor === "blue"
                                                        ? "bg-blue-500 border-blue-200"
                                                        : "bg-emerald-500 border-emerald-200"
                                                    }`}></div>
                                                <div className={`flex-1 rounded-xl p-4 border transition-all hover:shadow-md ${dayColor === "blue"
                                                        ? "bg-gradient-to-r from-blue-50 to-white border-blue-100"
                                                        : "bg-gradient-to-r from-emerald-50 to-white border-emerald-100"
                                                    }`}>
                                                    <h4 className="font-medium text-neutral-900">{item.activity}</h4>
                                                    <p className="text-xs text-neutral-500 mt-1">PIC: {item.pic}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Layout */}
                        {activeTab === "layout" && (
                            <div>
                                <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${dayColor === "blue" ? "bg-blue-100" : "bg-emerald-100"
                                        }`}>
                                        🗺️
                                    </span>
                                    Layout Kegiatan
                                </h2>

                                {CANVA_LINKS[authenticatedDay] ? (
                                    <div className="aspect-video rounded-xl overflow-hidden border border-neutral-200">
                                        <iframe
                                            src={CANVA_LINKS[authenticatedDay]}
                                            className="w-full h-full"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className={`aspect-video rounded-xl flex flex-col items-center justify-center ${dayColor === "blue" ? "bg-blue-50" : "bg-emerald-50"
                                        }`}>
                                        <div className="text-6xl mb-4">🎨</div>
                                        <h3 className="text-lg font-semibold text-neutral-700 mb-2">Layout Belum Tersedia</h3>
                                        <p className="text-sm text-neutral-500 text-center max-w-md">
                                            Link Canva untuk layout kegiatan belum diatur.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Contact Person */}
                        {activeTab === "contact" && (
                            <div>
                                <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${dayColor === "blue" ? "bg-blue-100" : "bg-emerald-100"
                                        }`}>
                                        📞
                                    </span>
                                    Contact Person
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {CONTACTS[authenticatedDay].map((contact, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-xl p-6 border transition-all hover:shadow-md ${dayColor === "blue"
                                                    ? "bg-gradient-to-br from-blue-50 to-white border-blue-100"
                                                    : "bg-gradient-to-br from-emerald-50 to-white border-emerald-100"
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${dayColor === "blue" ? "bg-blue-100" : "bg-emerald-100"
                                                    }`}>
                                                    👤
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-neutral-900">{contact.name}</h3>
                                                    <p className="text-sm text-neutral-500">{contact.role}</p>
                                                    <a
                                                        href={`https://wa.me/${contact.phone}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${dayColor === "blue"
                                                                ? "bg-blue-600 hover:bg-blue-700"
                                                                : "bg-emerald-600 hover:bg-emerald-700"
                                                            }`}
                                                    >
                                                        WhatsApp
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <p className="text-sm text-amber-700 flex items-center gap-2">
                                        <span>⚠️</span>
                                        Data contact person placeholder. Hubungi admin untuk update.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Ruang Diskusi */}
                        {activeTab === "diskusi" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                                        <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${dayColor === "blue" ? "bg-blue-100" : "bg-emerald-100"
                                            }`}>
                                            💬
                                        </span>
                                        Ruang Diskusi
                                    </h2>
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                        🧪 Uji Coba
                                    </span>
                                </div>

                                <div className={`rounded-xl border overflow-hidden ${dayColor === "blue" ? "border-blue-200" : "border-emerald-200"
                                    }`}>
                                    <div className={`px-4 py-3 ${dayColor === "blue" ? "bg-blue-600" : "bg-emerald-600"
                                        } text-white`}>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                            <span className="font-medium">#{authenticatedDay}-delegasi</span>
                                        </div>
                                    </div>

                                    <div className={`h-80 overflow-y-auto p-4 space-y-3 ${dayColor === "blue" ? "bg-blue-50" : "bg-emerald-50"
                                        }`}>
                                        {chatMessages.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                                                <div className="text-4xl mb-2">💬</div>
                                                <p className="text-sm">Belum ada pesan. Mulai diskusi!</p>
                                            </div>
                                        ) : (
                                            chatMessages.map((msg, index) => (
                                                <div key={index} className="flex gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${dayColor === "blue" ? "bg-blue-200 text-blue-700" : "bg-emerald-200 text-emerald-700"
                                                        }`}>
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="font-semibold text-sm text-neutral-800">{msg.name}</span>
                                                            <span className="text-xs text-neutral-400">{msg.time}</span>
                                                        </div>
                                                        <p className="text-sm text-neutral-600 mt-0.5">{msg.message}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-neutral-100">
                                        {!userName && (
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    value={userName}
                                                    onChange={(e) => setUserName(e.target.value)}
                                                    placeholder="Masukkan nama kamu dulu..."
                                                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm"
                                                />
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder={userName ? "Ketik pesan..." : "Isi nama dulu di atas"}
                                                disabled={!userName}
                                                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg text-sm disabled:bg-neutral-100"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!userName || !newMessage.trim()}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50 ${dayColor === "blue"
                                                        ? "bg-blue-600 hover:bg-blue-700"
                                                        : "bg-emerald-600 hover:bg-emerald-700"
                                                    }`}
                                            >
                                                Kirim
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <p className="text-sm text-amber-700">
                                        <strong>⚠️ Catatan:</strong> Fitur ini masih dalam tahap uji coba. Pesan hanya tersimpan di browser Anda.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
