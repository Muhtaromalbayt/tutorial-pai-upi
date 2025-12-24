"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
    InstagramIcon,
    YouTubeIcon,
    TikTokIcon,
    WhatsAppIcon,
    EmailIcon,
    ChevronDownIcon,
    MenuIcon,
    CloseIcon,
    HomeIcon,
    UsersIcon,
    BuildingIcon,
    BookIcon,
    NewspaperIcon,
    UserGroupIcon,
    BadgeIcon,
    CalendarIcon,
    ChatIcon,
    IndonesiaFlag
} from "./icons";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeKepengurusanDropdown, setActiveKepengurusanDropdown] = useState(false);
    const [activeTutorialPAIDropdown, setActiveTutorialPAIDropdown] = useState(false);
    const [activeTutorialSPAIDropdown, setActiveTutorialSPAIDropdown] = useState(false);
    const pathname = usePathname();

    const kepengurusanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tutorialPAITimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const tutorialSPAITimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Kepengurusan dropdown handlers
    const handleKepengurusanMouseEnter = () => {
        if (kepengurusanTimeoutRef.current) clearTimeout(kepengurusanTimeoutRef.current);
        setActiveKepengurusanDropdown(true);
    };

    const handleKepengurusanMouseLeave = () => {
        kepengurusanTimeoutRef.current = setTimeout(() => setActiveKepengurusanDropdown(false), 200);
    };

    // Tutorial PAI dropdown handlers
    const handleTutorialPAIMouseEnter = () => {
        if (tutorialPAITimeoutRef.current) clearTimeout(tutorialPAITimeoutRef.current);
        setActiveTutorialPAIDropdown(true);
    };

    const handleTutorialPAIMouseLeave = () => {
        tutorialPAITimeoutRef.current = setTimeout(() => setActiveTutorialPAIDropdown(false), 200);
    };

    // Tutorial SPAI dropdown handlers
    const handleTutorialSPAIMouseEnter = () => {
        if (tutorialSPAITimeoutRef.current) clearTimeout(tutorialSPAITimeoutRef.current);
        setActiveTutorialSPAIDropdown(true);
    };

    const handleTutorialSPAIMouseLeave = () => {
        tutorialSPAITimeoutRef.current = setTimeout(() => setActiveTutorialSPAIDropdown(false), 200);
    };

    useEffect(() => {
        return () => {
            if (kepengurusanTimeoutRef.current) clearTimeout(kepengurusanTimeoutRef.current);
            if (tutorialPAITimeoutRef.current) clearTimeout(tutorialPAITimeoutRef.current);
            if (tutorialSPAITimeoutRef.current) clearTimeout(tutorialSPAITimeoutRef.current);
        };
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 shadow-lg">
                {/* Top Bar - Icons Only + Indonesia Flag */}
                <div className="bg-neutral-900 text-white py-2 px-4">
                    <div className="container-upi flex justify-between items-center">
                        {/* Left Side: Contact Icons */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Link href="mailto:programtutorial@upi.edu" className="hover:text-primary-400 transition-colors flex items-center gap-1.5" title="Email">
                                <EmailIcon />
                                <span className="hidden sm:inline text-xs">programtutorial@upi.edu</span>
                            </Link>
                            <div className="hidden sm:block w-px h-4 bg-neutral-700"></div>
                            <Link href="https://wa.me/6285165888607" target="_blank" className="hover:text-primary-400 transition-colors flex items-center gap-1.5" title="WhatsApp">
                                <WhatsAppIcon />
                                <span className="hidden sm:inline text-xs">+62 851-6588-8607</span>
                            </Link>
                        </div>

                        {/* Right Side: Social Media & Flag */}
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <Link href="https://www.instagram.com/tutorialupi" target="_blank" className="hover:text-primary-400 transition-colors" title="Instagram">
                                <InstagramIcon className="w-4 h-4" />
                            </Link>
                            <Link href="https://www.tiktok.com/@tutorialupi" target="_blank" className="hover:text-primary-400 transition-colors" title="TikTok">
                                <TikTokIcon className="w-4 h-4" />
                            </Link>
                            <Link href="https://www.youtube.com/@tutorialupi7633" target="_blank" className="hover:text-primary-400 transition-colors" title="YouTube">
                                <YouTubeIcon className="w-4 h-4" />
                            </Link>
                            <div className="w-px h-4 bg-neutral-700"></div>
                            <div className="flex items-center" title="Indonesia">
                                <IndonesiaFlag />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Header - Red Background */}
                <nav className="bg-[#dc2626] text-white relative">
                    <div className="container-upi">
                        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28 lg:h-32">
                            {/* Logo Section - No Frame, Bigger */}
                            <Link href="/" className="flex items-center space-x-3 md:space-x-4 group py-2">
                                {/* UPI Logo */}
                                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 transition-transform hover:scale-105 flex-shrink-0">
                                    <Image
                                        src="/assets/logo-upi.png"
                                        alt="Logo UPI"
                                        fill
                                        className="object-contain drop-shadow-lg"
                                    />
                                </div>
                                {/* Tutorial Logo */}
                                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-transform hover:scale-105 flex-shrink-0">
                                    <Image
                                        src="/assets/logo/tutorial-logo.png"
                                        alt="Logo Tutorial PAI"
                                        fill
                                        className="object-contain drop-shadow-lg"
                                    />
                                </div>
                                <div className="hidden sm:block ml-1 md:ml-2">
                                    <div className="text-base sm:text-lg md:text-xl font-bold leading-tight tracking-wide">Tutorial PAI–SPAI</div>
                                    <div className="text-xs sm:text-sm font-light opacity-90">Universitas Pendidikan Indonesia</div>
                                    <div className="text-xs font-medium text-yellow-300 mt-0.5 md:mt-1 tracking-wider">Kabinet AL-FATH</div>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                                <Link href="/" className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                                    Home
                                </Link>
                                <Link href="/news" className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/news' || pathname.startsWith('/news/') ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                                    Kabar Tutorial
                                </Link>

                                {/* Kepengurusan Dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={handleKepengurusanMouseEnter}
                                    onMouseLeave={handleKepengurusanMouseLeave}
                                >
                                    <button className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${pathname.startsWith('/tentang') ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                                        Kepengurusan
                                        <ChevronDownIcon className="ml-1 w-4 h-4" />
                                    </button>

                                    {activeKepengurusanDropdown && (
                                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 text-neutral-800 animate-fadeIn z-50">
                                            <Link href="/tentang/kabinet" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Kabinet AL-FATH</Link>
                                            <Link href="/tentang/struktur" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Struktur Kepengurusan</Link>
                                            <div className="border-t border-neutral-100 my-2"></div>
                                            <div className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase">Program Pengurus</div>
                                            <Link href="/tentang/program-pengurus/kajian-rutin" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Kajian Rutin</Link>
                                            <Link href="/tentang/program-pengurus/project-mini" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Project Mini Tutorial</Link>
                                        </div>
                                    )}
                                </div>

                                {/* Tutorial PAI Dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={handleTutorialPAIMouseEnter}
                                    onMouseLeave={handleTutorialPAIMouseLeave}
                                >
                                    <button className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${pathname.startsWith('/program/kuliah-dhuha') || pathname.startsWith('/program/mentoring') || pathname.startsWith('/program/bina-kader') ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                                        Tutorial PAI
                                        <ChevronDownIcon className="ml-1 w-4 h-4" />
                                    </button>

                                    {activeTutorialPAIDropdown && (
                                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 text-neutral-800 animate-fadeIn z-50">
                                            <Link href="/program/kuliah-dhuha" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Kuliah Dhuha</Link>
                                            <Link href="/program/mentoring" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Mentoring</Link>
                                            <Link href="/program/bina-kader" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Bina Kader</Link>
                                        </div>
                                    )}
                                </div>

                                {/* Tutorial SPAI Dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={handleTutorialSPAIMouseEnter}
                                    onMouseLeave={handleTutorialSPAIMouseLeave}
                                >
                                    <button className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${pathname.startsWith('/program/seminar-pai') || pathname.startsWith('/program/panitia-delegasi') ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                                        Tutorial SPAI
                                        <ChevronDownIcon className="ml-1 w-4 h-4" />
                                    </button>

                                    {activeTutorialSPAIDropdown && (
                                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 text-neutral-800 animate-fadeIn z-50">
                                            <Link href="/program/seminar-pai" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Seminar PAI</Link>
                                            <Link href="/program/panitia-delegasi" className="block px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-600">Panitia Delegasi</Link>
                                        </div>
                                    )}
                                </div>

                                <Link href="/kalender" className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-md transition-colors ${pathname === '/kalender' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                                    Kalender
                                </Link>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <MenuIcon />
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
                className={`fixed top-0 left-0 h-full w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Drawer Header with Gradient */}
                    <div className="p-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                        <div className="flex justify-between items-center mb-4">
                            <div className="font-bold text-xl">Menu</div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="text-sm opacity-90">Tutorial PAI–SPAI UPI</div>
                        <div className="text-xs opacity-75 mt-1">Kabinet AL-FATH</div>
                    </div>

                    {/* Drawer Content */}
                    <div className="flex-1 overflow-y-auto py-2">
                        <Link
                            href="/"
                            className={`flex items-center gap-3 px-6 py-3 text-neutral-800 hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 ${pathname === '/' ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-transparent'
                                }`}
                        >
                            <HomeIcon />
                            <span className="font-medium">Home</span>
                        </Link>
                        <Link
                            href="/news"
                            className={`flex items-center gap-3 px-6 py-3 text-neutral-800 hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 ${pathname === '/news' || pathname.startsWith('/news/') ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-transparent'
                                }`}
                        >
                            <NewspaperIcon />
                            <span className="font-medium">Kabar Tutorial</span>
                        </Link>

                        {/* Kepengurusan Section */}
                        <div className="px-6 py-3 mt-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">Kepengurusan</div>
                        <Link href="/tentang/kabinet" className="flex items-center gap-3 px-6 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                            <BuildingIcon />
                            <span>Kabinet AL-FATH</span>
                        </Link>
                        <Link href="/tentang/struktur" className="flex items-center gap-3 px-6 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                            <UsersIcon />
                            <span>Struktur Kepengurusan</span>
                        </Link>

                        {/* Tutorial PAI Section */}
                        <div className="px-6 py-3 mt-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Tutorial PAI</div>
                        <Link href="/program/kuliah-dhuha" className="flex items-center gap-3 px-6 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                            <BookIcon />
                            <span>Kuliah Dhuha</span>
                        </Link>
                        <Link href="/program/mentoring" className="flex items-center gap-3 px-6 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                            <UserGroupIcon />
                            <span>Mentoring</span>
                        </Link>
                        <Link href="/program/bina-kader" className="flex items-center gap-3 px-6 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                            <BadgeIcon />
                            <span>Bina Kader</span>
                        </Link>

                        {/* Tutorial SPAI Section */}
                        <div className="px-6 py-3 mt-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Tutorial SPAI</div>
                        <Link href="/program/seminar-pai" className="flex items-center gap-3 px-6 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                            <NewspaperIcon />
                            <span>Seminar PAI</span>
                        </Link>
                        <Link href="/program/panitia-delegasi" className="flex items-center gap-3 px-6 py-2.5 text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                            <UsersIcon />
                            <span>Panitia Delegasi</span>
                        </Link>

                        <div className="border-t border-neutral-200 my-4"></div>

                        <Link
                            href="/kalender"
                            className={`flex items-center gap-3 px-6 py-3 text-neutral-800 hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 ${pathname === '/kalender' ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-transparent'
                                }`}
                        >
                            <CalendarIcon />
                            <span className="font-medium">Kalender Kegiatan</span>
                        </Link>

                        <Link
                            href="/kritik-saran"
                            className={`flex items-center gap-3 px-6 py-3 text-neutral-800 hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 ${pathname === '/kritik-saran' ? 'border-primary-600 bg-primary-50 text-primary-600' : 'border-transparent'
                                }`}
                        >
                            <ChatIcon />
                            <span className="font-medium">Kritik & Saran</span>
                        </Link>
                    </div>

                    {/* Drawer Footer */}
                    <div className="p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 border-t border-neutral-200">
                        <div className="text-xs text-neutral-600 mb-3 text-center">Ikuti Kami</div>
                        <div className="flex justify-center space-x-4 text-neutral-600">
                            <a href="https://www.instagram.com/tutorialupi" target="_blank" className="hover:text-primary-600 transition-colors">
                                <InstagramIcon className="w-6 h-6" />
                            </a>
                            <a href="https://www.youtube.com/@tutorialupi7633" target="_blank" className="hover:text-primary-600 transition-colors">
                                <YouTubeIcon className="w-6 h-6" />
                            </a>
                            <a href="https://www.tiktok.com/@tutorialupi" target="_blank" className="hover:text-primary-600 transition-colors">
                                <TikTokIcon className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
