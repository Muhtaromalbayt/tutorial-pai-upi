"use client";

import Hero from "@/components/Hero";
import { useEffect, useMemo, useState } from "react";
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

// Extract week number from title
function extractWeekNumber(title: string): number | null {
    const weekMap: Record<string, number> = {
        'pertama': 1, 'kedua': 2, 'ketiga': 3, 'keempat': 4,
        'kelima': 5, 'keenam': 6, 'ketujuh': 7, 'kedelapan': 8,
        'ke-dua': 2, 'ke-tiga': 3, 'ke-empat': 4, 'ke-lima': 5,
        'ke-enam': 6, 'ke-tujuh': 7, 'ke-delapan': 8
    };
    const lowerTitle = title.toLowerCase();
    for (const [word, num] of Object.entries(weekMap)) {
        if (lowerTitle.includes(word)) return num;
    }
    return null;
}

// Format title to use proper Indonesian
function formatTitle(title: string): string {
    return title
        .replace(/Ke-dua/gi, 'Kedua')
        .replace(/Ke-tiga/gi, 'Ketiga')
        .replace(/Ke-empat/gi, 'Keempat')
        .replace(/Ke-lima/gi, 'Kelima')
        .replace(/Ke-enam/gi, 'Keenam')
        .replace(/Ke-tujuh/gi, 'Ketujuh')
        .replace(/Ke-delapan/gi, 'Kedelapan');
}

type DayFilter = 'all' | 'Rabu' | 'Jumat';

interface DBSchedule {
    id: string;
    weekNumber: number;
    dayType: string | null;
    date: string;
    topic: string;
    speaker: string | null;
    materials: string | null;
    location: string | null;
}

export default function SeminarPAIPage() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<DayFilter>('all');
    const [dbSchedules, setDbSchedules] = useState<DBSchedule[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch schedules from database
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await fetch('/api/seminar');
                const data = await res.json() as { schedules?: DBSchedule[] };
                setDbSchedules(data.schedules || []);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSchedules();
    }, []);

    // Get Tutorial SPAI activities
    const weeklySchedule = useMemo(() => {
        const activities = ORGANIZATION_ACTIVITIES
            .filter(activity => activity.category === "Tutorial SPAI")
            .reduce((acc, activity) => {
                const existing = acc.find(a => a.date === activity.date);
                if (!existing) {
                    acc.push(activity);
                }
                return acc;
            }, [] as typeof ORGANIZATION_ACTIVITIES)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        let currentWeek = 2;
        let lastWeekDate = '';

        return activities.map((activity) => {
            const weekNum = extractWeekNumber(activity.title) || currentWeek;
            const isWoW = activity.title.toLowerCase().includes('wow') || activity.title.toLowerCase().includes('wonderful');
            const isPenutupan = activity.title.toLowerCase().includes('penutupan');
            const dayName = getDayName(activity.date);

            // Convert dayName to dayType for matching
            const dayType = dayName === 'Jumat' ? 'Jumat' : 'Rabu';

            // Track week progression
            const dateWeek = activity.date.substring(0, 10);
            if (lastWeekDate && dateWeek !== lastWeekDate) {
                const dayDiff = Math.abs(new Date(dateWeek).getTime() - new Date(lastWeekDate).getTime()) / (1000 * 60 * 60 * 24);
                if (dayDiff > 5) currentWeek++;
            }
            lastWeekDate = dateWeek;

            // Find matching database schedule by week AND dayType
            const dbMatch = dbSchedules.find(s =>
                s.weekNumber === weekNum &&
                (s.dayType === dayType || s.dayType === dayName)
            );

            // Fallback match just by week (for materials)
            const weekMatch = dbSchedules.find(s => s.weekNumber === weekNum);
            const materials = dbMatch?.materials
                ? JSON.parse(dbMatch.materials) as string[]
                : (weekMatch?.materials ? JSON.parse(weekMatch.materials) as string[] : []);

            return {
                week: weekNum,
                date: formatDateIndonesian(activity.date),
                rawDate: activity.date,
                dayName: dayName,
                dayType: dayType,
                topic: dbMatch?.topic || weekMatch?.topic || formatTitle(activity.title),
                speaker: dbMatch?.speaker || null,
                materials: materials,
                location: "Masjid Al Furqon",
                time: activity.time || "15.30 - 17.30 WIB",
                category: activity.category,
                isPembukaan: false,
                isWoW,
                isPenutupan,
                isSpecial: isWoW || isPenutupan
            };
        });
    }, [dbSchedules]);

    // Get Pembukaan from Tutorial PAI (same date)
    const pembukaan = useMemo(() => {
        const pembukaanActivity = ORGANIZATION_ACTIVITIES.find(a =>
            a.title.includes("Pembukaan") && a.category === "Tutorial"
        );
        if (pembukaanActivity) {
            return {
                week: 1,
                date: formatDateIndonesian(pembukaanActivity.date),
                rawDate: pembukaanActivity.date,
                dayName: getDayName(pembukaanActivity.date),
                topic: "Pembukaan Tutorial",
                location: "Masjid Al Furqon",
                time: "08.45 - 13.00 WIB",
                category: "Tutorial",
                isPembukaan: true,
                isWoW: false,
                isPenutupan: false,
                isSpecial: true
            };
        }
        return null;
    }, []);

    // Separate special events from regular schedule
    const wow = weeklySchedule.find(s => s.isWoW);
    const penutupan = weeklySchedule[weeklySchedule.length - 1];
    const regularSchedule = weeklySchedule.filter((s, index) =>
        index !== weeklySchedule.length - 1 && !s.isWoW
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
            <Hero
                title="Seminar PAI"
                subtitle="Program Tutorial SPAI untuk pengembangan spiritualitas mahasiswa UPI"
                variant="gradient"
            />

            {/* Main Content */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* About Section */}
                    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8 mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>

                        <div className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-900">
                                    Tentang Seminar PAI
                                </h2>
                            </div>
                            <p className="text-neutral-600 leading-relaxed text-lg mb-6">
                                <strong>Seminar PAI</strong> adalah program kajian tematik dalam rangkaian <strong>Tutorial SPAI</strong>.
                                Program ini fokus pada pengembangan spiritualitas dan wawasan keislaman mahasiswa melalui kajian yang inspiratif dan aplikatif.
                            </p>

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-5 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 hover:shadow-md transition-all">
                                    <div className="text-4xl font-bold text-primary-600 mb-1">8</div>
                                    <div className="text-sm text-neutral-600 font-medium">Pekan</div>
                                </div>
                                <div className="text-center p-5 bg-gradient-to-br from-secondary-50 to-white rounded-xl border border-secondary-100 hover:shadow-md transition-all">
                                    <div className="text-4xl font-bold text-secondary-600 mb-1">2</div>
                                    <div className="text-sm text-neutral-600 font-medium">Jam/Pekan</div>
                                </div>
                                <div className="text-center p-5 bg-gradient-to-br from-accent-50 to-white rounded-xl border border-accent-200 hover:shadow-md transition-all">
                                    <div className="text-4xl font-bold text-accent-600 mb-1">4000+</div>
                                    <div className="text-sm text-neutral-600 font-medium">Peserta/Semester</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Special Events Section */}
                    <div className="mb-12">
                        <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">⭐</span>
                            Kegiatan Spesial
                        </h3>
                        <div className="grid md:grid-cols-3 gap-5">
                            {/* Pembukaan */}
                            {pembukaan && (
                                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                                🎉 Pembukaan
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-lg mb-3">Pekan 1</h4>
                                        <div className="space-y-2 text-sm text-white/90">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{pembukaan.dayName}, {pembukaan.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                <span>{pembukaan.location}</span>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-xs text-white/70 bg-white/10 rounded-lg px-3 py-2">Diikuti seluruh fakultas</p>
                                    </div>
                                </div>
                            )}

                            {/* Wonderful of Warriors */}
                            {wow && (
                                <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                                ⚔️ Wonderful of Warriors
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-lg mb-3">Pekan 6 (WoW)</h4>
                                        <div className="space-y-2 text-sm text-white/90">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{wow.dayName}, {wow.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                <span>{wow.location}</span>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-xs text-white/70 bg-white/10 rounded-lg px-3 py-2">Diikuti seluruh fakultas</p>
                                    </div>
                                </div>
                            )}

                            {/* Penutupan - No purple! */}
                            {penutupan && (
                                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                                🎓 Penutupan
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-lg mb-3">Pekan 8</h4>
                                        <div className="space-y-2 text-sm text-white/90">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{penutupan.dayName}, {penutupan.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                <span>{penutupan.location}</span>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-xs text-white/70 bg-white/10 rounded-lg px-3 py-2">Diikuti seluruh fakultas</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Weekly Schedule */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-neutral-900">
                                        Jadwal Pekanan
                                    </h2>
                                    <p className="text-sm text-neutral-500">Klik untuk melihat detail pemateri</p>
                                </div>
                            </div>
                        </div>

                        {/* Faculty Filter Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <button
                                onClick={() => setSelectedDay('all')}
                                className={`rounded-xl p-4 text-center transition-all duration-300 ${selectedDay === 'all'
                                    ? 'bg-neutral-800 text-white shadow-lg scale-[1.02]'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                <span className="font-bold text-lg">Semua</span>
                                <div className={`text-xs mt-1 ${selectedDay === 'all' ? 'text-white/70' : 'text-neutral-500'}`}>
                                    Semua Fakultas
                                </div>
                            </button>

                            <button
                                onClick={() => setSelectedDay('Rabu')}
                                className={`rounded-xl p-4 transition-all duration-300 ${selectedDay === 'Rabu'
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-[1.02]'
                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                                    }`}
                            >
                                <div className="font-bold text-lg">Rabu</div>
                                <div className={`text-xs mt-1 ${selectedDay === 'Rabu' ? 'text-white/80' : 'text-blue-500'}`}>FPIPS & FPSD</div>
                            </button>

                            <button
                                onClick={() => setSelectedDay('Jumat')}
                                className={`rounded-xl p-4 transition-all duration-300 ${selectedDay === 'Jumat'
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg scale-[1.02]'
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                    }`}
                            >
                                <div className="font-bold text-lg">Jumat</div>
                                <div className={`text-xs mt-1 ${selectedDay === 'Jumat' ? 'text-white/80' : 'text-emerald-500'}`}>FIP, FK & FPEB</div>
                            </button>
                        </div>

                        {/* Schedule Grid */}
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {regularSchedule
                                    .filter(schedule => selectedDay === 'all' || schedule.dayName === selectedDay)
                                    .map((schedule, index) => (
                                        <div
                                            key={index}
                                            className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${expandedIndex === index ? 'border-primary-200 shadow-md' : 'border-neutral-100'
                                                }`}
                                        >
                                            <div
                                                className="p-5 cursor-pointer hover:bg-neutral-50 transition-colors"
                                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {/* Week Number Badge */}
                                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex flex-col items-center justify-center text-white shadow-md">
                                                        <span className="text-xs font-medium opacity-80">Pekan</span>
                                                        <span className="text-2xl font-bold">{schedule.week}</span>
                                                    </div>

                                                    {/* Main Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-neutral-900 text-lg">
                                                            {schedule.topic}
                                                        </h4>
                                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                                            <span className="flex items-center gap-1 text-sm text-neutral-500">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                {schedule.dayName}, {schedule.date}
                                                            </span>
                                                            {schedule.dayName === "Rabu" && (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                                    FPIPS & FPSD
                                                                </span>
                                                            )}
                                                            {schedule.dayName === "Jumat" && (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                                                    FIP, FK & FPEB
                                                                </span>
                                                            )}
                                                            {schedule.speaker && (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                                                    👤 {schedule.speaker}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Expand Icon */}
                                                    <div className="flex-shrink-0">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${expandedIndex === index ? 'bg-primary-100' : 'bg-neutral-100'
                                                            }`}>
                                                            <svg
                                                                className={`w-5 h-5 transition-transform duration-300 ${expandedIndex === index ? 'rotate-180 text-primary-600' : 'text-neutral-400'
                                                                    }`}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Expanded Details */}
                                                <div className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'max-h-96 mt-5 pt-5 border-t border-neutral-100' : 'max-h-0'}`}>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {/* Pemateri */}
                                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-100">
                                                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-amber-600 font-medium mb-1">Pemateri</div>
                                                                <div className="font-semibold text-neutral-800">
                                                                    {schedule.speaker || <span className="text-neutral-400 italic">Belum ditentukan</span>}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Waktu */}
                                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100">
                                                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-primary-600 font-medium mb-1">Waktu</div>
                                                                <div className="font-semibold text-neutral-800">{schedule.time}</div>
                                                            </div>
                                                        </div>

                                                        {/* Lokasi */}
                                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-secondary-50 to-white rounded-xl border border-secondary-100">
                                                            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                <svg className="w-5 h-5 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs text-secondary-600 font-medium mb-1">Lokasi</div>
                                                                <div className="font-semibold text-neutral-800">{schedule.location}</div>
                                                            </div>
                                                        </div>

                                                        {/* Materi / Download */}
                                                        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-100">
                                                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="text-xs text-emerald-600 font-medium mb-2">Materi</div>
                                                                {schedule.materials && schedule.materials.length > 0 ? (
                                                                    <div className="space-y-2">
                                                                        {schedule.materials.map((url, i) => (
                                                                            <a
                                                                                key={i}
                                                                                href={url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                                                                            >
                                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                                                </svg>
                                                                                Download PPT {schedule.materials.length > 1 ? `#${i + 1}` : ''}
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-neutral-400 italic text-sm">Belum tersedia</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && regularSchedule.filter(s => selectedDay === 'all' || s.dayName === selectedDay).length === 0 && (
                            <div className="text-center py-12 bg-neutral-50 rounded-xl">
                                <div className="text-4xl mb-3">📅</div>
                                <p className="text-neutral-500">Belum ada jadwal untuk hari ini</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
}
