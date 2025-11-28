import Hero from "@/components/Hero";

export default function VisiPage() {
    return (
        <div>
            <Hero
                title="Visi Tutorial PAI"
                subtitle="Mewujudkan generasi Muslim yang beradab, berilmu, dan berperadaban"
                height="normal"
            />

            <section className="section-academic">
                <div className="container-upi max-w-4xl">
                    <div className="card-academic p-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                            Visi Kabinet AL-FATH
                        </h2>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-center text-neutral-700 leading-relaxed mb-8 font-medium">
                                "Menjadi wadah pembelajaran Pendidikan Agama Islam yang transformatif dalam menumbuhkan adab, mengembangkan ilmu, dan menggerakkan peradaban Islam di lingkungan Universitas Pendidikan Indonesia"
                            </p>

                            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-lg mt-8">
                                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Penjelasan Visi</h3>
                                <ul className="space-y-3 text-neutral-700">
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong>Transformatif:</strong> Menghadirkan perubahan positif dan berkelanjutan dalam karakter dan kompetensi mahasiswa</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong>Menumbuhkan Adab:</strong> Membangun fondasi akhlak mulia sebagai dasar dari setiap ilmu dan tindakan</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong>Mengembangkan Ilmu:</strong> Mendorong kemajuan intelektual yang berlandaskan nilai-nilai Islam</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong>Menggerakkan Peradaban:</strong> Berkontribusi nyata dalam memajukan peradaban Islam modern</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
