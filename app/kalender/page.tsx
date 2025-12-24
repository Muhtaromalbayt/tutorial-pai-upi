"use client";

import Hero from "@/components/Hero";
import { useState, useMemo } from "react";
import {
    HIJRI_CALENDAR_1447,
    ARABIC_NUMERALS,
    DAY_NAMES,
    HijriMonth,
    SpecialDay,
    getGregorianDateForHijriDay,
    getDayOfWeek,
    formatGregorianDate,
    getCurrentHijriMonth,
    getAllSpecialDaysForMonth,
} from "@/lib/hijriah-calendar-data";

export default function KalenderPage() {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(() => {
        // Find current month index based on today's date
        const current = getCurrentHijriMonth();
        return HIJRI_CALENDAR_1447.findIndex(m => m.hijriMonth === current.hijriMonth);
    });

    const currentMonth = HIJRI_CALENDAR_1447[currentMonthIndex];
    const specialDays = useMemo(() => getAllSpecialDaysForMonth(currentMonth), [currentMonth]);

    // Calculate calendar grid
    const calendarGrid = useMemo(() => {
        const grid: Array<{ hijriDay: number | null; gregorianDate: string; isSpecial: boolean; specialName?: string }> = [];

        // Get day of week for first day of month (0 = Sunday/Ahad)
        const firstDayOfWeek = getDayOfWeek(currentMonth, 1);

        // Add empty cells before first day
        for (let i = 0; i < firstDayOfWeek; i++) {
            grid.push({ hijriDay: null, gregorianDate: "", isSpecial: false });
        }

        // Add days of the month
        for (let day = 1; day <= currentMonth.daysInMonth; day++) {
            const gregDate = getGregorianDateForHijriDay(currentMonth, day);
            const special = specialDays.find(s => s.hijriDay === day);
            grid.push({
                hijriDay: day,
                gregorianDate: formatGregorianDate(gregDate),
                isSpecial: !!special,
                specialName: special?.name
            });
        }

        return grid;
    }, [currentMonth, specialDays]);

    const nextMonth = () => {
        if (currentMonthIndex < HIJRI_CALENDAR_1447.length - 1) {
            setCurrentMonthIndex(prev => prev + 1);
        }
    };

    const prevMonth = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(prev => prev - 1);
        }
    };

    // Check if today is within current displayed month
    const isCurrentMonthActive = useMemo(() => {
        const today = new Date();
        const startDate = new Date(currentMonth.startGregorianDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + currentMonth.daysInMonth - 1);
        return today >= startDate && today <= endDate;
    }, [currentMonth]);

    // Get today's Hijri day if in current month
    const todayHijriDay = useMemo(() => {
        if (!isCurrentMonthActive) return null;
        const today = new Date();
        const startDate = new Date(currentMonth.startGregorianDate);
        const diffTime = today.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays >= 1 && diffDays <= currentMonth.daysInMonth ? diffDays : null;
    }, [currentMonth, isCurrentMonthActive]);

    return (
        <div>
            <Hero
                title="Kalender Hijriah 1447 H"
                subtitle="Kalender Hijriah Global Tunggal Muhammadiyah"
                height="normal"
                backgroundImage="/assets/mentoring-hero.jpg"
            />

            <section className="section-academic">
                <div className="container-upi max-w-7xl">
                    {/* Year Selector */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-neutral-600">Tahun Hijriah:</span>
                            <select
                                className="px-4 py-2 border border-neutral-200 rounded-lg bg-white text-neutral-900 font-semibold focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                value={1447}
                                disabled
                            >
                                <option value={1447}>1447 H</option>
                            </select>
                        </div>
                        <a
                            href="https://khgt.muhammadiyah.or.id/kalendar-hijriah"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                            <span>Sumber: KHGT Muhammadiyah</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Calendar Grid - Main Area */}
                        <div className="lg:col-span-2">
                            <div className="card-academic overflow-hidden">
                                {/* Month Header */}
                                <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6">
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={prevMonth}
                                            disabled={currentMonthIndex === 0}
                                            className={`p-2 rounded-lg transition-all ${currentMonthIndex === 0
                                                ? "opacity-30 cursor-not-allowed"
                                                : "hover:bg-white/20 text-white"
                                                }`}
                                        >
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        <div className="text-center text-white">
                                            <h2 className="text-2xl md:text-3xl font-bold">
                                                {currentMonth.hijriMonthName} {currentMonth.hijriYear} H
                                            </h2>
                                            <p className="text-sm opacity-80 mt-1">
                                                {currentMonth.gregorianRange}
                                            </p>
                                        </div>

                                        <button
                                            onClick={nextMonth}
                                            disabled={currentMonthIndex === HIJRI_CALENDAR_1447.length - 1}
                                            className={`p-2 rounded-lg transition-all ${currentMonthIndex === HIJRI_CALENDAR_1447.length - 1
                                                ? "opacity-30 cursor-not-allowed"
                                                : "hover:bg-white/20 text-white"
                                                }`}
                                        >
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Day Headers */}
                                <div className="grid grid-cols-7 bg-neutral-50 border-b border-neutral-200">
                                    {DAY_NAMES.map((day, idx) => (
                                        <div
                                            key={day}
                                            className={`py-3 text-center text-sm font-semibold ${idx === 0 ? "text-primary-600" : "text-neutral-600"
                                                }`}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7">
                                    {calendarGrid.map((cell, idx) => (
                                        <div
                                            key={idx}
                                            className={`min-h-[80px] md:min-h-[100px] p-2 border-b border-r border-neutral-100 last:border-r-0 transition-colors ${cell.hijriDay === null
                                                ? "bg-neutral-50"
                                                : cell.hijriDay === todayHijriDay
                                                    ? "bg-primary-50 border-primary-200"
                                                    : cell.isSpecial
                                                        ? "bg-accent-50"
                                                        : "hover:bg-neutral-50"
                                                }`}
                                        >
                                            {cell.hijriDay !== null && (
                                                <>
                                                    {/* Hijri Day - Arabic Numeral */}
                                                    <div className={`text-2xl md:text-3xl font-bold mb-1 ${cell.hijriDay === todayHijriDay
                                                        ? "text-primary-600"
                                                        : idx % 7 === 0
                                                            ? "text-primary-500"
                                                            : "text-neutral-800"
                                                        }`}>
                                                        {ARABIC_NUMERALS[cell.hijriDay]}
                                                    </div>

                                                    {/* Gregorian Date */}
                                                    <div className="text-xs text-neutral-500">
                                                        {cell.gregorianDate}
                                                    </div>

                                                    {/* Special Day Indicator */}
                                                    {cell.isSpecial && (
                                                        <div className="mt-1">
                                                            <span className="inline-block w-2 h-2 rounded-full bg-accent-500" title={cell.specialName}></span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-primary-50 border border-primary-200"></div>
                                            <span className="text-neutral-600">Hari Ini</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-accent-50 border border-accent-200"></div>
                                            <span className="text-neutral-600">Hari Istimewa</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary-500 font-bold">٧</span>
                                            <span className="text-neutral-600">Hari Ahad</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Special Days */}
                        <div className="lg:col-span-1">
                            <div className="card-academic overflow-hidden sticky top-4">
                                <div className="bg-gradient-to-r from-accent-500 to-accent-600 p-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                        Hari Istimewa
                                    </h3>
                                </div>

                                <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto">
                                    {specialDays.length === 0 ? (
                                        <div className="p-4 text-center text-neutral-500">
                                            Tidak ada hari istimewa bulan ini
                                        </div>
                                    ) : (
                                        specialDays.map((day, idx) => (
                                            <div key={idx} className="p-4 hover:bg-neutral-50 transition-colors">
                                                <div className="flex items-start gap-3">
                                                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${day.type === 'islamic'
                                                        ? "bg-primary-100 text-primary-700"
                                                        : "bg-accent-100 text-accent-700"
                                                        }`}>
                                                        <span className="font-bold text-lg">{day.hijriDay}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-semibold text-sm ${day.type === 'islamic'
                                                            ? "text-primary-700"
                                                            : "text-accent-700"
                                                            }`}>
                                                            {day.hijriDay} {currentMonth.hijriMonthName} {currentMonth.hijriYear} H
                                                        </p>
                                                        <p className="text-xs text-neutral-500 mb-1">
                                                            {day.gregorianDate}
                                                        </p>
                                                        <p className="text-sm font-medium text-neutral-800">
                                                            {day.name}
                                                        </p>
                                                        {day.description && (
                                                            <p className="text-xs text-neutral-600 mt-1">{day.description}</p>
                                                        )}
                                                        {day.time && (
                                                            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                {day.time}
                                                            </p>
                                                        )}
                                                        {day.location && (
                                                            <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                </svg>
                                                                {day.location}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Month Quick Navigation */}
                                <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                                    <p className="text-xs text-neutral-500 mb-2 font-medium">Navigasi Bulan:</p>
                                    <div className="grid grid-cols-4 gap-1">
                                        {HIJRI_CALENDAR_1447.map((month, idx) => (
                                            <button
                                                key={month.hijriMonth}
                                                onClick={() => setCurrentMonthIndex(idx)}
                                                className={`p-1.5 text-xs rounded transition-colors ${idx === currentMonthIndex
                                                    ? "bg-primary-600 text-white font-semibold"
                                                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                                                    }`}
                                                title={month.hijriMonthName}
                                            >
                                                {month.hijriMonth}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-8 card-academic p-6">
                        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Tentang Kalender Hijriah
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 text-sm text-neutral-600">
                            <div>
                                <p className="mb-3">
                                    Kalender ini menggunakan <strong>Kalender Hijriah Global Tunggal (KHGT)</strong> yang ditetapkan
                                    oleh Majelis Tarjih dan Tajdid Pimpinan Pusat Muhammadiyah berdasarkan metode Hisab Hakiki Wujudul Hilal.
                                </p>
                                <p>
                                    Tanggal Hijriah ditampilkan dengan angka Arab (١, ٢, ٣, ...) dan disertai dengan tanggal Masehi
                                    sebagai referensi.
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-neutral-700 mb-2">Hari Istimewa dalam Islam:</p>
                                <ul className="space-y-1">
                                    <li>• <strong>Ayyamul Bidh</strong> - Hari ke-13, 14, 15 setiap bulan (puasa sunnah)</li>
                                    <li>• <strong>Hari Tasua & Asyura</strong> - 9 & 10 Muharam</li>
                                    <li>• <strong>Maulid Nabi</strong> - 12 Rabiulawal</li>
                                    <li>• <strong>Isra Mi'raj</strong> - 27 Rajab</li>
                                    <li>• <strong>Nuzulul Quran</strong> - 17 Ramadan</li>
                                    <li>• <strong>Idul Fitri & Idul Adha</strong> - 1 Syawal & 10 Zulhijah</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
