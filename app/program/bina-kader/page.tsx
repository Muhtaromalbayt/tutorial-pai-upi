import Hero from "@/components/Hero";
import Link from "next/link";

const quickLinks = [
    {
        title: "IQOB",
        subtitle: "Lihat Panduan IQOB di Sini",
        url: "https://docs.google.com/document/d/1jiB84pmvKZSP2no5CxxWxKgL-az-JUZTonZWYjxg7MY/edit?usp=drivesdk",
        color: "bg-red-500 hover:bg-red-600",
    },
    {
        title: "SIPRES TUTORIAL",
        subtitle: "QR Presensi, Perizinan, Sanggah",
        url: "https://bio.site/sipresbinderxli",
        color: "bg-amber-100 hover:bg-amber-200 text-sky-600",
    },
    {
        title: "FBI (For Binder's Information)",
        subtitle: "Panduan Bina Kader",
        url: "https://drive.google.com/drive/folders/1No1fiKbFD2OACPPfDO-_roZzcrz3JHhJ?usp=drive_link",
        color: "bg-sky-500 hover:bg-sky-600",
    },
    {
        title: "DATA PESERTA BINA KADER",
        subtitle: "Cek Data dan Kelompok",
        url: "https://docs.google.com/spreadsheets/d/1WqwU6QTcGuQ5lUnVrGAU35CO4_M1Xc96SeGzc98fXJE/edit?usp=sharing",
        color: "bg-amber-100 hover:bg-amber-200 text-sky-600",
    },
    {
        title: "PROJECT SOSPRO",
        subtitle: "Kumpulkan project kelompokmu di sini!",
        url: "https://drive.google.com/folderview?id=1YpQN7ygIm5MXac3OypJCNlbyGfStA6I5",
        color: "bg-sky-500 hover:bg-sky-600",
    },
];

const contactPersons = [
    { name: "CP Ikhwan (Faiz)", phone: "+62895400530007" },
    { name: "CP Akhwat (Nurul)", phone: "+6285182924117" },
];

export default function BinaKaderPage() {
    return (
        <div>
            <Hero
                title="Bina Kader XLI"
                subtitle="BISA! BISA! BISA! YES! ALLAHUAKBAR!!"
                variant="gradient"
            />

            {/* Quick Links Section */}
            <section className="py-16 bg-gradient-to-b from-sky-900 to-sky-800">
                <div className="container-upi max-w-4xl">
                    <h2 className="text-2xl font-bold text-white text-center mb-8">
                        Akses Cepat Binder XLI
                    </h2>
                    <div className="space-y-4">
                        {quickLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block w-full p-4 rounded-xl text-center transition-all transform hover:scale-[1.02] shadow-lg ${link.color} ${!link.color.includes('text-') ? 'text-white' : ''}`}
                            >
                                <div className="font-bold text-lg uppercase tracking-wide">{link.title}</div>
                                <div className={`text-sm mt-1 ${link.color.includes('text-') ? 'opacity-80' : 'text-white/80'}`}>
                                    {link.subtitle}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Person Section */}
            <section className="py-12 bg-sky-800">
                <div className="container-upi max-w-4xl">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {contactPersons.map((cp, i) => (
                            <Link
                                key={i}
                                href={`https://wa.me/${cp.phone.replace(/\+/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all transform hover:scale-105 shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span className="font-semibold">{cp.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Info Section */}
            <section className="section-academic">
                <div className="container-upi max-w-6xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                            Tentang Program Bina Kader
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Bina Kader adalah program pembinaan intensif untuk mempersiapkan kader-kader Muslim yang memiliki kompetensi kepemimpinan, pemahaman Islam yang kuat, dan komitmen untuk berkontribusi dalam dakwah kampus.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="card-academic p-8">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-6">Materi Pembinaan</h3>
                            <ul className="space-y-3">
                                {[
                                    "Aqidah dan Tauhid",
                                    "Fiqih Ibadah dan Muamalah",
                                    "Sirah Nabawiyah",
                                    "Kepemimpinan Islam",
                                    "Manajemen Organisasi",
                                    "Public Speaking & Komunikasi",
                                    "Entrepreneurship Islami",
                                    "Social Project Planning"
                                ].map((materi, i) => (
                                    <li key={i} className="flex items-center text-neutral-700">
                                        <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {materi}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-academic p-8">
                            <h3 className="text-xl font-semibold text-neutral-900 mb-6">Jadwal Program</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-neutral-50 rounded-lg">
                                    <div className="font-semibold text-neutral-900 mb-1">Batch 3 (Upcoming)</div>
                                    <div className="text-sm text-neutral-600 mb-2">1 Maret - 30 Juni 2026</div>
                                    <div className="text-sm text-neutral-700">Setiap hari Sabtu, 08:00 - 16:00 WIB</div>
                                    <div className="text-sm text-primary-600 font-medium mt-2">Pendaftaran: 15 - 28 Februari</div>
                                </div>
                                <div className="p-4 bg-primary-50 rounded-lg border-l-4 border-primary-600">
                                    <div className="font-semibold text-neutral-900 mb-2">Syarat Pendaftaran:</div>
                                    <ul className="text-sm text-neutral-700 space-y-1">
                                        <li>• Mahasiswa aktif UPI</li>
                                        <li>• Minimal semester 2</li>
                                        <li>• Komitmen mengikuti seluruh sesi</li>
                                        <li>• Mengisi formulir pendaftaran</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
