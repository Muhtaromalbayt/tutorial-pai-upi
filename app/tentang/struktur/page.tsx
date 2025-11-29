import Hero from "@/components/Hero";
import Image from "next/image";

const PengurusCard = ({ name, position, division, isLeader = false, image }: { name: string, position: string, division?: string, isLeader?: boolean, image?: string }) => (
    <div className="flex flex-col items-center text-center group w-full max-w-[240px] mx-auto transform hover:-translate-y-2 transition-transform duration-300">
        <div className="relative w-full aspect-[3/4] mb-4 rounded-2xl overflow-hidden shadow-md bg-neutral-100">
            {image ? (
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="240px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className={`${isLeader ? 'text-xl font-extrabold' : 'text-lg font-bold'} text-neutral-900 leading-tight`}>{name}</h3>
        <p className={`${isLeader ? 'text-base font-semibold' : 'text-sm font-medium'} text-primary-600 mt-1`}>{position}</p>
        {division && <p className="text-xs text-neutral-500 uppercase tracking-wide mt-1">{division}</p>}
    </div>
);

export default function StrukturPage() {
    const departments = [
        {
            name: "Sekretaris Umum",
            members: [
                { name: "Dini Fatia N.H.", position: "Sekretaris Umum", image: "/assets/pengurus/dini-fatia.jpg" },
                { name: "M. Zalfa Izdihar", position: "Wakil Sekretaris Umum", image: "/assets/pengurus/m-zalfa.jpg" }
            ]
        },
        {
            name: "Bendahara Umum",
            members: [
                { name: "Rachma Cantika D.", position: "Bendahara Umum", image: "/assets/pengurus/rachma-cantika.jpg" },
                { name: "Alifia S.", position: "Wakil Bendahara Umum", image: "/assets/pengurus/alifia-s.jpg" }
            ]
        },
        { name: "Kepesertaan" },
        {
            name: "Penjaminan dan Peningkatan Mutu Tutorial",
            members: [
                { name: "Wisnu Atmojo", position: "Ketua Bidang", image: "/assets/pengurus/wisnu-atmojo.jpg" },
                { name: "Arwyn M. Sya'bani", position: "Wakil Ketua Bidang", image: "/assets/pengurus/arwyn-syabani.jpg" }
            ]
        },
        { name: "Pengembangan Sumber Daya Insani" },
        { name: "Ketutoran" },
        {
            name: "Bidang Pelaksana PAI",
            members: [
                { name: "Dea Apriliyani", position: "Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                { name: "Wakil BPPAI", position: "Wakil Ketua Bidang" }
            ]
        },
        { name: "Bidang Pelaksana SPAI" },
        { name: "Media Kreatif dan Informasi" }
    ];

    return (
        <main>
            <Hero
                title="Struktur Kepengurusan"
                subtitle="Kabinet AL-FATH Periode 2025/2026"
                backgroundImage="/assets/bg/gedung-isola.svg"
            />

            <section className="section-academic bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Leaders */}
                    <div className="flex flex-col items-center mb-24 space-y-12">
                        {/* Ketum */}
                        <div className="w-full flex justify-center">
                            <PengurusCard
                                name="Muhtarom Albayt"
                                position="Ketua Umum"
                                isLeader={true}
                                image="/assets/pengurus/ketum.jpg"
                            />
                        </div>
                        {/* Waketums */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full max-w-4xl justify-items-center">
                            <PengurusCard
                                name="Wakil Ketua I"
                                position="Wakil Ketua Umum I"
                                isLeader={true}
                                image="/assets/pengurus/waketum1.jpg"
                            />
                            <PengurusCard
                                name="Wakil Ketua II"
                                position="Wakil Ketua Umum II"
                                isLeader={true}
                                image="/assets/pengurus/waketum2.jpg"
                            />
                        </div>
                    </div>

                    {/* Bidang-Bidang */}
                    <div className="space-y-24">
                        {departments.map((dept, index) => (
                            <div key={index} className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-neutral-200"></div>
                                </div>
                                <div className="relative flex justify-center mb-12">
                                    <span className="px-6 py-2 bg-white text-xl font-bold text-neutral-900 uppercase tracking-wider border-2 border-neutral-100 rounded-full shadow-sm">
                                        {dept.name}
                                    </span>
                                </div>

                                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center ${dept.members && dept.members.length < 3 ? 'md:flex md:justify-center md:gap-12' : ''}`}>
                                    {dept.members ? (
                                        dept.members.map((member, idx) => (
                                            <PengurusCard
                                                key={idx}
                                                name={member.name}
                                                position={member.position}
                                                division={dept.name}
                                                image={member.image}
                                            />
                                        ))
                                    ) : (
                                        <>
                                            <PengurusCard name={`Ketua ${dept.name}`} position="Ketua Bidang" division={dept.name} />
                                            <PengurusCard name={`Wakil ${dept.name}`} position="Wakil Ketua Bidang" division={dept.name} />
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
