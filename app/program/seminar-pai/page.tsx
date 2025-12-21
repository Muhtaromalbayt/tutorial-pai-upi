import Hero from "@/components/Hero";

export default function SeminarPAIPage() {
    return (
        <div>
            <Hero
                title="Seminar PAI"
                subtitle="Forum diskusi ilmiah untuk mengembangkan wawasan pendidikan agama Islam"
                variant="gradient"
            />

            <section className="section-academic">
                <div className="container-upi max-w-6xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Tentang Seminar PAI
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Seminar PAI adalah wadah diskusi interaktif tentang isu-isu kontemporer dalam pendidikan Islam. Program ini menghadirkan narasumber ahli dan memberikan ruang dialog untuk menemukan solusi berbasis nilai-nilai Islam.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="card-academic p-8">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Tema Seminar Bulan Ini</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-semibold text-neutral-900">AI dan Pendidikan Islam</h4>
                                        <p className="text-sm text-neutral-600">Pemanfaatan kecerdasan buatan dalam pembelajaran PAI</p>
                                        <p className="text-xs text-neutral-500 mt-1">25 Februari 2026, 13:00 WIB</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                                    <div>
                                        <h4 className="font-semibold text-neutral-900">Moderasi Beragama di Kampus</h4>
                                        <p className="text-sm text-neutral-600">Membangun toleransi dalam keberagaman</p>
                                        <p className="text-xs text-neutral-500 mt-1">10 Maret 2026, 13:00 WIB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-academic p-8">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Narasumber</h3>
                            <div className="space-y-4">
                                {[
                                    { nama: "Prof. Dr. Abdullah Hasan", expertise: "Ahli Pendidikan Islam" },
                                    { nama: "Dr. Arifin Tahir, M.Pd", expertise: "Teknologi Pendidikan" },
                                ].map((speaker, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {speaker.nama[0]}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-neutral-900">{speaker.nama}</div>
                                            <div className="text-sm text-neutral-600">{speaker.expertise}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
