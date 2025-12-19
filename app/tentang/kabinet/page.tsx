import Hero from "@/components/Hero";
import Button from "@/components/Button";

export default function KabinetPage() {
    const coreValues = [
        {
            letter: "F",
            title: "Freedom",
            desc: "Kemerdekaan dalam berpikir dan bertindak yang berlandaskan pada nilai-nilai ketauhidan, membebaskan diri dari belenggu keduniawian untuk mencapai ridha Allah.",
            color: "from-blue-500 to-indigo-600"
        },
        {
            letter: "A",
            title: "Adil",
            desc: "Menempatkan segala sesuatu pada tempatnya. Berkomitmen pada kebenaran dan kesetaraan dalam setiap langkah dakwah dan pelayanan.",
            color: "from-emerald-500 to-teal-600"
        },
        {
            letter: "T",
            title: "Tarbiyah",
            desc: "Proses pendidikan dan pembinaan yang berkelanjutan untuk membentuk karakter (syakhshiyah) Islamiyah yang kokoh.",
            color: "from-orange-500 to-red-600"
        },
        {
            letter: "H",
            title: "Himmah wa Hubb",
            desc: "Semangat yang tinggi disertai dengan cinta. Melayani dengan hati dan tekad baja untuk kemajuan Tutorial PAI.",
            color: "from-purple-500 to-pink-600"
        }
    ];

    return (
        <div className="bg-neutral-50 min-h-screen">
            <Hero
                title="Kabinet AL-FATH"
                subtitle="Fostering Adab through Thought and Hearth"
                height="normal"
            />

            {/* Section 1: Philosophy & Meaning */}
            <section className="py-24 relative overflow-hidden">
                <div className="container-upi relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fade-in-up">
                            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-primary-600 uppercase bg-primary-50 rounded-full">
                                Filosofi & Makna
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                                Membawa Semangat <br />
                                <span className="text-primary-600 italic">Kemenangan Baru</span>
                            </h2>
                            <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                                <p>
                                    <strong>AL-FATH</strong> yang secara etimologi bermakna <em>"pembukaan"</em> atau <em>"kemenangan"</em>, merepresentasikan visi besar kami untuk membuka lembaran baru yang lebih gemilang dalam dakwah kampus.
                                </p>
                                <p>
                                    Latar belakang penamaan ini didasari oleh semangat untuk menghadirkan solusi kreatif atas tantangan zaman, menjadikan Tutorial PAI sebagai wadah yang inklusif namun tetap kokoh dalam memegang prinsip.
                                </p>
                                <div className="p-6 bg-white border-l-4 border-primary-600 shadow-sm rounded-r-xl">
                                    <p className="font-heading text-xl text-neutral-800 font-semibold italic">
                                        "Menumbuhkan Adab, Menggerakkan Peradaban"
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative animate-reveal delay-200">
                            <div className="aspect-square bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-12 flex flex-col justify-center items-center text-center shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                                <h3 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                                    AL-FATH
                                </h3>
                                <p className="text-xl md:text-2xl text-neutral-300 font-medium tracking-wide max-w-md">
                                    <span className="text-primary-400">F</span>ostering <span className="text-primary-400">A</span>dab through <span className="text-primary-400">T</span>hought and <span className="text-primary-400">H</span>earth
                                </p>
                                <div className="mt-12 h-1 w-24 bg-primary-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: 4 Core Values (FATH) */}
            <section className="py-24 bg-white">
                <div className="container-upi">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                            4 Core Values (FATH)
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Nilai-nilai utama yang kami junjung tinggi dalam setiap detak langkah perjuangan Kabinet Al Fath.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((val, idx) => (
                            <div
                                key={idx}
                                className={`group p-8 rounded-2xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up`}
                                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${val.color} flex items-center justify-center text-white text-3xl font-black mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    {val.letter}
                                </div>
                                <h4 className="text-2xl font-bold text-neutral-900 mb-4">
                                    {val.title}
                                </h4>
                                <p className="text-neutral-600 leading-relaxed">
                                    {val.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Closing/CTA */}
            <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-pattern-academic"></div>
                <div className="container-upi relative z-10 text-center">
                    <div className="max-w-4xl mx-auto animate-fade-in-up">
                        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                            Siap Melangkah Menuju <br />
                            Tutorial PAI yang Beradab
                        </h2>
                        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                            Mari bersama Kabinet Al Fath, kita bangun peradaban ilmu yang berlandaskan kasih sayang dan ketaqwaan.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button href="/tentang/struktur" variant="primary" className="!px-10 !py-4 text-lg">
                                Lihat Struktur Organisasi
                            </Button>
                            <Button href="/tentang/sejarah" variant="secondary" className="!bg-transparent !text-white !border-white/20 hover:!bg-white/10 !px-10 !py-4 text-lg">
                                Pelajari Sejarah
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
