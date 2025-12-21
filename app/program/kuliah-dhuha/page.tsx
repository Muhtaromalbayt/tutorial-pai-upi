"use client";

import Hero from "@/components/Hero";
import { useMemo, useState } from "react";
import { ORGANIZATION_ACTIVITIES } from "@/lib/hijriah-calendar-data";

// Format date to Indonesian format
function formatDateIndonesian(dateStr: string): string {
    const date = new Date(dateStr);
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Get day name in Indonesian
function getDayName(dateStr: string): string {
    const date = new Date(dateStr);
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[date.getDay()];
}

export default function KuliahDhuhaPage() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    // Get Tutorial PAI activities and Pembukaan
    const weeklySchedule = useMemo(() => {
        const activities = ORGANIZATION_ACTIVITIES
            .filter(activity =>
                activity.category === "Tutorial PAI" ||
                activity.title.includes("Pembukaan")
            )
            .reduce((acc, activity) => {
                const existing = acc.find(a => a.date === activity.date);
                if (!existing) {
                    acc.push(activity);
                }
                return acc;
            }, [] as typeof ORGANIZATION_ACTIVITIES)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return activities.map((activity, index) => ({
            week: index + 1,
            date: formatDateIndonesian(activity.date),
            rawDate: activity.date,
            dayName: getDayName(activity.date),
            topic: activity.title,
            location: activity.location || "Aula ITC",
            time: activity.time || "08.45 - 13.00 WIB",
            category: activity.category,
            isPembukaan: activity.title.includes("Pembukaan")
        }));
    }, []);

    // Separate pembukaan from regular schedule
    const pembukaan = weeklySchedule.find(s => s.isPembukaan);
    const regularSchedule = weeklySchedule.filter(s => !s.isPembukaan);

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
            <Hero
                title="Kuliah Dhuha"
                subtitle="Program Tutorial PAI untuk memperdalam pemahaman keislaman mahasiswa UPI"
                variant="gradient"
            />

            {/* Main Content */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* About Section - Clean Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8 mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900">
                                Tentang Program
                            </h2>
                        </div>
                        <p className="text-neutral-600 leading-relaxed text-lg mb-8">
                            Tutorial PAI adalah program kajian rutin yang diselenggarakan setiap pekan.
                            Program ini bertujuan untuk meningkatkan pemahaman keislaman mahasiswa dengan
                            materi yang relevan, inspiratif, dan aplikatif.
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-primary-50 rounded-xl">
                                <div className="text-3xl font-bold text-primary-600 mb-1">8</div>
                                <div className="text-sm text-neutral-600">Pekan</div>
                            </div>
                            <div className="text-center p-4 bg-secondary-50 rounded-xl">
                                <div className="text-3xl font-bold text-secondary-600 mb-1">4+</div>
                                <div className="text-sm text-neutral-600">Jam/Pekan</div>
                            </div>
                            <div className="text-center p-4 bg-accent-50 rounded-xl">
                                <div className="text-3xl font-bold text-accent-600 mb-1">200+</div>
                                <div className="text-sm text-neutral-600">Peserta</div>
                            </div>
                        </div>
                    </div>

                    {/* Pembukaan Highlight */}
                    {pembukaan && (
                        <div className="mb-12">
                            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                        🎉 Pembukaan
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{pembukaan.topic}</h3>
                                <div className="flex flex-wrap gap-6 mt-4 text-white/90">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{pembukaan.dayName}, {pembukaan.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <span>{pembukaan.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Weekly Schedule - Timeline Style */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900">
                                Jadwal Tutorial PAI
                            </h2>
                        </div>

                        {/* Schedule Grid - Clean Cards */}
                        <div className="grid gap-4">
                            {regularSchedule.map((schedule, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                                >
                                    <div
                                        className="p-5 cursor-pointer"
                                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Week Number Badge */}
                                            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex flex-col items-center justify-center text-white shadow-md">
                                                <span className="text-xs font-medium opacity-80">Pekan</span>
                                                <span className="text-xl font-bold">{schedule.week}</span>
                                            </div>

                                            {/* Main Content */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-neutral-900 text-lg truncate">
                                                    {schedule.topic}
                                                </h4>
                                                <div className="flex items-center gap-4 mt-1 text-sm text-neutral-500">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {schedule.dayName}, {schedule.date}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Expand Icon */}
                                            <div className="flex-shrink-0">
                                                <svg
                                                    className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        <div className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'max-h-40 mt-4 pt-4 border-t border-neutral-100' : 'max-h-0'}`}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center gap-2 text-neutral-600">
                                                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-neutral-400">Waktu</div>
                                                        <div className="font-medium text-sm">{schedule.time}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-neutral-600">
                                                    <div className="w-8 h-8 bg-secondary-50 rounded-lg flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-neutral-400">Lokasi</div>
                                                        <div className="font-medium text-sm">{schedule.location}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-neutral-900 mb-1">Informasi Penting</h4>
                                <p className="text-neutral-600 text-sm leading-relaxed">
                                    Tutorial PAI dilaksanakan secara hybrid (offline & online).
                                    Pastikan untuk membawa Al-Quran dan alat tulis.
                                    Link Zoom akan dibagikan H-1 melalui grup WhatsApp.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
