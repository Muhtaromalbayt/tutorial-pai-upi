import Hero from "@/components/Hero";

export default function DosenPage() {
    const dosenList = [
        {
            nama: "Prof. Dr. H. Abdul Majid, M.Pd",
            jabatan: "Ketua Penyelenggara",
            expertise: "Pendidikan Agama Islam",
            email: "abdulmajid@upi.edu"
        },
        {
            nama: "Dr. Hj. Siti Aisyah, M.Ag",
            jabatan: "Wakil Penyelenggara",
            expertise: "Akidah & Akhlak",
            email: "sitiaisyah@upi.edu"
        },
        {
            nama: "Dr. Muhammad Ridwan, M.Pd.I",
            jabatan: "Koordinator Akademik",
            expertise: "Fiqih & Ushul Fiqih",
            email: "mridwan@upi.edu"
        },
        {
            nama: "Dr. Hj. Fatimah Zahra, M.Ag",
            jabatan: "Pembina Mentoring",
            expertise: "Tafsir & Ulumul Quran",
            email: "fzahra@upi.edu"
        },
    ];

    return (
        <div>
            <Hero
                title="Dosen Penyelenggara"
                subtitle="Tim Pembina Tutorial PAI SPAI UPI"
                height="normal"
            />

            <section className="section-academic">
                <div className="container-upi max-w-6xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Dosen Pembina
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Para dosen pembina Tutorial PAI adalah akademisi berpengalaman yang membimbing dan mengawasi seluruh program kegiatan untuk memastikan kualitas dan relevansi dengan tujuan pendidikan Islam di UPI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {dosenList.map((dosen, index) => (
                            <div key={index} className="card-academic p-8">
                                <div className="flex items-start space-x-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                            {dosen.nama.split(' ').filter(n => n.includes('.'))[0]?.[0] || dosen.nama[0]}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                                            {dosen.nama}
                                        </h3>
                                        <div className="text-sm font-medium text-primary-600 mb-3">
                                            {dosen.jabatan}
                                        </div>
                                        <div className="space-y-2 text-sm text-neutral-600">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                                {dosen.expertise}
                                            </div>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <a href={`mailto:${dosen.email}`} className="text-primary-600 hover:text-primary-700">
                                                    {dosen.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
