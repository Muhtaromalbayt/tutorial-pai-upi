"use client";

import Hero from "@/components/Hero";
import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, parseISO, isValid } from "date-fns";
import { id } from "date-fns/locale";

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    timeline?: string;
    imageUrl?: string;
}

export default function KalenderPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedTimeline, setSelectedTimeline] = useState<string>("Semua");
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        "Semua", "Kuliah Dhuha", "Mentoring", "Bina Mentor", "Bina Kader",
        "Tutorial SPAI", "SoS", "WoW", "Kantin/Kamus", "PMM x PCM",
        "PMT", "Pemdiktor", "Pengukuhan Binder", "Lainnya"
    ];

    const timelines = ["Semua", "Tutorial PAI", "Tutorial SPAI", "Bina Kader", "Kepengurusan"];

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            // Google Apps Script URL for Calendar
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby7pNeAceEn96xpmywn9Qw-Eri1zeICxTRZorgGYI1k_Jeq6BhJwHkF7FEmqraoUdPb/exec";

            // Add timestamp to bypass cache
            const response = await fetch(`${GOOGLE_SCRIPT_URL}?t=${Date.now()}`, {
                cache: 'no-store',
                method: 'GET'
            });
            const result = await response.json() as { success: boolean, data: any[] };

            if (result.success && Array.isArray(result.data)) {
                // Map Google Sheets data to Event interface
                const mappedEvents = result.data.map((item, index) => {
                    // Validate date
                    if (!item.date) return null;

                    // Use new Date() to handle various formats (ISO or long string)
                    const parsedDate = new Date(item.date);

                    if (!isValid(parsedDate)) {
                        console.warn(`Invalid date for event: ${item.title}`, item.date);
                        return null;
                    }

                    return {
                        id: `event-${index}-${Date.now()}`, // Generate ID
                        title: item.title,
                        description: item.description || "",
                        date: parsedDate.toISOString(), // Store as ISO string for consistency
                        time: item.time || "",
                        location: item.location || "",
                        category: item.category || "Lainnya",
                        timeline: item.timeline || "Umum",
                        imageUrl: undefined
                    };
                }).filter((event): event is Event => event !== null);

                setEvents(mappedEvents);

                // Auto-navigate to the month of the first upcoming event
                const now = new Date();
                const upcomingEvent = mappedEvents.find(e => new Date(e.date) >= now);
                if (upcomingEvent) {
                    setCurrentMonth(new Date(upcomingEvent.date));
                } else if (mappedEvents.length > 0) {
                    // If no upcoming events, go to the last event
                    setCurrentMonth(new Date(mappedEvents[mappedEvents.length - 1].date));
                }
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const filteredEvents = selectedTimeline === "Semua"
        ? events
        : events.filter(event => event.timeline === selectedTimeline);

    const getEventsForDay = (day: Date) => {
        return filteredEvents.filter(event => {
            try {
                const eventDate = parseISO(event.date);
                return isSameDay(eventDate, day);
            } catch {
                return false;
            }
        });
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
                    {/* Timeline Filter */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-3">Timeline Kegiatan</h3>
                        <div className="flex flex-wrap gap-2">
                            {timelines.map(timeline => (
                                <button
                                    key={timeline}
                                    onClick={() => setSelectedTimeline(timeline)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${selectedTimeline === timeline
                                        ? "bg-primary-600 text-white shadow-md transform scale-105"
                                        : "bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200"
                                        }`}
                                >
                                    {timeline}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="card-academic p-16 text-center mb-8">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
                            <p className="text-neutral-600 text-lg">Memuat kalender...</p>
                        </div>
                    ) : (
                        <>
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
                                    Event Mendatang ({filteredEvents.length})
                                </h3>
                                {filteredEvents.length === 0 ? (
                                    <div className="card-academic p-12 text-center">
                                        <p className="text-neutral-500">Belum ada event untuk kategori ini.</p>
                                    </div>
                                ) : (
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
                                                            <div className="text-2xl font-bold">{format(parseISO(event.date), "d")}</div>
                                                            <div className="text-xs">{format(parseISO(event.date), "MMM", { locale: id })}</div>
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Event Detail Modal */}
                    {selectedEvent && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedEvent(null)}
                        >
                            <div
                                className="bg-white rounded-lg max-w-2xl w-full p-8 animate-fadeIn"
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
                                            <p className="text-neutral-700">{format(parseISO(selectedEvent.date), "EEEE, d MMMM yyyy", { locale: id })}</p>
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
