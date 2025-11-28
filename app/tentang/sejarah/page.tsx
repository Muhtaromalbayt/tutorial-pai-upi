import Hero from "@/components/Hero";

export default function SejarahPage() {
    const timeline = [
        {
            year: "2010",
            title: "Pendirian Tutorial PAI",
            desc: "Tutorial PAI SPAI UPI didirikan sebagai wadah pembelajaran Pendidikan Agama Islam di lingkungan kampus UPI."
        },
        {
            year: "2015",
            title: "Pengembangan Program",
            desc: "Peluncuran program Mentoring dan Bina Kader sebagai program unggulan pembinaan mahasiswa."
        },
        {
            year: "2020",
            title: "Transformasi Digital",
            desc: "Adaptasi program menjadi hybrid (online & offline) di masa pandemi, memperluas jangkauan dakwah kampus."
        },
        {
            year: "2023",
            title: "Kolaborasi & Sinergi",
            desc: "Membangun kemitraan dengan organisasi Islam lainnya untuk memperkuat ekosistem dakwah kampus."
        },
        {
            year: "2025",
            title: "Kabinet AL-FATH",
            desc: "Launching kabinet AL-FATH dengan tema 'Menumbuhkan Adab, Menggerakkan Peradaban' sebagai era baru Tutorial PAI."
        },
    ];

    return (
        <div>
            <Hero
                title="Sejarah Tutorial PAI"
                subtitle="Perjalanan Tutorial PAI SPAI UPI"
                height="normal"
            />

            <section className="section-academic">
                <div className="container-upi max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Timeline Sejarah
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                            Lebih dari satu dekade, Tutorial PAI telah berkontribusi dalam membentuk karakter Muslim mahasiswa UPI melalui berbagai program yang berkesinambungan.
                        </p>
                    </div>

                    {/* Vertical Timeline */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 transform md:-translate-x-1/2"></div>

                        {/* Timeline Items */}
                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    {/* Year Badge */}
                                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                                        {item.year}
                                    </div>

                                    {/* Content Card */}
                                    <div className={`ml-24 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                                        <div className="card-academic p-6 hover:shadow-xl transition-shadow">
                                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-neutral-600">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <div className="mt-20 pt-16 border-t border-neutral-200">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                            Pencapaian Tutorial PAI
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-8 bg-primary-50 rounded-lg">
                                <div className="text-5xl font-bold text-primary-700 mb-2">15+</div>
                                <div className="text-neutral-700 font-medium">Tahun Berpengalaman</div>
                            </div>
                            <div className="text-center p-8 bg-secondary-50 rounded-lg">
                                <div className="text-5xl font-bold text-secondary-700 mb-2">2000+</div>
                                <div className="text-neutral-700 font-medium">Alumni Terbina</div>
                            </div>
                            <div className="text-center p-8 bg-accent-50 rounded-lg">
                                <div className="text-5xl font-bold text-accent-700 mb-2">50+</div>
                                <div className="text-neutral-700 font-medium">Program per Semester</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
