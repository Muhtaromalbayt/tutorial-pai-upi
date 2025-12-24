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
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Generic dropdown handlers
    const handleDropdownMouseEnter = (dropdown: string) => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setActiveDropdown(dropdown);
    };

    const handleDropdownMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    useEffect(() => {
        return () => {
            if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        };
    }, []);

    // Navigation items configuration
    const navItems = [
        { href: "/", label: "Home", icon: HomeIcon },
        { href: "/news", label: "Kabar Tutorial", icon: NewspaperIcon },
    ];

    const dropdownMenus = {
        kepengurusan: {
            label: "Kepengurusan",
            icon: BuildingIcon,
            items: [
                { href: "/tentang/kabinet", label: "Kabinet AL-FATH", icon: BuildingIcon },
                { href: "/tentang/struktur", label: "Struktur Kepengurusan", icon: UsersIcon },
                { divider: true, label: "Program Pengurus" },
                { href: "/tentang/program-pengurus/kajian-rutin", label: "Kajian Rutin", icon: BookIcon },
                { href: "/tentang/program-pengurus/project-mini", label: "Project Mini Tutorial", icon: BadgeIcon },
            ],
            isActive: pathname.startsWith('/tentang'),
        },
        tutorialPAI: {
            label: "Tutorial PAI",
            icon: BookIcon,
            items: [
                { href: "/program/kuliah-dhuha", label: "Kuliah Dhuha", icon: BookIcon },
                { href: "/program/mentoring", label: "Mentoring", icon: UserGroupIcon },
                { href: "/program/bina-kader", label: "Bina Kader", icon: BadgeIcon },
            ],
            isActive: pathname.startsWith('/program/kuliah-dhuha') || pathname.startsWith('/program/mentoring') || pathname.startsWith('/program/bina-kader'),
        },
        tutorialSPAI: {
            label: "Tutorial SPAI",
            icon: NewspaperIcon,
            items: [
                { href: "/program/seminar-pai", label: "Seminar PAI", icon: NewspaperIcon },
                { href: "/program/panitia-delegasi", label: "Panitia Delegasi", icon: UsersIcon },
            ],
            isActive: pathname.startsWith('/program/seminar-pai') || pathname.startsWith('/program/panitia-delegasi'),
        },
    };

    return (
        <>
            <header className="sticky top-0 z-50 shadow-lg">
                {/* Top Bar - Icons Only */}
                <div className="bg-neutral-900 text-white py-2 px-4">
                    <div className="container-upi flex justify-between items-center">
                        {/* Left Side: Contact Icons Only */}
                        <div className="flex items-center space-x-3">
                            <Link
                                href="mailto:programtutorial@upi.edu"
                                className="p-1.5 hover:bg-white/10 rounded-full transition-all hover:scale-110"
                                title="Email: programtutorial@upi.edu"
                            >
                                <EmailIcon className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://wa.me/6285165888607"
                                target="_blank"
                                className="p-1.5 hover:bg-white/10 rounded-full transition-all hover:scale-110"
                                title="WhatsApp: +62 851-6588-8607"
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Right Side: Social Media Icons & Flag */}
                        <div className="flex items-center space-x-1">
                            <Link
                                href="https://www.instagram.com/tutorialupi"
                                target="_blank"
                                className="p-1.5 hover:bg-white/10 rounded-full transition-all hover:scale-110"
                                title="Instagram @tutorialupi"
                            >
                                <InstagramIcon className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://www.tiktok.com/@tutorialupi"
                                target="_blank"
                                className="p-1.5 hover:bg-white/10 rounded-full transition-all hover:scale-110"
                                title="TikTok @tutorialupi"
                            >
                                <TikTokIcon className="w-4 h-4" />
                            </Link>
                            <Link
                                href="https://www.youtube.com/@tutorialupi7633"
                                target="_blank"
                                className="p-1.5 hover:bg-white/10 rounded-full transition-all hover:scale-110"
                                title="YouTube Tutorial UPI"
                            >
                                <YouTubeIcon className="w-4 h-4" />
                            </Link>
                            <div className="w-px h-4 bg-neutral-700 mx-2"></div>
                            <div className="p-1" title="Indonesia">
                                <IndonesiaFlag />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Header - Red Background */}
                <nav className="bg-[#dc2626] text-white relative">
                    <div className="container-upi">
                        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28 lg:h-32">
                            {/* Logo Section - Bigger with Original Text */}
                            <Link href="/" className="flex items-center space-x-3 md:space-x-4 group py-2">
                                {/* UPI Logo */}
                                <div className="relative w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 lg:w-28 lg:h-28 transition-transform hover:scale-105 flex-shrink-0">
                                    <Image
                                        src="/assets/logo-upi.png"
                                        alt="Logo UPI"
                                        fill
                                        className="object-contain drop-shadow-lg"
                                    />
                                </div>
                                {/* Tutorial Logo */}
                                <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-transform hover:scale-105 flex-shrink-0">
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

                            {/* Desktop Navigation - Modern Design */}
                            <div className="hidden lg:flex items-center">
                                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-1 py-1">
                                    {/* Home */}
                                    <Link
                                        href="/"
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${pathname === '/'
                                            ? 'bg-white text-red-600 shadow-md'
                                            : 'hover:bg-white/20'
                                            }`}
                                    >
                                        Home
                                    </Link>

                                    {/* Kabar Tutorial */}
                                    <Link
                                        href="/news"
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${pathname === '/news' || pathname.startsWith('/news/')
                                            ? 'bg-white text-red-600 shadow-md'
                                            : 'hover:bg-white/20'
                                            }`}
                                    >
                                        Kabar
                                    </Link>

                                    {/* Kepengurusan Dropdown */}
                                    <div
                                        className="relative"
                                        onMouseEnter={() => handleDropdownMouseEnter('kepengurusan')}
                                        onMouseLeave={handleDropdownMouseLeave}
                                    >
                                        <button
                                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1 ${dropdownMenus.kepengurusan.isActive
                                                ? 'bg-white text-red-600 shadow-md'
                                                : 'hover:bg-white/20'
                                                }`}
                                        >
                                            Kepengurusan
                                            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'kepengurusan' ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${activeDropdown === 'kepengurusan'
                                            ? 'opacity-100 visible translate-y-0'
                                            : 'opacity-0 invisible -translate-y-2'
                                            }`}>
                                            <div className="bg-white rounded-xl shadow-2xl border border-neutral-100 py-2 min-w-[220px] overflow-hidden">
                                                {dropdownMenus.kepengurusan.items.map((item, idx) => (
                                                    item.divider ? (
                                                        <div key={idx} className="px-4 py-2 text-xs font-semibold text-neutral-400 uppercase border-t border-neutral-100 mt-1 pt-2">
                                                            {item.label}
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            key={idx}
                                                            href={item.href || '#'}
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                        >
                                                            {item.icon && <item.icon className="w-4 h-4 opacity-60" />}
                                                            {item.label}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tutorial PAI Dropdown */}
                                    <div
                                        className="relative"
                                        onMouseEnter={() => handleDropdownMouseEnter('tutorialPAI')}
                                        onMouseLeave={handleDropdownMouseLeave}
                                    >
                                        <button
                                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1 ${dropdownMenus.tutorialPAI.isActive
                                                ? 'bg-white text-red-600 shadow-md'
                                                : 'hover:bg-white/20'
                                                }`}
                                        >
                                            Tutorial PAI
                                            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'tutorialPAI' ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${activeDropdown === 'tutorialPAI'
                                            ? 'opacity-100 visible translate-y-0'
                                            : 'opacity-0 invisible -translate-y-2'
                                            }`}>
                                            <div className="bg-white rounded-xl shadow-2xl border border-neutral-100 py-2 min-w-[180px] overflow-hidden">
                                                {dropdownMenus.tutorialPAI.items.map((item, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={item.href || '#'}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                    >
                                                        {item.icon && <item.icon className="w-4 h-4 opacity-60" />}
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tutorial SPAI Dropdown */}
                                    <div
                                        className="relative"
                                        onMouseEnter={() => handleDropdownMouseEnter('tutorialSPAI')}
                                        onMouseLeave={handleDropdownMouseLeave}
                                    >
                                        <button
                                            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1 ${dropdownMenus.tutorialSPAI.isActive
                                                ? 'bg-white text-red-600 shadow-md'
                                                : 'hover:bg-white/20'
                                                }`}
                                        >
                                            Tutorial SPAI
                                            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'tutorialSPAI' ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${activeDropdown === 'tutorialSPAI'
                                            ? 'opacity-100 visible translate-y-0'
                                            : 'opacity-0 invisible -translate-y-2'
                                            }`}>
                                            <div className="bg-white rounded-xl shadow-2xl border border-neutral-100 py-2 min-w-[180px] overflow-hidden">
                                                {dropdownMenus.tutorialSPAI.items.map((item, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={item.href || '#'}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                    >
                                                        {item.icon && <item.icon className="w-4 h-4 opacity-60" />}
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kalender */}
                                    <Link
                                        href="/kalender"
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${pathname === '/kalender'
                                            ? 'bg-white text-red-600 shadow-md'
                                            : 'hover:bg-white/20'
                                            }`}
                                    >
                                        Kalender
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
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
