import Hero from "@/components/Hero";

export default function BinaMentorPage() {
    return (
        <div>
            <Hero
                title="Bina Mentor"
                subtitle="Pengembangan Kompetensi Mentor Tutorial PAI"
                height="normal"
            />

            <section className="section-academic">
                <div className="container-upi max-w-6xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Program Bina Mentor
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Bina Mentor adalah program pelatihan dan pengembangan kompetensi bagi para mentor Tutorial PAI agar dapat memberikan pendampingan yang berkualitas dan berdampak kepada mentee.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                title: "Kompetensi Spiritual",
                                items: ["Tazkiyatun Nafs", "Keteladanan", "Adab Pendidik"]
                            },
                            {
                                title: "Kompetensi Pedagogik",
                                items: ["Metode Pembelajaran", "Classroom Management", "Assessment"]
                            },
                            {
                                title: "Kompetensi Sosial",
                                items: ["Komunikasi Efektif", "Empati & Counseling", "Team Building"]
                            }
                        ].map((competency, i) => (
                            <div key={i} className="card-academic p-8">
                                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{competency.title}</h3>
                                <ul className="space-y-2">
                                    {competency.items.map((item, j) => (
                                        <li key={j} className="flex items-center text-sm text-neutral-700">
                                            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="card-academic p-8 bg-neutral-50">
                        <h3 className="text-xl font-semibold text-neutral-900 mb-4 text-center">Jadwal Training Mentor</h3>
                        <div className="max-w-2xl mx-auto text-center">
                            <p className="text-neutral-700 mb-4">
                                Pelatihan mentor dilaksanakan setiap bulan dengan berbagi tema yang disesuaikan dengan kebutuhan pengembangan mentor.
                            </p>
                            <div className="text-sm text-neutral-600 mb-6">
                                <strong>Training Bulan Ini:</strong> Teknik Counseling untuk Mentor<br />
                                20 Maret 2026, 13:00 - 17:00 WIB
                            </div>
                            <button className="btn-primary">
                                Daftar Training
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
