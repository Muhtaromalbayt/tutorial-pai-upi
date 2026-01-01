"use client";

import Hero from "@/components/Hero";
import { useState, useMemo } from "react";
import {
    TIMELINE_EVENTS,
    CATEGORY_COLORS,
    getEventsForDate,
    hasEventsOnDate,
    TimelineEvent,
} from "@/lib/timeline-data";
import {
    HIJRI_CALENDAR_1447,
    getGregorianDateForHijriDay,
} from "@/lib/hijriah-calendar-data";

// Day names in Indonesian
const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTH_NAMES = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Helper to get Hijri date for a Gregorian date
function getHijriForGregorian(gregDate: Date): { day: number; month: string } | null {
    for (const month of HIJRI_CALENDAR_1447) {
        const startDate = new Date(month.startGregorianDate);
        for (let d = 1; d <= month.daysInMonth; d++) {
            const hijriDate = new Date(startDate);
            hijriDate.setDate(startDate.getDate() + d - 1);
            if (
                hijriDate.getFullYear() === gregDate.getFullYear() &&
                hijriDate.getMonth() === gregDate.getMonth() &&
                hijriDate.getDate() === gregDate.getDate()
            ) {
                return { day: d, month: month.hijriMonthName };
            }
        }
    }
    return null;
}

export default function KalenderPage() {
    const [currentDate, setCurrentDate] = useState(() => new Date(2026, 1, 1)); // Start Feb 2026
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Generate calendar grid
    const calendarGrid = useMemo(() => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const grid: Array<{ date: Date | null; hijri: { day: number; month: string } | null }> = [];

        // Empty cells before first day
        for (let i = 0; i < startDayOfWeek; i++) {
            grid.push({ date: null, hijri: null });
        }

        // Days of month
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(currentYear, currentMonth, d);
            grid.push({
                date,
                hijri: getHijriForGregorian(date),
            });
        }

        return grid;
    }, [currentYear, currentMonth]);

    // Events for selected date
    const selectedEvents = useMemo(() => {
        if (!selectedDate) return [];
        return getEventsForDate(selectedDate);
    }, [selectedDate]);

    // Events for current month (for sidebar)
    const monthEvents = useMemo(() => {
        return TIMELINE_EVENTS.filter((e) => {
            const eventDate = new Date(e.date);
            return eventDate.getFullYear() === currentYear && eventDate.getMonth() === currentMonth;
        });
    }, [currentYear, currentMonth]);

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
        setSelectedDate(null);
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
        setSelectedDate(null);
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div>
            <Hero
                title="Kalender Kegiatan"
                subtitle="Jadwal Tutorial PAI-SPAI UPI Semester Genap 2025/2026"
                height="normal"
                backgroundImage="/assets/mentoring-hero.jpg"
            />

            <section className="section-academic">
                <div className="container-upi max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Calendar Grid */}
                        <div className="lg:col-span-2">
                            <div className="card-academic overflow-hidden">
                                {/* Month Header */}
                                <div className="bg-gradient-upi p-6">
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={prevMonth}
                                            className="p-2 rounded-lg hover:bg-white/20 text-white transition-all"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        <div className="text-center text-white">
                                            <h2 className="text-2xl md:text-3xl font-bold">
                                                {MONTH_NAMES[currentMonth]} {currentYear}
                                            </h2>
                                        </div>

                                        <button
                                            onClick={nextMonth}
                                            className="p-2 rounded-lg hover:bg-white/20 text-white transition-all"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    {calendarGrid.map((cell, idx) => {
                                        const hasEvents = cell.date ? hasEventsOnDate(cell.date) : false;
                                        const isSelected = selectedDate && cell.date &&
                                            selectedDate.getTime() === cell.date.getTime();

                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => cell.date && setSelectedDate(cell.date)}
                                                className={`min-h-[90px] md:min-h-[100px] p-2 border-b border-r border-neutral-100 cursor-pointer transition-colors ${cell.date === null
                                                        ? "bg-neutral-50 cursor-default"
                                                        : isSelected
                                                            ? "bg-primary-100 border-primary-300"
                                                            : isToday(cell.date)
                                                                ? "bg-primary-50"
                                                                : "hover:bg-neutral-50"
                                                    }`}
                                            >
                                                {cell.date && (
                                                    <>
                                                        {/* Gregorian Day - Big */}
                                                        <div className={`text-xl md:text-2xl font-bold ${isToday(cell.date)
                                                                ? "text-primary-600"
                                                                : idx % 7 === 0
                                                                    ? "text-primary-500"
                                                                    : "text-neutral-800"
                                                            }`}>
                                                            {cell.date.getDate()}
                                                        </div>

                                                        {/* Hijri Date - Small */}
                                                        {cell.hijri && (
                                                            <div className="text-xs text-neutral-400 mt-0.5">
                                                                {cell.hijri.day} {cell.hijri.month.slice(0, 3)}
                                                            </div>
                                                        )}

                                                        {/* Event Indicator */}
                                                        {hasEvents && (
                                                            <div className="mt-1 flex gap-1 flex-wrap">
                                                                {getEventsForDate(cell.date).slice(0, 2).map((e, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[e.category].dot}`}
                                                                        title={e.title}
                                                                    />
                                                                ))}
                                                                {getEventsForDate(cell.date).length > 2 && (
                                                                    <span className="text-xs text-neutral-400">
                                                                        +{getEventsForDate(cell.date).length - 2}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Legend */}
                                <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded bg-primary-50 border border-primary-200" />
                                            <span className="text-neutral-600">Hari Ini</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary-600" />
                                            <span className="text-neutral-600">Pembukaan/Penutupan</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-secondary-600" />
                                            <span className="text-neutral-600">Tutorial</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-accent-600" />
                                            <span className="text-neutral-600">Bina</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Events */}
                        <div className="lg:col-span-1">
                            {/* Selected Date Events */}
                            {selectedDate && selectedEvents.length > 0 && (
                                <div className="card-academic overflow-hidden mb-6">
                                    <div className="bg-gradient-upi p-4">
                                        <h3 className="text-lg font-bold text-white">
                                            {selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                                        </h3>
                                    </div>
                                    <div className="divide-y divide-neutral-100">
                                        {selectedEvents.map((event, idx) => (
                                            <div key={idx} className="p-4">
                                                <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${CATEGORY_COLORS[event.category].bg} ${CATEGORY_COLORS[event.category].text}`}>
                                                    {event.category}
                                                </div>
                                                <h4 className="font-semibold text-neutral-900">{event.title}</h4>
                                                {event.description && (
                                                    <p className="text-sm text-neutral-600 mt-1">{event.description}</p>
                                                )}
                                                {event.location && (
                                                    <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        </svg>
                                                        {event.location}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Month Events List */}
                            <div className="card-academic overflow-hidden sticky top-4">
                                <div className="bg-gradient-gold p-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Kegiatan Bulan Ini
                                    </h3>
                                </div>

                                <div className="divide-y divide-neutral-100 max-h-[500px] overflow-y-auto">
                                    {monthEvents.length === 0 ? (
                                        <div className="p-4 text-center text-neutral-500">
                                            Tidak ada kegiatan bulan ini
                                        </div>
                                    ) : (
                                        monthEvents.map((event, idx) => {
                                            const eventDate = new Date(event.date);
                                            return (
                                                <div
                                                    key={idx}
                                                    className="p-4 hover:bg-neutral-50 transition-colors cursor-pointer"
                                                    onClick={() => setSelectedDate(eventDate)}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center">
                                                            <span className="font-bold">{eventDate.getDate()}</span>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-neutral-900 truncate">
                                                                {event.title}
                                                            </p>
                                                            {event.location && (
                                                                <p className="text-xs text-neutral-500 mt-1">{event.location}</p>
                                                            )}
                                                        </div>
                                                        <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${CATEGORY_COLORS[event.category].dot}`} />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                {/* Quick Month Navigation */}
                                <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                                    <p className="text-xs text-neutral-500 mb-2 font-medium">Navigasi Cepat:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {[1, 2, 3, 4, 5, 6, 7].map((m) => (
                                            <button
                                                key={m}
                                                onClick={() => setCurrentDate(new Date(2026, m, 1))}
                                                className={`px-2 py-1 text-xs rounded transition-colors ${currentMonth === m && currentYear === 2026
                                                        ? "bg-primary-600 text-white"
                                                        : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                                                    }`}
                                            >
                                                {MONTH_NAMES[m].slice(0, 3)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
