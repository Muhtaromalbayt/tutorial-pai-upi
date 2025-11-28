import Hero from "@/components/Hero";

export default function MisiPage() {
    return (
        <div>
            <Hero
                title="Misi Tutorial PAI"
                subtitle="Langkah strategis untuk mewujudkan visi Kabinet AL-FATH"
                height="normal"
            />

            <section className="section-academic">
                <div className="container-upi max-w-4xl">
                    <div className="card-academic p-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
                            Misi Kabinet AL-FATH
                        </h2>

                        <div className="space-y-6">
                            {[
                                {
                                    number: "01",
                                    title: "Pembinaan Akhlak dan Adab",
                                    desc: "Menyelenggarakan program pembinaan yang fokus pada pengembangan karakter Islami, akhlak mulia, dan adab dalam kehidupan sehari-hari mahasiswa"
                                },
                                {
                                    number: "02",
                                    title: "Pengembangan Ilmu Keislaman",
                                    desc: "Menyediakan ruang pembelajaran Pendidikan Agama Islam yang berkualitas, relevan, dan kontekstual dengan perkembangan zaman"
                                },
                                {
                                    number: "03",
                                    title: "Pemberdayaan Kader Muslim",
                                    desc: "Membangun sistem kaderisasi yang berkelanjutan untuk mencetak pemimpin Muslim yang kompeten, berintegritas, dan visioner"
                                },
                                {
                                    number: "04",
                                    title: "Peningkatan Kualitas Mentoring",
                                    desc: "Mengoptimalkan program mentoring sebagai wadah pendampingan spiritual dan akademik mahasiswa secara personal"
                                },
                                {
                                    number: "05",
                                    title: "Kolaborasi dan Sinergi",
                                    desc: "Membangun kerjasama dengan berbagai pihak untuk memperluas dampak positif Tutorial PAI di lingkungan kampus dan masyarakat"
                                },
                                {
                                    number: "06",
                                    title: "Inovasi Program",
                                    desc: "Menghadirkan program-program inovatif yang menarik, bermanfaat, dan sesuai dengan kebutuhan mahasiswa kontemporer"
                                },
                            ].map((misi, index) => (
                                <div key={index} className="flex items-start space-x-6 p-6 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                                            {misi.number}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                            {misi.title}
                                        </h3>
                                        <p className="text-neutral-600 leading-relaxed">
                                            {misi.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
