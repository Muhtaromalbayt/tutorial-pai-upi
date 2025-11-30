"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import { useState } from "react";

const PengurusCard = ({ name, position, division, isLeader = false, image }: { name: string, position: string, division?: string, isLeader?: boolean, image?: string }) => (
    <div className="flex flex-col items-center text-center group w-[240px] mx-auto transform hover:-translate-y-2 transition-transform duration-300">
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
        <h3 className={`${isLeader ? 'text-xl font-extrabold' : 'text-lg font-bold'} text-neutral-900 leading-tight min-h-[3.5rem] flex items-center justify-center`}>{name}</h3>
        <p className="text-sm font-medium text-primary-600 mt-1">{position}</p>
        {division && <p className="text-xs text-neutral-500 uppercase tracking-wide mt-1">{division}</p>}
    </div>
);

const DepartmentAccordion = ({ dept, index }: { dept: any, index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Pisahkan pimpinan (2 orang pertama) dan staf (sisanya)
    const leaders = dept.members ? dept.members.slice(0, 2) : [];
    const staff = dept.members ? dept.members.slice(2) : [];

    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-neutral-200"></div>
            </div>

            <div className="relative flex justify-center mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group px-6 py-3 bg-white text-lg font-bold text-neutral-900 uppercase tracking-wider border-2 border-neutral-100 rounded-full shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 flex items-center gap-3"
                >
                    <span>{dept.name}</span>
                    <svg
                        className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mb-12' : 'max-h-0 opacity-0'
                }`}>
                <div className="pt-8 pb-4">
                    {/* Leaders - Tetap pakai Foto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-3xl mx-auto justify-items-center mb-12">
                        {leaders.length > 0 ? (
                            leaders.map((member: any, idx: number) => (
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

                    {/* Staff Members - Hanya Nama */}
                    {staff.length > 0 && (
                        <div className="max-w-5xl mx-auto px-4">
                            <h4 className="text-center text-lg font-semibold text-neutral-500 mb-6 uppercase tracking-wide">Anggota Bidang</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {staff.map((member: any, idx: number) => (
                                    <div key={idx} className="bg-neutral-50 p-4 rounded-xl text-center hover:bg-white hover:shadow-sm transition-all border border-neutral-100">
                                        <div className="font-medium text-neutral-800">{member.name}</div>
                                        {member.position && member.position !== "Anggota" && (
                                            <div className="text-xs text-primary-600 mt-1">{member.position}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function StrukturPage() {
    const departments = [
        {
            name: "Sekretaris Umum",
            members: [
                { name: "Nina Wulandari", position: "Sekretaris Umum", image: "/assets/pengurus/dini-fatia.jpg" },
                { name: "Frans Fernando Aji Soko", position: "Wakil Sekretaris Umum", image: "/assets/pengurus/m-zalfa.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        },
        {
            name: "Bendahara Umum",
            members: [
                { name: "Rachma Cantika D.", position: "Bendahara Umum", image: "/assets/pengurus/rachma-cantika.jpg" },
                { name: "Dela Sari", position: "Wakil Bendahara Umum", image: "/assets/pengurus/alifia-s.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        },
        {
            name: "Kepesertaan",
            members: [
                { name: "Adnan Azizi", position: "Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                { name: "I'zaz Dzul Fahmi", position: "Wakil Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        },
        {
            name: "Penjaminan dan Peningkatan Mutu Tutorial",
            members: [
                { name: "Muhammad Fathan Mubina", position: "Ketua Bidang", image: "/assets/pengurus/wisnu-atmojo.jpg" },
                { name: "Muhammad Nashruddin A.", position: "Wakil Ketua Bidang", image: "/assets/pengurus/arwyn-syabani.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        },
        {
            name: "Pengembangan Sumber Daya Insani",
            members: [
                { name: "Fatimah Amir", position: "Ketua Bidang", image: "/assets/pengurus/wisnu-atmojo.jpg" },
                { name: "Ilfa Hanna M.", position: "Wakil Ketua Bidang", image: "/assets/pengurus/arwyn-syabani.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        },
        {
            name: "Ketutoran",
            members: [
                { name: "Nelsya Winanda", position: "Ketua Bidang", image: "/assets/pengurus/wisnu-atmojo.jpg" },
                { name: "Dika Fihara", position: "Wakil Ketua Bidang", image: "/assets/pengurus/arwyn-syabani.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        },
        {
            name: "Bidang Pelaksana PAI",
            members: [
                { name: "Nabila Nailah N.", position: "Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                { name: "Nabila Nailah N", position: "Wakil Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        },
        {
            name: "Bidang Pelaksana SPAI",
            members: [
                { name: "Ahmad Sholihin", position: "Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                { name: "Nabila Hakim Azzahra", position: "Wakil Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        },
        {
            name: "Media Kreatif dan Informasi",
            members: [
                { name: "Rafli Permana", position: "Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                { name: "Najwa Futhana Ramadhani", position: "Wakil Ketua Bidang", image: "/assets/pengurus/dea-apriliyani.jpg" },
                // Tambahkan anggota lainnya di sini
            ]
        }
    ];

    return (
        <main>
            <Hero
                title="Struktur Kepengurusan"
                subtitle="Kabinet AL-FATH Periode 2025/2026"
                backgroundImage="/assets/bg/gedung-isola.svg"
            />

            <section className="section-academic bg-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Top Leaders */}
                    <div className="flex flex-col items-center mb-24 space-y-12">
                        {/* Ketum */}
                        <div className="w-full flex justify-center">
                            <PengurusCard
                                name="Muhtarom Nur Rasyid"
                                position="Ketua Umum Tutorial PAI SPAI"
                                isLeader={true}
                                image="/assets/pengurus/ketum.jpg"
                            />
                        </div>
                        {/* Waketums */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-3xl justify-items-center">
                            <PengurusCard
                                name="Dika Rahman Firmansah"
                                position="Wakil Ketua Umum I"
                                isLeader={true}
                                image="/assets/pengurus/waketum1.jpg"
                            />
                            <PengurusCard
                                name="Adinda Zakiyah Ramadhanti"
                                position="Wakil Ketua Umum II"
                                isLeader={true}
                                image="/assets/pengurus/waketum2.jpg"
                            />
                        </div>
                    </div>

                    {/* Bidang-Bidang with Accordion */}
                    <div className="space-y-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Bidang Kepengurusan</h2>
                            <p className="text-neutral-600">Klik nama bidang untuk melihat anggota</p>
                        </div>
                        {departments.map((dept, index) => (
                            <DepartmentAccordion key={index} dept={dept} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
