/**
 * Photo Placeholder Definitions
 * 
 * List of all placeholder locations where photos can be displayed on the website.
 * Admin can assign photos to these placeholders via CMS Galeri dropdown.
 */

export interface PlaceholderDefinition {
    id: string;
    name: string;
    description: string;
    page: string;
    aspectRatio?: string;
}

export const PHOTO_PLACEHOLDERS: PlaceholderDefinition[] = [
    // HOME PAGE
    {
        id: "hero_home",
        name: "Hero Utama (Home)",
        description: "Gambar utama di halaman depan website",
        page: "/",
        aspectRatio: "16:9"
    },
    {
        id: "program_unggulan",
        name: "Program Unggulan (Home)",
        description: "Gambar di section Program Unggulan halaman depan",
        page: "/",
        aspectRatio: "3:4"
    },

    // TENTANG - STRUKTUR
    {
        id: "hero_struktur",
        name: "Hero Struktur Kepengurusan",
        description: "Background gambar di halaman Struktur Kepengurusan",
        page: "/tentang/struktur",
        aspectRatio: "16:9"
    },

    // TENTANG - KABINET
    {
        id: "hero_kabinet",
        name: "Hero Kabinet Al-Fath",
        description: "Background gambar di halaman Kabinet",
        page: "/tentang/kabinet",
        aspectRatio: "16:9"
    },

    // PROGRAM PAGES
    {
        id: "hero_kuliah_dhuha",
        name: "Hero Kuliah Dhuha",
        description: "Gambar header halaman Kuliah Dhuha",
        page: "/program/kuliah-dhuha",
        aspectRatio: "16:9"
    },
    {
        id: "hero_mentoring",
        name: "Hero Mentoring",
        description: "Gambar header halaman Mentoring",
        page: "/program/mentoring",
        aspectRatio: "16:9"
    },
    {
        id: "hero_bina_kader",
        name: "Hero Bina Kader",
        description: "Gambar header halaman Bina Kader",
        page: "/program/bina-kader",
        aspectRatio: "16:9"
    },
    {
        id: "hero_bina_mentor",
        name: "Hero Bina Mentor",
        description: "Gambar header halaman Bina Mentor",
        page: "/program/bina-mentor",
        aspectRatio: "16:9"
    },
    {
        id: "hero_seminar",
        name: "Hero Seminar PAI",
        description: "Gambar header halaman Seminar PAI",
        page: "/program/seminar-pai",
        aspectRatio: "16:9"
    },
    {
        id: "hero_panitia_delegasi",
        name: "Hero Panitia Delegasi",
        description: "Gambar header halaman Panitia Delegasi",
        page: "/program/panitia-delegasi",
        aspectRatio: "16:9"
    },

    // KALENDER
    {
        id: "hero_kalender",
        name: "Hero Kalender Kegiatan",
        description: "Gambar header halaman Kalender",
        page: "/kalender",
        aspectRatio: "16:9"
    },

    // KRITIK SARAN
    {
        id: "hero_kritik_saran",
        name: "Hero Kritik & Saran",
        description: "Gambar header halaman Kritik Saran",
        page: "/kritik-saran",
        aspectRatio: "16:9"
    },

    // KATALOG DOKUMENTASI HOME PAGE (per kategori)
    {
        id: "gallery_kuliah_dhuha",
        name: "Katalog: Kuliah Dhuha",
        description: "Foto dokumentasi kegiatan Kuliah Dhuha untuk katalog homepage",
        page: "/",
        aspectRatio: "16:9"
    },
    {
        id: "gallery_mentoring",
        name: "Katalog: Mentoring",
        description: "Foto dokumentasi kegiatan Mentoring untuk katalog homepage",
        page: "/",
        aspectRatio: "16:9"
    },
    {
        id: "gallery_bina_kader",
        name: "Katalog: Bina Kader",
        description: "Foto dokumentasi kegiatan Bina Kader untuk katalog homepage",
        page: "/",
        aspectRatio: "16:9"
    },
    {
        id: "gallery_seminar_spai",
        name: "Katalog: Seminar SPAI",
        description: "Foto dokumentasi kegiatan Seminar SPAI untuk katalog homepage",
        page: "/",
        aspectRatio: "16:9"
    },
    {
        id: "gallery_kepengurusan",
        name: "Katalog: Kepengurusan",
        description: "Foto dokumentasi kegiatan Kepengurusan untuk katalog homepage",
        page: "/",
        aspectRatio: "16:9"
    },
    {
        id: "gallery_dokumentasi",
        name: "Dokumentasi Kegiatan",
        description: "Foto dokumentasi kegiatan umum (bisa multiple)",
        page: "Galeri",
        aspectRatio: "4:3"
    },
    {
        id: "gallery_seminar",
        name: "Dokumentasi Seminar",
        description: "Foto dokumentasi kegiatan seminar",
        page: "Galeri",
        aspectRatio: "4:3"
    },
    {
        id: "gallery_mentoring",
        name: "Dokumentasi Mentoring",
        description: "Foto dokumentasi kegiatan mentoring",
        page: "Galeri",
        aspectRatio: "4:3"
    },
];

// Get placeholder by ID
export function getPlaceholderById(id: string): PlaceholderDefinition | undefined {
    return PHOTO_PLACEHOLDERS.find(p => p.id === id);
}

// Get all placeholders for a specific page
export function getPlaceholdersForPage(page: string): PlaceholderDefinition[] {
    return PHOTO_PLACEHOLDERS.filter(p => p.page === page || p.page === "Galeri");
}

// Get placeholders grouped by page
export function getPlaceholdersGrouped(): Record<string, PlaceholderDefinition[]> {
    const grouped: Record<string, PlaceholderDefinition[]> = {};
    PHOTO_PLACEHOLDERS.forEach(p => {
        if (!grouped[p.page]) {
            grouped[p.page] = [];
        }
        grouped[p.page].push(p);
    });
    return grouped;
}
