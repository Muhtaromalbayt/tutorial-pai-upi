"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import { useState, useEffect } from "react";

// Types - camelCase to match Drizzle ORM response
interface Member {
    id: string;
    name: string;
    position: string;
    division: string;
    programStudi?: string;
    photoUrl?: string;
    orderIndex?: number;
}

interface Department {
    name: string;
    members: Member[];
}

// Responsive Member Card Component
const MemberCard = ({
    name,
    position,
    programStudi,
    photoUrl,
    isLeader = false,
    size = "normal"
}: {
    name: string;
    position: string;
    programStudi?: string;
    photoUrl?: string;
    isLeader?: boolean;
    size?: "small" | "normal" | "large";
}) => {
    const sizeClasses = {
        small: "w-full max-w-[160px]",
        normal: "w-full max-w-[200px]",
        large: "w-full max-w-[240px]"
    };

    const imageSizes = {
        small: "aspect-[3/4]",
        normal: "aspect-[3/4]",
        large: "aspect-[3/4]"
    };

    return (
        <div className={`flex flex-col items-center text-center group ${sizeClasses[size]} mx-auto`}>
            <div className={`relative w-full ${imageSizes[size]} mb-3 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-neutral-100 to-neutral-200 transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}>
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            // Hide broken image and show fallback
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                        }}
                    />
                ) : null}
                {/* Fallback - shown when no photo or on error */}
                <div
                    className={`absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 text-primary-400 ${photoUrl ? 'hidden' : 'flex'}`}
                >
                    <svg className="w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-xs font-medium text-primary-500">Foto Belum Tersedia</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Position Badge */}
            {isLeader && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 mb-2">
                    {position}
                </span>
            )}

            <h3 className={`${isLeader ? 'text-base sm:text-lg font-bold' : 'text-sm sm:text-base font-semibold'} text-neutral-900 leading-tight line-clamp-2`}>
                {name}
            </h3>

            {!isLeader && position && position !== "Anggota" && (
                <p className="text-xs font-medium text-primary-600 mt-1">{position}</p>
            )}

            {programStudi && (
                <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{programStudi}</p>
            )}
        </div>
    );
};

// Department Section with Accordion
const DepartmentSection = ({ dept, isOpen, onToggle }: {
    dept: Department;
    isOpen: boolean;
    onToggle: () => void;
}) => {
    // Sort members: Ketua Bidang -> Wakil Ketua -> Anggota
    const sortedMembers = [...dept.members].sort((a, b) => {
        const getScore = (pos: string) => {
            const p = pos.toLowerCase();
            if (p.includes("ketua bidang") && !p.includes("wakil")) return 1;
            if (p.includes("wakil ketua bidang")) return 2;
            if (p.includes("ketua") && !p.includes("wakil")) return 3;
            if (p.includes("wakil")) return 4;
            return 5;
        };
        return getScore(a.position) - getScore(b.position);
    });

    const leaders = sortedMembers.filter(m => {
        const p = m.position.toLowerCase();
        return p.includes("ketua") || p.includes("wakil");
    });
    const members = sortedMembers.filter(m => !leaders.includes(m));

    return (
        <div className="border-b border-neutral-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full py-4 px-4 sm:px-6 flex items-center justify-between bg-white hover:bg-neutral-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 text-primary-600 text-sm font-bold">
                        {dept.members.length}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-neutral-900">{dept.name}</span>
                </div>
                <svg
                    className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 sm:px-6 pb-6 pt-2">
                    {/* Leaders Grid - Centered */}
                    {leaders.length > 0 && (
                        <div className="mb-6">
                            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                                {leaders.map((member) => (
                                    <MemberCard
                                        key={member.id}
                                        name={member.name}
                                        position={member.position}
                                        programStudi={member.programStudi}
                                        photoUrl={member.photoUrl}
                                        isLeader={true}
                                        size="normal"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Members Grid */}
                    {members.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 text-center">
                                Anggota ({members.length})
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {members.map((member) => (
                                    <div key={member.id} className="bg-neutral-50 p-3 rounded-xl text-center hover:bg-white hover:shadow-sm transition-all border border-neutral-100">
                                        <div className="font-medium text-neutral-800 text-sm line-clamp-2">{member.name}</div>
                                        {member.programStudi && (
                                            <div className="text-xs text-neutral-500 mt-1 line-clamp-1">{member.programStudi}</div>
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
    const [openDepts, setOpenDepts] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/cabinet");
            const data = await res.json() as { members?: Member[] };

            if (data.members) {
                const allMembers: Member[] = data.members;

                // Extract Top Leaders (TriCore: Ketua Umum, Wakil Ketua Umum)
                const isTopLeader = (pos: string, div: string) => {
                    const low = pos.toLowerCase();
                    const divLow = div?.toLowerCase() || "";
                    return low.includes("ketua umum") ||
                        (divLow.includes("tricore") && (low.includes("ketua") || low.includes("wakil")));
                };

                const tops = allMembers.filter(m => isTopLeader(m.position, m.division));

                // Sort: Ketua Umum first, then Wakil Ketua Umum I, then II
                tops.sort((a, b) => {
                    const getOrder = (pos: string) => {
                        const low = pos.toLowerCase();
                        if (low.includes("ketua umum") && !low.includes("wakil")) return 1;
                        if (low.includes("wakil ketua umum i") && !low.includes("ii")) return 2;
                        if (low.includes("wakil ketua umum ii")) return 3;
                        if (low.includes("wakil ketua umum")) return 2;
                        return 4;
                    };
                    return getOrder(a.position) - getOrder(b.position);
                });

                setTopLeaders(tops);

                // Group rest by Division
                const nonTops = allMembers.filter(m => !isTopLeader(m.position, m.division));

                const grouped = nonTops.reduce((acc, member) => {
                    if (!member.division) return acc;
                    if (!acc[member.division]) {
                        acc[member.division] = [];
                    }
                    acc[member.division].push(member);
                    return acc;
                }, {} as Record<string, Member[]>);

                // Custom sort order for departments
                const deptOrder = [
                    "Sekretaris Umum",
                    "Bendahara Umum",
                    "Pelaksana PAI",
                    "Pelaksana SPAI",
                    "PSDI",
                    "Kepesertaan",
                    "Media Kreatif Informasi",
                    "Ketutoran",
                    "Penjaminan Mutu"
                ];

                const deptArray: Department[] = Object.keys(grouped)
                    .filter(key => key.toLowerCase() !== "tricore")
                    .map(key => ({
                        name: key,
                        members: grouped[key]
                    }))
                    .sort((a, b) => {
                        const aIdx = deptOrder.findIndex(d => d.toLowerCase() === a.name.toLowerCase());
                        const bIdx = deptOrder.findIndex(d => d.toLowerCase() === b.name.toLowerCase());
                        if (aIdx === -1 && bIdx === -1) return a.name.localeCompare(b.name);
                        if (aIdx === -1) return 1;
                        if (bIdx === -1) return -1;
                        return aIdx - bIdx;
                    });

                setDepartments(deptArray);
            }
        } catch (error) {
            console.error("Failed to fetch cabinet members:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleDept = (deptName: string) => {
        setOpenDepts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(deptName)) {
                newSet.delete(deptName);
            } else {
                newSet.add(deptName);
            }
            return newSet;
        });
    };

    if (loading) {
        return (
            <main>
                <Hero title="Struktur Kepengurusan" subtitle="Memuat data..." backgroundImage="/assets/mentoring-hero.jpg" />
                <div className="py-20 flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                    <p className="text-neutral-500">Mengambil data pengurus...</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Hero
                title="Struktur Kepengurusan"
                subtitle="Kabinet AL-FATH Periode 2025/2026"
                backgroundImage="/assets/mentoring-hero.jpg"
            />

            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                    {/* Top Leaders - TriCore Section */}
                    {topLeaders.length > 0 && (
                        <div className="mb-16">
                            <div className="text-center mb-8">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
                                    TriCore
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-4">Pimpinan Utama</h2>
                            </div>

                            {/* Pyramid Layout for Top Leaders */}
                            <div className="flex flex-col items-center gap-8">
                                {/* Ketua Umum - Top of pyramid */}
                                {topLeaders.length >= 1 && (
                                    <div className="flex justify-center">
                                        <MemberCard
                                            name={topLeaders[0].name}
                                            position={topLeaders[0].position}
                                            programStudi={topLeaders[0].programStudi}
                                            photoUrl={topLeaders[0].photoUrl}
                                            isLeader={true}
                                            size="large"
                                        />
                                    </div>
                                )}

                                {/* Wakil Ketua Umum - Bottom of pyramid */}
                                {topLeaders.length > 1 && (
                                    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                                        {topLeaders.slice(1).map((leader) => (
                                            <MemberCard
                                                key={leader.id}
                                                name={leader.name}
                                                position={leader.position}
                                                programStudi={leader.programStudi}
                                                photoUrl={leader.photoUrl}
                                                isLeader={true}
                                                size="normal"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bidang-Bidang Section */}
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Bidang Kepengurusan</h2>
                            <p className="text-neutral-600 mt-2">Klik nama bidang untuk melihat detail anggota</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                            {departments.length > 0 ? (
                                departments.map((dept) => (
                                    <DepartmentSection
                                        key={dept.name}
                                        dept={dept}
                                        isOpen={openDepts.has(dept.name)}
                                        onToggle={() => toggleDept(dept.name)}
                                    />
                                ))
                            ) : (
                                <div className="py-12 text-center text-neutral-500">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="text-lg font-medium">Belum ada data bidang</p>
                                    <p className="text-sm mt-1">Data pengurus akan muncul setelah ditambahkan melalui CMS</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Summary */}
                    {(topLeaders.length > 0 || departments.length > 0) && (
                        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                                    {topLeaders.length + departments.reduce((acc, d) => acc + d.members.length, 0)}
                                </div>
                                <div className="text-sm text-primary-700 mt-1">Total Pengurus</div>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
                                    {departments.length + (topLeaders.length > 0 ? 1 : 0)}
                                </div>
                                <div className="text-sm text-emerald-700 mt-1">Bidang</div>
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-amber-600">
                                    {topLeaders.length}
                                </div>
                                <div className="text-sm text-amber-700 mt-1">TriCore</div>
                            </div>
                            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-4 text-center">
                                <div className="text-2xl sm:text-3xl font-bold text-violet-600">
                                    2025/2026
                                </div>
                                <div className="text-sm text-violet-700 mt-1">Periode</div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
