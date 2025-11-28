import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white">
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
                                <Link href="/tentang/visi" className="hover:text-white transition-colors">
                                    Visi & Misi
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang/struktur" className="hover:text-white transition-colors">
                                    Struktur Kepengurusan
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang/kabinet" className="hover:text-white transition-colors">
                                    Kabinet AL-FATH
                                </Link>
                            </li>
                            <li>
                                <Link href="/program/kuliah-dhuha" className="hover:text-white transition-colors">
                                    Program Unggulan
                                </Link>
                            </li>
                            <li>
                                <Link href="/kalender" className="hover:text-white transition-colors">
                                    Kalender Kegiatan
                                </Link>
                            </li>
                            <li>
                                <Link href="/tentang/dosen" className="hover:text-white transition-colors">
                                    Dosen Penyelenggara
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
                        <ul className="space-y-3 text-sm text-neutral-400">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>
                                    Universitas Pendidikan Indonesia<br />
                                    Jl. Dr. Setiabudhi No. 229, Bandung
                                </span>
                            </li>
                            <li>
                                <Link href="https://wa.me/6285165888607" className="flex items-center hover:text-white transition-colors">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    +62 8516-5888-607
                                </Link>
                            </li>
                        </ul>

                        {/* Social Media */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-3">Media Sosial</h4>
                            <div className="flex space-x-3">
                                <Link href="https://www.instagram.com/tutorialupi" className="hover:bg-neutral-700 p-2 rounded-md transition-colors inline-block">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </Link>
                                <Link href="https://www.youtube.com/@tutorialupi7633" className="hover:bg-neutral-700 p-2 rounded-md transition-colors inline-block">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
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
