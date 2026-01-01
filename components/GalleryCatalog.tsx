"use client";

import { useState, useEffect } from "react";
import { convertGoogleDriveUrl } from "@/lib/google-drive-helper";

interface GalleryItem {
    id: string;
    title?: string;
    description?: string;
    url?: string;
    imageUrl?: string;
    image_url?: string;
}

interface CategoryData {
    id: string;
    name: string;
    placeholder: string;
    icon: React.ReactNode;
}

const categories: CategoryData[] = [
    {
        id: "kuliah_dhuha",
        name: "Kuliah Dhuha",
        placeholder: "gallery_kuliah_dhuha",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        id: "mentoring",
        name: "Mentoring",
        placeholder: "gallery_mentoring",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        id: "bina_kader",
        name: "Bina Kader",
        placeholder: "gallery_bina_kader",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
    },
    {
        id: "seminar_spai",
        name: "Seminar SPAI",
        placeholder: "gallery_seminar_spai",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
        ),
    },
    {
        id: "kepengurusan",
        name: "Kepengurusan",
        placeholder: "gallery_kepengurusan",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
];

export default function GalleryCatalog() {
    const [activeCategory, setActiveCategory] = useState(categories[0].id);
    const [images, setImages] = useState<{ url: string; title?: string }[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch images when category changes
    useEffect(() => {
        const category = categories.find((c) => c.id === activeCategory);
        if (category) {
            fetchGalleryImages(category.placeholder);
        }
    }, [activeCategory]);

    // Auto-slide every 4 seconds
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    // Reset index when category changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [activeCategory]);

    const fetchGalleryImages = async (placeholder: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/gallery?placeholder=${placeholder}`);
            const data = (await response.json()) as { gallery?: GalleryItem[] };

            if (data.gallery && data.gallery.length > 0) {
                const galleryImages = data.gallery.map((item) => {
                    const rawUrl = item.url || item.imageUrl || item.image_url || "";
                    return {
                        url: convertGoogleDriveUrl(rawUrl),
                        title: item.title || item.description || "",
                    };
                });
                setImages(galleryImages);
            } else {
                // Fallback placeholder
                setImages([{ url: "/assets/kegiatan/default.png", title: "Belum ada foto" }]);
            }
        } catch (error) {
            console.error("Error fetching gallery:", error);
            setImages([{ url: "/assets/kegiatan/default.png", title: "Belum ada foto" }]);
        } finally {
            setLoading(false);
        }
    };

    const activeData = categories.find((c) => c.id === activeCategory);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-ocean-50">
            <div className="container-upi">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-heading">
                        Dokumentasi <span className="text-gradient-ocean">Kegiatan</span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary-600 to-ocean-500 mx-auto rounded-full" />
                    <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                        Momen berharga dari berbagai kegiatan Tutorial PAI-SPAI UPI
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === cat.id
                                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30"
                                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                                }`}
                        >
                            {cat.icon}
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Gallery Display */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Border Effect */}
                        <div className="absolute inset-0 bg-gradient-ocean rounded-3xl transform rotate-2 scale-[1.02] opacity-20 blur-xl" />

                        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-200">
                            {loading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <>
                                    {/* Images with fade transition */}
                                    {images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                                                }`}
                                        >
                                            <img
                                                src={image.url}
                                                alt={image.title || `${activeData?.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/assets/kegiatan/default.png";
                                                }}
                                            />
                                        </div>
                                    ))}

                                    {/* Overlay with title */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
                                        <div>
                                            <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                                {activeData?.name}
                                            </div>
                                            {images[currentIndex]?.title && (
                                                <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">
                                                    {images[currentIndex].title}
                                                </h3>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dot indicators */}
                                    {images.length > 1 && (
                                        <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentIndex(index)}
                                                    className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                                                            ? "bg-white w-8"
                                                            : "bg-white/50 hover:bg-white/80"
                                                        }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Image counter */}
                    {!loading && images.length > 1 && (
                        <div className="text-center mt-4 text-neutral-500 text-sm">
                            {currentIndex + 1} / {images.length} foto
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
