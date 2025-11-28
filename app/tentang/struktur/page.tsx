import Hero from "@/components/Hero";
import Image from "next/image";

const PengurusCard = ({ name, position, division, isLeader = false }: { name: string, position: string, division?: string, isLeader?: boolean }) => (
    <div className={`flex flex-col items-center text-center ${isLeader ? 'transform hover:scale-105 transition-transform duration-300' : ''}`}>
        <div className={`relative ${isLeader ? 'w-48 h-48 md:w-56 md:h-56' : 'w-32 h-32 md:w-40 md:h-40'} mb-4 rounded-full overflow-hidden border-4 ${isLeader ? 'border-primary-500 shadow-xl' : 'border-white shadow-lg'} bg-neutral-100`}>
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400">
                <svg className={`${isLeader ? 'w-20 h-20' : 'w-12 h-12'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
            {/* Uncomment when photos are ready */}
            {/* <Image src={`/assets/pengurus/${name.toLowerCase().replace(/ /g, '-')}.jpg`} alt={name} fill className="object-cover" /> */}
        </div>
        <h3 className={`${isLeader ? 'text-xl md:text-2xl' : 'text-lg'} font-bold text-neutral-900`}>{name}</h3>
        <p className={`${isLeader ? 'text-lg' : 'text-sm'} font-medium text-primary-600`}>{position}</p>
        {division && <p className="text-xs text-neutral-500 uppercase tracking-wide mt-1">{division}</p>}
    </div>
);

export default function StrukturPage() {
    const bidangList = [
        "Sekretaris Umum",
        "Bendahara Umum",
        "Kepesertaan",
        "Penjaminan dan Peningkatan Mutu Tutorial",
        "Pengembangan Sumber Daya Insani",
        "Ketutoran",
        "Bidang Pelaksana PAI",
        "Bidang Pelaksana SPAI",
        "Media Kreatif dan Informasi"
    ];

    return (
        <main>
            <Hero
                title="Struktur Kepengurusan"
                subtitle="Kabinet AL-FATH Periode 2025/2026"
                backgroundImage="/assets/bg/gedung-isola.svg"
            />

            <section className="section-academic bg-white">
                <div className="container-upi">
                    {/* Top Leaders */}
                    <div className="flex flex-col items-center mb-20">
                        <div className="mb-16">
                            <PengurusCard name="Nama Ketua Umum" position="Ketua Umum" isLeader={true} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-center w-full">
                            <PengurusCard name="Nama Waketum I" position="Wakil Ketua Umum I" isLeader={true} />
                            <PengurusCard name="Nama Waketum II" position="Wakil Ketua Umum II" isLeader={true} />
                        </div>
                    </div>

                    {/* Bidang-Bidang */}
                    <div className="space-y-20">
                        {bidangList.map((bidang, index) => (
                            <div key={index} className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-neutral-200"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-white text-lg font-bold text-neutral-900 uppercase tracking-wider">
                                        {bidang}
                                    </span>
                                </div>

                                <div className="mt-10 flex flex-col md:flex-row justify-center gap-12 md:gap-24">
                                    <PengurusCard name={`Ketua ${bidang}`} position="Ketua Bidang" division={bidang} />
                                    <PengurusCard name={`Wakil ${bidang}`} position="Wakil Ketua Bidang" division={bidang} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
