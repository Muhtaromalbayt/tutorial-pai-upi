"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import { useState, useEffect } from "react";

// Types
interface Member {
    id: string;
    name: string;
    position: string;
    division: string; // "BPH" for top leaders, or specific division name
    image_url?: string; // Should be photo_url from DB, need mapping or adjust here
    photo_url?: string; // DB field name
    order?: number; // Optional sorting order
}

interface Department {
    name: string;
    members: Member[];
}

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

const DepartmentAccordion = ({ dept, index }: { dept: Department, index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Sort logic within department: Ketua -> Wakil -> Anggota
    // Using simple heuristic matches
    const sortedMembers = [...dept.members].sort((a, b) => {
        const getScore = (pos: string) => {
            const p = pos.toLowerCase();
            if (p.includes("ketua") && !p.includes("wakil")) return 1;
            if (p.includes("wakil ketua") || p.includes("sekretaris") || p.includes("bendahara")) return 2;
            return 3;
        };
        return getScore(a.position) - getScore(b.position);
    });

    const leaders = sortedMembers.filter(m =>
        m.position.toLowerCase().includes("ketua") ||
        m.position.toLowerCase().includes("wakil") ||
        m.position.toLowerCase().includes("sekretaris") ||
        m.position.toLowerCase().includes("bendahara")
    );
    const staff = sortedMembers.filter(m => !leaders.includes(m));

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
                    {/* Leaders */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-3xl mx-auto justify-items-center mb-12">
                        {leaders.length > 0 ? (
                            leaders.map((member) => (
                                <PengurusCard
                                    key={member.id}
                                    name={member.name}
                                    position={member.position}
                                    division={dept.name}
                                    image={member.photo_url || member.image_url}
                                />
                            ))
                        ) : (
                            <div className="col-span-2 text-center text-neutral-500 italic">Belum ada pimpinan bidang ini.</div>
                        )}
                    </div>

                    {/* Staff Members */}
                    {staff.length > 0 && (
                        <div className="max-w-5xl mx-auto px-4">
                            <h4 className="text-center text-lg font-semibold text-neutral-500 mb-6 uppercase tracking-wide">Anggota Bidang</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {staff.map((member) => (
                                    <div key={member.id} className="bg-neutral-50 p-4 rounded-xl text-center hover:bg-white hover:shadow-sm transition-all border border-neutral-100">
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
    const [departments, setDepartments] = useState<Department[]>([]);
    const [topLeaders, setTopLeaders] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/cabinet");
            const data = await res.json() as any;

            if (data.members) {
                const allMembers: Member[] = data.members;

                // 1. Extract Top Leaders (BPH Inti usually)
                // Assuming "Ketua Umum" and "Wakil Ketua Umum" are top leaders irrespective of division, 
                // OR they are in a specific division like "BPH" or "Inti".
                // Let's rely on position names for top leaders logic for now.

                const isTopLeader = (pos: string) => {
                    const low = pos.toLowerCase();
                    return low.includes("ketua umum") || low.includes("wakil ketua umum");
                };

                const tops = allMembers.filter(m => isTopLeader(m.position));

                // Sort tops: Ketua Umum first, then Waketums
                tops.sort((a, b) => {
                    if (a.position.toLowerCase().includes("ketua umum") && !a.position.toLowerCase().includes("wakil")) return -1;
                    if (b.position.toLowerCase().includes("ketua umum") && !b.position.toLowerCase().includes("wakil")) return 1;
                    return 0;
                });

                setTopLeaders(tops);

                // 2. Group the rest by Division
                const nonTops = allMembers.filter(m => !isTopLeader(m.position));

                const grouped = nonTops.reduce((acc, member) => {
                    if (!member.division) return acc;
                    if (!acc[member.division]) {
                        acc[member.division] = [];
                    }
                    acc[member.division].push(member);
                    return acc;
                }, {} as Record<string, Member[]>);

                const deptArray: Department[] = Object.keys(grouped).map(key => ({
                    name: key,
                    members: grouped[key]
                }));

                // Sort departments alphabetically or custom order if needed
                deptArray.sort((a, b) => a.name.localeCompare(b.name));

                setDepartments(deptArray);
            }
        } catch (error) {
            console.error("Failed to fetch cabinet members:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main>
                <Hero title="Struktur Kepengurusan" subtitle="Loading..." />
                <div className="py-20 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                </div>
            </main>
        )
    }

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
                    {topLeaders.length > 0 && (
                        <div className="flex flex-col items-center mb-24 space-y-12">
                            {/* Generic render for Top Leaders, assuming 1 Ketua and others below */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl justify-items-center items-end">
                                {/* Rough layout logic: Try to center the Chief */}
                                {topLeaders.map((leader, idx) => (
                                    <div key={leader.id} className={topLeaders.length === 1 ? "col-span-3" : (idx === 0 ? "col-span-3 md:col-start-2 -mb-8 z-10 scale-110" : "col-span-3 md:col-span-1")}>
                                        <PengurusCard
                                            name={leader.name}
                                            position={leader.position}
                                            isLeader={true}
                                            image={leader.photo_url || leader.image_url}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bidang-Bidang with Accordion */}
                    <div className="space-y-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Bidang Kepengurusan</h2>
                            <p className="text-neutral-600">Klik nama bidang untuk melihat anggota</p>
                        </div>
                        {departments.length > 0 ? (
                            departments.map((dept, index) => (
                                <DepartmentAccordion key={index} dept={dept} index={index} />
                            ))
                        ) : (
                            <div className="text-center text-neutral-500">Belum ada data bidang.</div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
