import Hero from "@/components/Hero";

export default function TujuanPage() {
    return (
        <div>
            <Hero
                title="Tujuan Tutorial PAI"
                subtitle="Target pencapaian konkret Kabinet AL-FATH"
                height="normal"
            />

            <section className="section-academic">
                <div className="container-upi max-w-4xl">
                    <div className="card-academic p-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                            Tujuan Kabinet AL-FATH
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "Meningkatkan pemahaman dan pengamalan nilai-nilai Islam dalam kehidupan mahasiswa",
                                "Membentuk karakter mahasiswa yang beradab, berakhlak mulia, dan berintegritas tinggi",
                                "Mengembangkan kompetensi kepemimpinan Islam yang transformatif dan inklusif",
                                "Memfasilitasi pembelajaran PAI yang interaktif, inspiratif, dan aplikatif",
                                "Membangun komunitas Muslim kampus yang solid, produktif, dan berkontribusi",
                                "Mencetak kader-kader Muslim yang siap menjadi agen perubahan di masyarakat",
                                "Meningkatkan partisipasi aktif mahasiswa dalam kegiatan keislaman",
                                "Menghasilkan output program yang berkualitas dan berdampak luas",
                            ].map((tujuan, index) => (
                                <div key={index} className="flex items-start space-x-4 p-6 bg-white border-2 border-neutral-200 rounded-lg hover:border-primary-600 transition-colors group">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-primary-100 group-hover:bg-primary-600 text-primary-700 group-hover:text-white rounded-lg flex items-center justify-center font-bold transition-colors">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <p className="text-neutral-700 leading-relaxed pt-2">
                                        {tujuan}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-neutral-200">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-4 text-center">
                                Indikator Keberhasilan
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <div className="text-center p-6 bg-primary-50 rounded-lg">
                                    <div className="text-4xl font-bold text-primary-700 mb-2">90%</div>
                                    <div className="text-sm text-neutral-600">Tingkat Partisipasi Program</div>
                                </div>
                                <div className="text-center p-6 bg-secondary-50 rounded-lg">
                                    <div className="text-4xl font-bold text-secondary-700 mb-2">50+</div>
                                    <div className="text-sm text-neutral-600">Kader Terlatih</div>
                                </div>
                                <div className="text-center p-6 bg-accent-50 rounded-lg">
                                    <div className="text-4xl font-bold text-accent-700 mb-2">100+</div>
                                    <div className="text-sm text-neutral-600">Kegiatan Terselenggara</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
