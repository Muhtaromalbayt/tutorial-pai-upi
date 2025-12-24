import Link from "next/link";
import {
    InstagramIcon,
    YouTubeIcon,
    WhatsAppIcon,
    LocationIcon
} from "./icons";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-neutral-900 to-ocean-950 text-white border-t border-ocean-900/30">
            {/* Main Footer */}
            <div className="container-upi py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tutorial PAI–SPAI UPI</h3>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            Kabinet AL-FATH<br />
                            Semester Genap 2025/2026<br />
                            Menumbuhkan Adab, Menggerakkan Peradaban
                        </p>
                        <p className="text-sm text-neutral-400 mt-4">
                            <a href="mailto:programtutorial@upi.edu" className="hover:text-white transition-colors">
                                programtutorial@upi.edu
                            </a>
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li>
                                <Link href="/tentang/kabinet" className="hover:text-white transition-colors">
                                    Kabinet AL-FATH
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang/struktur" className="hover:text-white transition-colors">
                                    Struktur Kepengurusan
                                </Link>
                            </li>
                            <li>
                                <Link href="/program/kuliah-dhuha" className="hover:text-white transition-colors">
                                    Kuliah Dhuha
                                </Link>
                            </li>
                            <li>
                                <Link href="/program/seminar-pai" className="hover:text-white transition-colors">
                                    Seminar PAI
                                </Link>
                            </li>
                            <li>
                                <Link href="/kalender" className="hover:text-white transition-colors">
                                    Kalender Kegiatan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
                        <ul className="space-y-3 text-sm text-neutral-400">
                            <li className="flex items-start">
                                <LocationIcon className="w-5 h-5 mr-2 mt-0.5 text-primary-500" />
                                <span>
                                    Universitas Pendidikan Indonesia<br />
                                    Jl. Dr. Setiabudhi No. 229, Bandung
                                </span>
                            </li>
                            <li>
                                <Link href="https://wa.me/6285165888607" className="flex items-center hover:text-white transition-colors">
                                    <WhatsAppIcon className="w-5 h-5 mr-2" />
                                    +62 8516-5888-607
                                </Link>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-3">Media Sosial</h4>
                            <div className="flex space-x-3">
                                <Link href="https://www.instagram.com/tutorialupi" className="hover:bg-neutral-700 p-2 rounded-md transition-colors inline-block">
                                    <InstagramIcon />
                                </Link>
                                <Link href="https://www.youtube.com/@tutorialupi7633" className="hover:bg-neutral-700 p-2 rounded-md transition-colors inline-block">
                                    <YouTubeIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="footer-divider">
                <div className="container-upi py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
                        <p>© 2025 Tutorial PAI–SPAI UPI. Kabinet AL-FATH. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
