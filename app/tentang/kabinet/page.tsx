import Hero from "@/components/Hero";
import Button from "@/components/Button";

export default function KabinetPage() {
    const kabinetMembers = [
        { nama: "Ahmad Zaki Mubarak", jabatan: "Ketua Umum", foto: "/assets/pengurus/ketua-umum.jpg" },
        { nama: "Siti Nur Aisyah", jabatan: "Wakil Ketua", foto: "/assets/pengurus/wakil.jpg" },
        { nama: "Muhammad Rizki", jabatan: "Sekretaris", foto: "/assets/pengurus/sekretaris.jpg" },
        { nama: "Fatimah Zahra", jabatan: "Bendahara", foto: "/assets/pengurus/bendahara.jpg" },
        { nama: "Huda Prasetyo", jabatan: "Kepala Dept. Keilmuan", foto: "/assets/pengurus/kabinet/keilmuan.jpg" },
        { nama: "Rina Safitri", jabatan: "Kepala Dept. Kaderisasi", foto: "/assets/pengurus/kabinet/kaderisasi.jpg" },
        { nama: "Firman Hidayat", jabatan: "Kepala Dept. Mentoring", foto: "/assets/pengurus/kabinet/mentoring.jpg" },
        { nama: "Laila Rahma", jabatan: "Kepala Dept. Kerohanian", foto: "/assets/pengurus/kabinet/kerohanian.jpg" },
        { nama: "Yoga Ramadan", jabatan: "Kepala Dept. Humas", foto: "/assets/pengurus/kabinet/humas.jpg" },
        { nama: "Dina Amalia", jabatan: "Kepala Dept. Kreatif", foto: "/assets/pengurus/kabinet/kreatif.jpg" },
        { nama: "Ilham Fauzi", jabatan: "Koordinator Kajian", foto: "/assets/pengurus/kabinet/kajian.jpg" },
        { nama: "Sarah Azizah", jabatan: "Koordinator Seminar", foto: "/assets/pengurus/kabinet/seminar.jpg" },
    ];

    return (
        <div>
            <Hero
                title="Kabinet AL-FATH"
                subtitle="Tim Pengurus Tutorial PAI Semester Genap 2025/2026"
                height="normal"
            />

            <section className="section-academic">
                <div className="container-upi">
                    {/* Introduction */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Mengenal Kabinet AL-FATH
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            AL-FATH yang bermakna <em>"pembukaan"</em> atau <em>"kemenangan"</em> merepresentasikan semangat kabinet ini untuk membuka peluang-peluang baru dalam dakwah kampus dan meraih kemenangan dalam menyebarkan nilai-nilai Islam. Kabinet AL-FATH menjunjung tinggi prinsip <strong>Menumbuhkan Adab, Menggerakkan Peradaban</strong> sebagai landasan setiap program dan kegiatan.
                        </p>
                    </div>

                    {/* Kabinet Members Grid */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                            Anggota Kabinet
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {kabinetMembers.map((member, index) => (
                                <div key={index} className="group">
                                    <div className="card-academic overflow-hidden">
                                        <div className="relative h-64 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                                            {/* Placeholder untuk foto */}
                                            <div className="text-white text-6xl font-bold">
                                                {member.nama.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </div>
                                            <div className="absolute inset-0 bg-neutral-900 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                        </div>
                                        <div className="p-5 text-center">
                                            <h4 className="text-lg font-semibold text-neutral-900 mb-1">
                                                {member.nama}
                                            </h4>
                                            <p className="text-sm text-primary-600 font-medium">
                                                {member.jabatan}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Values Section */}
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                            Nilai-Nilai Kabinet AL-FATH
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: (
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    ),
                                    title: "Adab & Akhlak",
                                    desc: "Mendahulukan pembinaan karakter dan akhlak mulia sebagai fondasi utama"
                                },
                                {
                                    icon: (
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    ),
                                    title: "Inovasi & Kreativitas",
                                    desc: "Menghadirkan program-program inovatif yang menarik dan berdampak"
                                },
                                {
                                    icon: (
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    ),
                                    title: "Kebersamaan & Ukhuwah",
                                    desc: "Membangun ikatan persaudaraan yang kuat dalam semangat Islam"
                                },
                            ].map((value, index) => (
                                <div key={index} className="card-academic p-8 text-center group hover:shadow-xl transition-all">
                                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                        {value.icon}
                                    </div>
                                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">
                                        {value.title}
                                    </h4>
                                    <p className="text-neutral-600">
                                        {value.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16">
                        <Button href="/tentang/struktur" variant="primary">
                            Lihat Struktur Lengkap
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
