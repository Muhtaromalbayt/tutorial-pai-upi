"use client";

import Hero from "@/components/Hero";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { id } from "date-fns/locale";

interface Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    pic: string;
    category: string;
    poster?: string;
}

// Sample events data
const sampleEvents: Event[] = [
    {
        id: 1,
        title: "Kuliah Dhuha: Adab Menuntut Ilmu",
        description: "Kajian perdana semester genap dengan tema pentingnya adab dalam menuntut ilmu",
        date: new Date(2026, 1, 22),
        time: "07:30 - 09:00 WIB",
        location: "Auditorium UPI",
        pic: "Departemen Keilmuan",
        category: "Kajian"
    },
    {
        id: 2,
        title: "Seminar PAI: AI dan Pendidikan Islam",
        description: "Diskusi tentang peran teknologi AI dalam pengembangan pendidikan Islam modern",
        date: new Date(2026, 1, 25),
        time: "13:00 - 15:00 WIB",
        location: "Auditorium UPI",
        pic: "Departemen Keilmuan",
        category: "Seminar"
    },
    {
        id: 3,
        title: "Bina Kader Batch 3",
        description: "Program pelatihan kader untuk membentuk generasi muda yang beradab dan berperadaban",
        date: new Date(2026, 2, 1),
        time: "08:00 - 16:00 WIB",
        location: "Gedung Isola",
        pic: "Departemen Kaderisasi",
        category: "Program"
    },
    {
        id: 4,
        title: "Rapat Koordinasi Kabinet",
        description: "Evaluasi program bulan pertama dan planning kegiatan bulan berikutnya",
        date: new Date(2026, 2, 5),
        time: "16:00 - 18:00 WIB",
        location: "Sekretariat Tutorial PAI",
        pic: "Ketua Umum",
        category: "Meeting"
    },
    {
        id: 5,
        title: "Training Mentor Batch 2",
        description: "Pelatihan teknik konseling untuk para mentor",
        date: new Date(2026, 2, 20),
        time: "13:00 - 17:00 WIB",
        location: "Ruang 301",
        pic: "Departemen Mentoring",
        category: "Program"
    },
];

export default function KalenderPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)); // February 2026
    const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const categories = ["Semua", "Kajian", "Program", "Meeting", "Seminar", "BINDER", "Rihlah"];

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const filteredEvents = selectedCategory === "Semua"
        ? sampleEvents
        : sampleEvents.filter(event => event.category === selectedCategory);

    const getEventsForDay = (day: Date) => {
        return filteredEvents.filter(event => isSameDay(event.date, day));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    return (
        <div>
            <Hero
                title="Kalender Tutorial PAI"
                subtitle="Semester Genap 2025/2026 — Februari - Juli 2026"
                height="normal"
            />

            <section className="section-academic">
                <div className="container-upi max-w-7xl">
                    {/* Category Filter */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Filter Kategori</h3>
                        <div className="flex flex-wrap gap-3">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                                            ? "bg-primary-600 text-white"
                                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="card-academic p-8 mb-8">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-neutral-900">
                                {format(currentMonth, "MMMM yyyy", { locale: id })}
                            </h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={prevMonth}
                                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextMonth}
                                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">
                            {/* Day Headers */}
                            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                                <div key={day} className="text-center font-semibold text-neutral-600 text-sm py-2">
                                    {day}
                                </div>
                            ))}

                            {/* Empty cells for days before month starts */}
                            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
                                <div key={`empty-${index}`} className="aspect-square"></div>
                            ))}

                            {/* Calendar Days */}
                            {daysInMonth.map(day => {
                                const dayEvents = getEventsForDay(day);
                                const isCurrentDay = isToday(day);

                                return (
                                    <div
                                        key={day.toISOString()}
                                        className={`aspect-square p-2 border rounded-lg transition-all cursor-pointer ${isCurrentDay
                                                ? "border-primary-600 bg-primary-50"
                                                : "border-neutral-200 hover:border-primary-300 hover:bg-neutral-50"
                                            }`}
                                    >
                                        <div className={`text-sm font-semibold mb-1 ${isCurrentDay ? "text-primary-700" : "text-neutral-900"
                                            }`}>
                                            {format(day, "d")}
                                        </div>
                                        <div className="space-y-1">
                                            {dayEvents.slice(0, 2).map(event => (
                                                <div
                                                    key={event.id}
                                                    onClick={() => setSelectedEvent(event)}
                                                    className="text-xs px-1 py-0.5 bg-primary-600 text-white rounded truncate hover:bg-primary-700"
                                                >
                                                    {event.title}
                                                </div>
                                            ))}
                                            {dayEvents.length > 2 && (
                                                <div className="text-xs text-neutral-500 px-1">
                                                    +{dayEvents.length - 2} lainnya
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Event List */}
                    <div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                            Event Mendatang
                        </h3>
                        <div className="space-y-4">
                            {filteredEvents.map(event => (
                                <div
                                    key={event.id}
                                    onClick={() => setSelectedEvent(event)}
                                    className="card-academic p-6 hover:shadow-xl transition-all cursor-pointer"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-primary-600 rounded-lg flex flex-col items-center justify-center text-white">
                                                <div className="text-2xl font-bold">{format(event.date, "d")}</div>
                                                <div className="text-xs">{format(event.date, "MMM", { locale: id })}</div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-lg font-semibold text-neutral-900">{event.title}</h4>
                                                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                                                    {event.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-neutral-600 mb-3">{event.description}</p>
                                            <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {event.time}
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    {event.location}
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    {event.pic}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Event Detail Modal */}
                    {selectedEvent && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedEvent(null)}
                        >
                            <div
                                className="bg-white rounded-lg max-w-2xl w-full p-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-bold text-neutral-900">{selectedEvent.title}</h3>
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="text-neutral-400 hover:text-neutral-600"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm font-semibold text-neutral-500 mb-1">Deskripsi</div>
                                        <p className="text-neutral-700">{selectedEvent.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm font-semibold text-neutral-500 mb-1">Tanggal</div>
                                            <p className="text-neutral-700">{format(selectedEvent.date, "EEEE, d MMMM yyyy", { locale: id })}</p>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-neutral-500 mb-1">Waktu</div>
                                            <p className="text-neutral-700">{selectedEvent.time}</p>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-neutral-500 mb-1">Lokasi</div>
                                            <p className="text-neutral-700">{selectedEvent.location}</p>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-neutral-500 mb-1">Penanggung Jawab</div>
                                            <p className="text-neutral-700">{selectedEvent.pic}</p>
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-neutral-500 mb-1">Kategori</div>
                                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                                                {selectedEvent.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
