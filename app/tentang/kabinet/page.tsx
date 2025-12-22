"use client";

import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { usePlaceholderPhoto } from "@/lib/use-placeholder-photo";

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
            color: "from-rose-500 to-red-600" // Changed to Red/Rose to avoid purple
        }
    ];

    return (
        <div className="bg-neutral-50 min-h-screen">
            <Hero
                title="Kabinet AL-FATH"
                subtitle="Menumbuhkan Adab, Menggerakkan Peradaban"
                height="normal"
                backgroundImage="/assets/kabinet/hero.png"
            />

            {/* Section 1: Storytelling - Generation & Philosophy */}
            <section className="py-24 relative overflow-hidden">
                <div className="container-upi relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="animate-fade-in-up">
                            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-primary-600 uppercase bg-primary-50 rounded-full">
                                Filosofi Kabinet
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
                                Membangun Generasi yang <br />
                                <span className="text-primary-600 italic">Pantas Menerima Kemenangan</span>
                            </h2>
                            <p className="text-xl text-neutral-500 font-medium italic mb-8">
                                "Victory awaits those who serve, believe, and prepare."
                            </p>

                            <div className="prose prose-lg text-neutral-600 leading-relaxed space-y-6">
                                <h3 className="text-2xl font-bold text-neutral-800">
                                    Mengapa Sholahuddin Al-Ayubi mampu membebaskan Baitul Maqdis?
                                </h3>
                                <p>
                                    Sejarah seringkali hanya menyorot sosok sang Jenderal. Namun, rahasia terbesar kemenangan Al-Fath (Pembebasan) itu terletak pada pasukannya. Dikatakan bahwa pasukan Sholahuddin adalah generasi yang unik; di mana jika Sholahuddin gugur hari itu, maka siapa saja di antara pasukannya memiliki kapasitas, keimanan, dan visi yang sama besarnya untuk menggantikan posisinya memimpin perjuangan.
                                </p>
                                <p>
                                    Itulah semangat yang kami bawa di Kabinet AL-FATH.
                                </p>
                                <p>
                                    Kami tidak sedang membangun panggung untuk satu orang. Kami sedang membangun sebuah ekosistem. Melalui nilai Freedom, Adil, Tarbiyah, dan Himmah wa Hubb, kami berikhtiar menempa setiap individu di Tutorial PAI agar memiliki kualitas "Pantas Menang".
                                </p>

                                <div className="p-6 bg-white border-l-4 border-primary-600 shadow-sm rounded-r-xl my-6">
                                    <p className="font-heading text-xl text-neutral-800 font-semibold italic">
                                        "Kemenangan dakwah kampus bukan tentang seberapa hebat ketua umumnya, tapi seberapa siap kita semua—sebagai satu tubuh—untuk membuka lembaran baru peradaban dengan adab dan ilmu."
                                    </p>
                                </div>

                                <p className="font-semibold text-neutral-800">
                                    Di sini, setiap kita adalah pemimpin. Di sini, kita memantaskan diri. Bersama AL-FATH, mari menjemput kemenangan itu.
                                </p>
                            </div>
                        </div>

                        <div className="relative animate-reveal delay-200 lg:sticky lg:top-24">
                            {/* Leaders Illustration */}
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
                                <img
                                    src="/assets/kabinet/leaders.png"
                                    alt="Siapapun Bisa Memimpin"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">The Spirit of Leadership</p>
                                    <p className="text-lg font-medium">"Kapasitas, Keimanan, dan Visi yang sama besarnya."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: 4 Core Values (FATH) */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Background decoration using the generated 3D abstract image blurred */}
                <div className="absolute -left-64 top-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5 pointer-events-none">
                    <img src="/assets/kabinet/values.png" alt="" className="w-full h-full object-contain" />
                </div>

                <div className="container-upi relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                        <div className="flex-1 animate-fade-in-up">
                            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                                4 Core Values (FATH)
                            </h2>
                            <p className="text-lg text-neutral-600 max-w-2xl">
                                Nilai-nilai utama yang menjadi pondasi kokoh (Foundation) dan sarana bertumbuh (Growth) bagi setiap elemen di Kabinet Al Fath.
                            </p>
                        </div>
                        {/* 3D Visual for Values */}
                        <div className="w-full md:w-1/3 flex justify-center md:justify-end animate-fade-in-up delay-100">
                            <div className="w-48 h-48 md:w-64 md:h-64 relative">
                                <img
                                    src="/assets/kabinet/values.png"
                                    alt="Core Values Illustration"
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {coreValues.map((val, idx) => (
                            <div
                                key={idx}
                                className={`group p-8 rounded-2xl border border-neutral-100 bg-neutral-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up`}
                                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${val.color} flex items-center justify-center text-white text-2xl font-black mb-6 group-hover:scale-110 transition-transform duration-500 shadow-md`}>
                                    {val.letter}
                                </div>
                                <h4 className="text-xl font-bold text-neutral-900 mb-3">
                                    {val.title}
                                </h4>
                                <p className="text-sm text-neutral-600 leading-relaxed">
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
                {/* Red accent for Al-Fath branding */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                <div className="container-upi relative z-10 text-center">
                    <div className="max-w-4xl mx-auto animate-fade-in-up">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                            Siap Melangkah Menuju <br />
                            <span className="text-primary-500">Kemenangan Dakwah?</span>
                        </h2>
                        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                            Mari bersama Kabinet AL-FATH, kita buka lembaran baru peradaban dengan adab, ilmu, dan ukhuwah.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button href="/tentang/struktur" variant="primary" className="!px-10 !py-4 text-lg shadow-lg shadow-primary-900/50">
                                Lihat Struktur Organisasi
                            </Button>
                            <Button href="/tentang/sejarah" variant="secondary" className="!bg-transparent !text-white !border-white/20 hover:!bg-white/10 !px-10 !py-4 text-lg backdrop-blur-sm">
                                Pelajari Sejarah
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
