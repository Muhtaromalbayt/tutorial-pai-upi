"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const HeroActivities = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Placeholder images for activities
    const activityImages = [
        "/assets/kegiatan/placeholder-1.svg",
        "/assets/kegiatan/placeholder-2.svg",
        "/assets/kegiatan/placeholder-3.svg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % activityImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative bg-neutral-900 h-[600px] overflow-hidden">
            {/* Background Slider */}
            {activityImages.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-60" : "opacity-0"
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Kegiatan Tutorial ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="container-upi text-center text-white z-10 px-4">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary-600/90 backdrop-blur-sm text-sm font-medium tracking-wide animate-fadeIn">
                        Kabinet AL-FATH 2025/2026
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance drop-shadow-lg animate-slideUp">
                        Menumbuhkan Adab,<br />
                        <span className="text-primary-500">Menggerakkan Peradaban</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md animate-slideUp delay-100">
                        Wadah pembinaan karakter mahasiswa muslim Universitas Pendidikan Indonesia yang berlandaskan nilai-nilai Islam dan intelektualitas.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp delay-200">
                        <Link
                            href="/program/kuliah-dhuha"
                            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-primary-600/30 w-full sm:w-auto"
                        >
                            Lihat Program Unggulan
                        </Link>
                        <Link
                            href="/tentang/visi"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-semibold transition-all backdrop-blur-sm w-full sm:w-auto"
                        >
                            Tentang Kami
                        </Link>
                    </div>
                </div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {activityImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? "bg-primary-500 w-8" : "bg-white/50 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroActivities;
