import Hero from "@/components/Hero";

export default function BinaKaderPage() {
    return (
        <div>
            <Hero
                title="Bina Kader"
                subtitle="Program pengembangan potensi dan kepemimpinan mahasiswa"
                variant="gradient"
            />

            <section className="section-academic">
                <div className="container-upi max-w-6xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Program Bina Kader
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Bina Kader adalah program pembinaan intensif untuk mempersiapkan kader-kader Muslim yang memiliki kompetensi kepemimpinan, pemahaman Islam yang kuat, dan komitmen untuk berkontribusi dalam dakwah kampus.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="card-academic p-8">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-6">Materi Pembinaan</h3>
                            <ul className="space-y-3">
                                {[
                                    "Aqidah dan Tauhid",
                                    "Fiqih Ibadah dan Muamalah",
                                    "Sirah Nabawiyah",
                                    "Kepemimpinan Islam",
                                    "Manajemen Organisasi",
                                    "Public Speaking & Komunikasi",
                                    "Entrepreneurship Islami",
                                    "Social Project Planning"
                                ].map((materi, i) => (
                                    <li key={i} className="flex items-center text-neutral-700">
                                        <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {materi}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-academic p-8">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-6">Jadwal Program</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-neutral-50 rounded-lg">
                                    <div className="font-semibold text-neutral-900 mb-1">Batch 3 (Upcoming)</div>
                                    <div className="text-sm text-neutral-600 mb-2">1 Maret - 30 Juni 2026</div>
                                    <div className="text-sm text-neutral-700">Setiap hari Sabtu, 08:00 - 16:00 WIB</div>
                                    <div className="text-sm text-primary-600 font-medium mt-2">Pendaftaran: 15 - 28 Februari</div>
                                </div>
                                <div className="p-4 bg-primary-50 rounded-lg border-l-4 border-primary-600">
                                    <div className="font-semibold text-neutral-900 mb-2">Syarat Pendaftaran:</div>
                                    <ul className="text-sm text-neutral-700 space-y-1">
                                        <li>• Mahasiswa aktif UPI</li>
                                        <li>• Minimal semester 2</li>
                                        <li>• Komitmen mengikuti seluruh sesi</li>
                                        <li>• Mengisi formulir pendaftaran</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="btn-primary mr-4">
                            Daftar Bina Kader
                        </button>
                        <button className="btn-secondary">
                            Download Silabus
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
