"use client";

import Hero from "@/components/Hero";
import Link from "next/link";
import { useState } from "react";

// Quick links for Peserta
const pesertaLinks = [
    {
        title: "DATA PESERTA",
        subtitle: "Cek Data & Kelompok",
        url: "#", // Placeholder - will be updated
        color: "from-emerald-500 to-emerald-600",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        )
    },
    {
        title: "SIPRES TUTORIAL",
        subtitle: "QR Presensi & Izin",
        url: "#", // Placeholder - will be updated
        color: "from-amber-400 to-amber-500",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        )
    },
    {
        title: "MATERI",
        subtitle: "Download Materi",
        url: "#", // Placeholder - will be updated
        color: "from-sky-500 to-sky-600",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    },
];

// Quick links for Mentor
const mentorLinks = [
    {
        title: "DATA MENTOR",
        subtitle: "Lihat Data Mentor",
        url: "#", // Placeholder - will be updated
        color: "from-purple-500 to-purple-600",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )
    },
    {
        title: "SIPRES TUTORIAL",
        subtitle: "QR Presensi Mentor",
        url: "#", // Placeholder - will be updated
        color: "from-amber-400 to-amber-500",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        )
    },
    {
        title: "PANDUAN MENTOR",
        subtitle: "Buku Pedoman",
        url: "#", // Placeholder - will be updated
        color: "from-red-500 to-red-600",
        icon: (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )
    },
];

const contactPersons = [
    { name: "CP Ikhwan", phone: "+6281234567890", gender: "male" }, // Placeholder
    { name: "CP Akhwat", phone: "+6281234567891", gender: "female" }, // Placeholder
];

export default function MentoringPage() {
    const [activeTab, setActiveTab] = useState<"peserta" | "mentor">("peserta");

    return (
        <div className="bg-neutral-50 min-h-screen">
            <Hero
                title="Mentoring"
                subtitle="Pendampingan intensif dalam kelompok kecil untuk pembinaan karakter"
                variant="default"
                backgroundImage="/assets/mentoring-hero.jpg"
            />

            {/* Tab Navigation */}
            <section className="bg-white border-b border-neutral-200 sticky top-0 z-20 shadow-sm">
                <div className="container-upi max-w-4xl">
                    <div className="flex justify-center">
                        <button
                            onClick={() => setActiveTab("peserta")}
                            className={`px-8 py-4 font-semibold text-lg transition-all border-b-4 ${activeTab === "peserta"
                                    ? "border-primary-600 text-primary-700 bg-primary-50/50"
                                    : "border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                                }`}
                        >
                            👤 Untuk Peserta
                        </button>
                        <button
                            onClick={() => setActiveTab("mentor")}
                            className={`px-8 py-4 font-semibold text-lg transition-all border-b-4 ${activeTab === "mentor"
                                    ? "border-ocean-600 text-ocean-700 bg-ocean-50/50"
                                    : "border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                                }`}
                        >
                            🎓 Untuk Mentor
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-ocean-100/50 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
                <div className="container-upi max-w-5xl relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-heading">
                            {activeTab === "peserta" ? "Akses Cepat Peserta" : "Akses Cepat Mentor"}
                        </h2>
                        <div className={`w-24 h-1.5 mx-auto rounded-full ${activeTab === "peserta" ? "bg-gradient-to-r from-primary-500 to-primary-600" : "bg-gradient-ocean"}`}></div>
                        <p className="mt-4 text-neutral-600">
                            {activeTab === "peserta"
                                ? "Pintasan penting untuk seluruh peserta Mentoring"
                                : "Pintasan penting untuk seluruh Mentor"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {(activeTab === "peserta" ? pesertaLinks : mentorLinks).map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                target={link.url.startsWith("http") ? "_blank" : undefined}
                                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${link.color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                    {link.icon}
                                </div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-4 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                        {link.icon}
                                    </div>
                                    <div className="font-bold text-white text-base md:text-lg uppercase tracking-wide leading-tight mb-2">
                                        {link.title}
                                    </div>
                                    <div className="text-xs md:text-sm text-white/90 font-medium bg-black/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                        {link.subtitle}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Person Section */}
            <section className="py-12 bg-white border-y border-neutral-100">
                <div className="container-upi max-w-4xl text-center">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-8 font-heading">Butuh Bantuan?</h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        {contactPersons.map((cp, i) => (
                            <Link
                                key={i}
                                href={`https://wa.me/${cp.phone.replace(/\+/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center p-2 pr-6 bg-neutral-50 hover:bg-green-50 rounded-full border border-neutral-200 hover:border-green-200 transition-all duration-300 hover:shadow-md"
                            >
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mr-4 shadow-md group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-sm text-neutral-500 font-medium">Hubungi via WhatsApp</div>
                                    <div className="font-bold text-neutral-900 group-hover:text-green-600 transition-colors">{cp.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Info Section */}
            <section className="py-16">
                <div className="container-upi max-w-6xl">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6 font-heading">
                            Tentang Program Mentoring
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                            <span className="font-semibold text-ocean-600">Mentoring</span> adalah program pendampingan intensif dalam kelompok kecil yang dipandu oleh mentor berpengalaman. Program ini bertujuan untuk membantu mahasiswa dalam pengembangan spiritual, akademik, dan karakter Islami.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card-academic p-8 text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-700">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">20 Kelompok</h3>
                            <p className="text-neutral-600">Mentoring Aktif</p>
                        </div>
                        <div className="card-academic p-8 text-center">
                            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary-700">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">10-12 Mentee</h3>
                            <p className="text-neutral-600">Per Kelompok</p>
                        </div>
                        <div className="card-academic p-8 text-center">
                            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 text-accent-700">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">1x Pekan</h3>
                            <p className="text-neutral-600">Pertemuan Rutin</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
