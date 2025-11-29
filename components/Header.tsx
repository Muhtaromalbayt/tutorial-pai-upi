"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTentangDropdown, setActiveTentangDropdown] = useState(false);
    const [activeProgramDropdown, setActiveProgramDropdown] = useState(false);
    const pathname = usePathname();

    const tentangTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const programTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleTentangMouseEnter = () => {
        if (tentangTimeoutRef.current) clearTimeout(tentangTimeoutRef.current);
        setActiveTentangDropdown(true);
    };

    const handleTentangMouseLeave = () => {
        tentangTimeoutRef.current = setTimeout(() => setActiveTentangDropdown(false), 200);
    };

    const handleProgramMouseEnter = () => {
        if (programTimeoutRef.current) clearTimeout(programTimeoutRef.current);
        setActiveProgramDropdown(true);
    };

    const handleProgramMouseLeave = () => {
        programTimeoutRef.current = setTimeout(() => setActiveProgramDropdown(false), 200);
    };

    useEffect(() => {
        return () => {
            if (tentangTimeoutRef.current) clearTimeout(tentangTimeoutRef.current);
            if (programTimeoutRef.current) clearTimeout(programTimeoutRef.current);
        };
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 shadow-lg">
                {/* Top Bar - Icons Only + Indonesia Flag */}
                <div className="bg-neutral-900 text-white py-2 px-4">
                    <div className="container-upi flex justify-between items-center">
                        {/* Left Side: Contact Icons */}
                        <div className="flex items-center space-x-4">
                            <Link href="mailto:programtutorial@upi.edu" className="hover:text-primary-400 transition-colors" title="Email">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </Link>
                            <Link href="https://wa.me/6285165888607" target="_blank" className="hover:text-primary-400 transition-colors" title="WhatsApp">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </Link>
                        </div>

                        {/* Right Side: Social Media & Flag */}
                        <div className="flex items-center space-x-4">
                            <Link href="https://www.instagram.com/tutorialupi" target="_blank" className="hover:text-primary-400 transition-colors" title="Instagram">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </Link>
                            <Link href="https://www.tiktok.com/@tutorialupi" target="_blank" className="hover:text-primary-400 transition-colors" title="TikTok">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                            </Link>
                            <Link href="https://www.youtube.com/@tutorialupi7633" target="_blank" className="hover:text-primary-400 transition-colors" title="YouTube">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </Link>
                            <div className="w-px h-4 bg-neutral-700 mx-2"></div>
                            <div className="flex items-center" title="Indonesia">
                                <svg className="w-6 h-4 rounded-sm shadow-sm" viewBox="0 0 30 20">
                                    <rect width="30" height="10" fill="#EF3340" />
                                    <rect y="10" width="30" height="10" fill="#FFFFFF" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Header - Red Background */}
                <nav className="bg-[#dc2626] text-white relative">
                    <div className="container-upi">
                        <div className="flex items-center justify-between h-32">
                            {/* Logo Section - No Frame, Bigger */}
                            <Link href="/" className="flex items-center space-x-4 group py-2">
                                {/* UPI Logo */}
                                <div className="relative w-28 h-28 md:w-40 md:h-32 transition-transform hover:scale-105">
                                    <Image
                                        src="/assets/logo-upi.png"
                                        alt="Logo UPI"
                                        fill
                                        className="object-contain drop-shadow-lg"
                                    />
                                </div>
                                {/* Tutorial Logo */}
                                <div className="relative w-24 h-24 md:w-28 md:h-28 transition-transform hover:scale-105">
                                    <Image
                                        src="/assets/logo/tutorial-logo.png"
                                        alt="Logo Tutorial PAI"
                                        fill
                                        className="object-contain drop-shadow-lg"
                                    />
                                </div>
                                <div className="hidden md:block ml-2">
                                    <div className="text-xl font-bold leading-tight tracking-wide">Tutorial PAI–SPAI</div>
                                    <div className="text-sm font-light opacity-90">Universitas Pendidikan Indonesia</div>
                                    <div className="text-xs font-medium text-yellow-300 mt-1 tracking-wider">Kabinet AL-FATH</div>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-2">
                                <Link href="/" className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-md transition-colors">
                                    Home
                                </Link>

                                {/* Tentang Dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={handleTentangMouseEnter}
                                    onMouseLeave={handleTentangMouseLeave}
                                >
                                    <button className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-md transition-colors flex items-center">
                                        Tentang
                                        <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {activeTentangDropdown && (
                                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 text-neutral-800 animate-fadeIn z-50">
                                            <Link href="/tentang/visi" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Visi & Misi</Link>
                                            <Link href="/tentang/struktur" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Struktur Kepengurusan</Link>
                                            <Link href="/tentang/kabinet" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Kabinet AL-FATH</Link>
                                            <div className="border-t border-neutral-100 my-2"></div>
                                            <div className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase">Program Pengurus</div>
                                            <Link href="/tentang/program-pengurus/kajian-rutin" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Kajian Rutin</Link>
                                            <Link href="/tentang/program-pengurus/project-mini" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Project Mini Tutorial</Link>
                                            <div className="border-t border-neutral-100 my-2"></div>
                                            <Link href="/tentang/dosen" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Dosen Penyelenggara</Link>
                                            <Link href="/tentang/sejarah" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Sejarah</Link>
                                        </div>
                                    )}
                                </div>

                                {/* Program Dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={handleProgramMouseEnter}
                                    onMouseLeave={handleProgramMouseLeave}
                                >
                                    <button className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-md transition-colors flex items-center">
                                        Program
                                        <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {activeProgramDropdown && (
                                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 text-neutral-800 animate-fadeIn z-50">
                                            <Link href="/program/kuliah-dhuha" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Kuliah Dhuha</Link>
                                            <Link href="/program/seminar-pai" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Seminar PAI</Link>
                                            <Link href="/program/mentoring" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Mentoring</Link>
                                            <Link href="/program/bina-kader" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Bina Kader</Link>
                                        </div>
                                    )}
                                </div>

                                <Link href="/kalender" className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-md transition-colors">
                                    Kalender
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Side Drawer Menu */}
            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Drawer Header */}
                    <div className="p-5 bg-[#dc2626] text-white flex justify-between items-center">
                        <div className="font-bold text-lg">Menu</div>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <Link href="/" className="block px-6 py-3 text-neutral-800 hover:bg-neutral-50 font-medium border-l-4 border-transparent hover:border-primary-600">
                            Home
                        </Link>

                        <div className="px-6 py-2 mt-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">Tentang</div>
                        <Link href="/tentang/visi" className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600">Visi & Misi</Link>
                        <Link href="/tentang/struktur" className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600">Struktur Kepengurusan</Link>
                        <Link href="/tentang/kabinet" className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600">Kabinet AL-FATH</Link>
                        <Link href="/tentang/sejarah" className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600">Sejarah</Link>

                        <div className="px-6 py-2 mt-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Program</div>
                        <Link href="/program/kuliah-dhuha" className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600">Kuliah Dhuha</Link>
                        <Link href="/program/seminar-pai" className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600">Seminar PAI</Link>
                        <Link href="/program/mentoring" className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600">Mentoring</Link>
                        <Link href="/program/bina-kader" className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50 hover:text-primary-600">Bina Kader</Link>

                        <div className="border-t border-neutral-100 my-4"></div>
                        <Link href="/kalender" className="block px-6 py-3 text-neutral-800 hover:bg-neutral-50 font-medium border-l-4 border-transparent hover:border-primary-600">
                            Kalender Kegiatan
                        </Link>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-6 bg-neutral-50 border-t border-neutral-200">
                        <div className="flex justify-center space-x-4 text-neutral-500">
                            <a href="#" className="hover:text-primary-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073z" /></svg></a>
                            <a href="#" className="hover:text-primary-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
