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

interface DocumentationCarouselProps {
    fallbackImages?: string[];
    className?: string;
}

export default function DocumentationCarousel({
    fallbackImages = [
        "/assets/kegiatan/kuliah-dhuha.png",
        "/assets/kegiatan/mentoring.png",
        "/assets/kegiatan/bina-kader.png",
    ],
    className = ""
}: DocumentationCarouselProps) {
    const [images, setImages] = useState<{ url: string; title?: string }[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    // Auto-slide every 4 seconds
    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    const fetchGalleryImages = async () => {
        try {
            const response = await fetch("/api/gallery?placeholder=gallery_home_carousel");
            const data = await response.json() as { gallery?: GalleryItem[] };

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
                // Fallback to default images
                setImages(fallbackImages.map(url => ({ url, title: "" })));
            }
        } catch (error) {
            console.error("Error fetching gallery:", error);
            setImages(fallbackImages.map(url => ({ url, title: "" })));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`relative h-[500px] rounded-3xl overflow-hidden bg-neutral-200 animate-pulse ${className}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {/* Image Border/Effect */}
            <div className="absolute inset-0 bg-gradient-ocean rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg" />

            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* Images with fade transition */}
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={image.url}
                            alt={image.title || `Dokumentasi ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/assets/kegiatan/default.png";
                            }}
                        />
                    </div>
                ))}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                    <div>
                        <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                            Dokumentasi
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 font-heading">
                            {images[currentIndex]?.title || "Dokumentasi Kegiatan"}
                        </h3>
                        <p className="text-gray-200 text-lg">
                            Momen berharga dari berbagai kegiatan Tutorial PAI-SPAI UPI.
                        </p>
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
            </div>
        </div>
    );
}
