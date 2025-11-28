import Hero from "@/components/Hero";

export default function KuliahDhuhaPage() {
    const weeklySchedule = [
        {
            week: "Minggu 1",
            date: "22 Februari 2026",
            topic: "Adab Menuntut Ilmu",
            speaker: "Dr. Ahmad Syafii, M.Pd.I",
            location: "Auditorium UPI",
            time: "07:30 - 09:00 WIB",
            materials: "Materi-Kuliah-Dhuha-1.pdf"
        },
        {
            week: "Minggu 2",
            date: "29 Februari 2026",
            topic: "Hikmah Puasa di Bulan Rajab",
            speaker: "Ustadz Muhammad Iqbal, Lc",
            location: "Auditorium UPI",
            time: "07:30 - 09:00 WIB",
            materials: "Materi-Kuliah-Dhuha-2.pdf"
        },
        {
            week: "Minggu 3",
            date: "7 Maret 2026",
            topic: "Generasi Qurani",
            speaker: "Dr. Hj. Siti Maryam, M.Ag",
            location: "Auditorium UPI",
            time: "07:30 - 09:00 WIB",
            materials: "Materi-Kuliah-Dhuha-3.pdf"
        },
        {
            week: "Minggu 4",
            date: "14 Maret 2026",
            topic: "Dakwah di Era Digital",
            speaker: "Ustadz Fahmi Salim, M.Kom.I",
            location: "Auditorium UPI",
            time: "07:30 - 09:00 WIB",
            materials: "Materi-Kuliah-Dhuha-4.pdf"
        },
    ];

    return (
        <div>
            <Hero
                title="Kuliah Dhuha"
                subtitle="Kajian rutin pekanan untuk memperdalam pemahaman keislaman mahasiswa UPI"
                backgroundImage="/assets/kegiatan/kuliah-dhuha.svg"
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
                                                    <div className="text-lg font-bold">{new Date(schedule.date).getDate()}</div>
                                                    <div className="text-xs">{new Date(schedule.date).toLocaleDateString('id-ID', { month: 'short' })}</div>
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-semibold text-neutral-900 mb-1">
                                                        {schedule.topic}
                                                    </h4>
                                                    <div className="flex items-center text-sm text-neutral-600">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        {schedule.speaker}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 pl-24">
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
                                        <div className="flex items-center space-x-3">
                                            <button className="btn-secondary text-sm py-2">
                                                <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Materi
                                            </button>
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
