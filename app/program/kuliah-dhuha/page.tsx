"use client";

import Hero from "@/components/Hero";
import { useMemo } from "react";
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

export default function KuliahDhuhaPage() {
    // Get Tutorial PAI activities and Pembukaan
    const weeklySchedule = useMemo(() => {
        // Get Tutorial PAI activities and Pembukaan
        const activities = ORGANIZATION_ACTIVITIES
            .filter(activity =>
                activity.category === "Tutorial PAI" ||
                activity.title.includes("Pembukaan")
            )
            .reduce((acc, activity) => {
                // Group by date to avoid duplicates
                const existing = acc.find(a => a.date === activity.date);
                if (!existing) {
                    acc.push(activity);
                }
                return acc;
            }, [] as typeof ORGANIZATION_ACTIVITIES)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Map to schedule format with week numbers
        return activities.map((activity, index) => ({
            week: `Minggu ${index + 1}`,
            date: formatDateIndonesian(activity.date),
            rawDate: activity.date,
            topic: activity.title,
            location: activity.location || "Aula ITC",
            time: activity.time || "08.45 - 13.00 WIB",
            category: activity.category
        }));
    }, []);

    return (
        <div>
            <Hero
                title="Kuliah Dhuha"
                subtitle="Kajian rutin pekanan untuk memperdalam pemahaman keislaman mahasiswa UPI"
                variant="gradient"
            />

            <section className="section-academic">
                <div className="container-upi max-w-6xl">
                    {/* Program Description */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Tentang Kuliah Dhuha
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-4">
                            Kuliah Dhuha adalah program kajian rutin yang diselenggarakan setiap pekan dengan menghadirkan pemateri berkualitas. Program ini bertujuan untuk meningkatkan pemahaman keislaman mahasiswa dengan materi yang relevan, inspiratif, dan aplikatif dalam kehidupan sehari-hari.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="p-6 bg-primary-50 rounded-lg">
                                <div className="text-3xl font-bold text-primary-700 mb-2">1x</div>
                                <div className="text-sm text-neutral-600">Per Minggu</div>
                            </div>
                            <div className="p-6 bg-secondary-50 rounded-lg">
                                <div className="text-3xl font-bold text-secondary-700 mb-2">90'</div>
                                <div className="text-sm text-neutral-600">Durasi Kajian</div>
                            </div>
                            <div className="p-6 bg-accent-50 rounded-lg">
                                <div className="text-3xl font-bold text-accent-700 mb-2">200+</div>
                                <div className="text-sm text-neutral-600">Peserta Aktif</div>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Schedule */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                            Jadwal Mingguan
                        </h3>
                        <div className="space-y-6">
                            {weeklySchedule.map((schedule, index) => (
                                <div key={index} className="card-academic p-6 hover:shadow-xl transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-3">
                                                <div className="w-20 h-20 bg-primary-600 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0">
                                                    <div className="text-xs font-semibold">{schedule.week}</div>
                                                    <div className="text-lg font-bold">{new Date(schedule.rawDate).getDate()}</div>
                                                    <div className="text-xs">{new Date(schedule.rawDate).toLocaleDateString('id-ID', { month: 'short' })}</div>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold text-neutral-900 mb-1">
                                                        {schedule.topic}
                                                    </h4>
                                                    <div className="flex items-center text-sm">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${schedule.category === 'Kajian'
                                                            ? 'bg-accent-100 text-accent-800'
                                                            : 'bg-primary-100 text-primary-800'
                                                            }`}>
                                                            {schedule.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 pl-24">
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {schedule.date}
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {schedule.time}
                                                </div>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    {schedule.location}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery/Photos */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                            Dokumentasi Kegiatan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="relative h-64 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg overflow-hidden group cursor-pointer">
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                                        KD {item}
                                    </div>
                                    <div className="absolute inset-0 bg-neutral-900 opacity-0 group-hover:opacity-40 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="card-academic p-8 bg-accent-50 border-l-4 border-accent-600">
                        <div className="flex items-start space-x-4">
                            <svg className="w-8 h-8 text-accent-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                            <div>
                                <h4 className="text-xl font-semibold text-neutral-900 mb-2">Pengumuman</h4>
                                <p className="text-neutral-700 mb-3">
                                    Kuliah Dhuha minggu depan akan diselenggarakan secara hybrid (offline & online via Zoom). Link Zoom akan dibagikan H-1 melalui grup WhatsApp.
                                </p>
                                <p className="text-sm text-neutral-600">
                                    Jangan lupa membawa alat tulis dan Al-Quran!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
