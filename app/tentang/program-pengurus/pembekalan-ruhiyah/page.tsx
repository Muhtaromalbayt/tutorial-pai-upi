import Hero from "@/components/Hero";

export default function PembekalanRuhiyahPage() {
    return (
        <div>
            <Hero title="Pembekalan Ruhiyah" subtitle="Program Kabinet AL-FATH" height="normal" />
            <section className="section-academic">
                <div className="container-upi max-w-4xl">
                    <div className="card-academic p-12">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Pembekalan Ruhiyah</h2>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                            Program pembinaan spiritual intensif untuk memperkuat fondasi keimanan dan ketakwaan mahasiswa melalui berbagai kegiatan ruhiyah seperti tahajud bersama, tadarus, dan muhasabah.
                        </p>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-4">Kegiatan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["Tahajud Bersama", "Tadarus Al-Quran", "Muhasabah Mingguan", "Dzikir & Doa Bersama"].map((item, i) => (
                                <div key={i} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                                    <p className="text-neutral-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
