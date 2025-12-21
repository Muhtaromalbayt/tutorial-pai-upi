import Hero from "@/components/Hero";

export default function MentoringPage() {
    return (
        <div>
            <Hero
                title="Mentoring"
                subtitle="Pendampingan intensif dalam kelompok kecil untuk pembinaan karakter"
                variant="gradient"
            />

            <section className="section-academic">
                <div className="container-upi max-w-6xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Program Mentoring
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Program mentoring memberikan pendampingan intensif oleh mentor berpengalaman untuk membantu mahasiswa dalam pengembangan spiritual, akademik, dan karakter Islami.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

                    <div className="card-academic p-8 bg-primary-50 border-l-4 border-primary-600">
                        <h3 className="text-xl font-semibold text-neutral-900 mb-4">Jadwal Pendaftaran</h3>
                        <p className="text-neutral-700 mb-4">
                            Pendaftaran mentoring batch baru dibuka setiap awal semester. Silakan hubungi Departemen Mentoring untuk informasi lebih lanjut.
                        </p>
                        <button className="btn-primary">
                            Daftar Sekarang
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
