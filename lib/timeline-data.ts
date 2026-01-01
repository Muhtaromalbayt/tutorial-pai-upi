/**
 * Timeline Data - Tutorial PAI SPAI Semester Genap 2025/2026
 * Converted from lib/timeline.md
 */

export interface TimelineEvent {
    date: string; // Format: YYYY-MM-DD
    endDate?: string; // For multi-day events
    title: string;
    description?: string;
    location?: string;
    category: "pembukaan" | "tutorial" | "bina" | "seminar" | "musyawarah" | "penutupan" | "lainnya";
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
    // ========== JANUARI 2026 ==========
    {
        date: "2026-01-17",
        endDate: "2026-01-18",
        title: "Musyawarah Pimpinan",
        category: "musyawarah",
    },
    {
        date: "2026-01-24",
        endDate: "2026-01-30",
        title: "Musyawarah Bidang",
        category: "musyawarah",
    },
    {
        date: "2026-01-31",
        endDate: "2026-02-01",
        title: "Musyawarah Kerja",
        location: "Aula ITC dan Online",
        category: "musyawarah",
    },

    // ========== FEBRUARI 2026 ==========
    {
        date: "2026-02-02",
        title: "Sosialisasi Kahim",
        location: "Online",
        category: "lainnya",
    },
    {
        date: "2026-02-07",
        title: "Sosialisasi PJ Tutorial PAI SPAI",
        location: "Aula ITC",
        category: "lainnya",
    },
    {
        date: "2026-02-08",
        title: "In House Training Pengurus",
        location: "Aula ITC",
        category: "lainnya",
    },
    {
        date: "2026-02-08",
        title: "Kajian Rutin 1 (Munggahan)",
        location: "Aula ITC",
        category: "seminar",
    },
    {
        date: "2026-02-13",
        title: "Sosialisasi Delegasi",
        location: "Online",
        category: "lainnya",
    },
    {
        date: "2026-02-14",
        title: "Sosialisasi Bina Kader",
        location: "Online & Aula ITC",
        category: "lainnya",
    },
    {
        date: "2026-02-21",
        endDate: "2026-02-22",
        title: "Pembukaan Tutorial PAI SPAI",
        description: "Pembukaan Tutorial PAI SPAI UPI Semester Genap 2025/2026",
        location: "Aula ITC & Masjid Al Furqan",
        category: "pembukaan",
    },
    {
        date: "2026-02-21",
        endDate: "2026-02-22",
        title: "Diklat PAI-SPAI",
        location: "Aula ITC & Masjid Al Furqan",
        category: "tutorial",
    },
    {
        date: "2026-02-25",
        endDate: "2026-02-27",
        title: "Tutorial SPAI (Pekan 2)",
        category: "tutorial",
    },
    {
        date: "2026-02-28",
        endDate: "2026-03-01",
        title: "Tutorial PAI (Pekan 2)",
        location: "Aula ITC & Masjid Al Furqan",
        category: "tutorial",
    },
    {
        date: "2026-02-28",
        endDate: "2026-03-01",
        title: "Bina Mentor",
        category: "bina",
    },

    // ========== MARET 2026 ==========
    {
        date: "2026-03-01",
        title: "Bina Kader",
        location: "Aula ITC & Masjid Al Furqan",
        category: "bina",
    },
    {
        date: "2026-03-04",
        endDate: "2026-03-06",
        title: "Tutorial SPAI (Pekan 3)",
        category: "tutorial",
    },
    {
        date: "2026-03-07",
        endDate: "2026-03-08",
        title: "Tutorial PAI (Pekan 3)",
        location: "Aula ITC & Masjid Al Furqan",
        category: "tutorial",
    },
    {
        date: "2026-03-08",
        title: "Bina Kader",
        location: "Aula ITC & Masjid Al Furqan",
        category: "bina",
    },
    {
        date: "2026-03-11",
        endDate: "2026-03-13",
        title: "Tutorial SPAI (Pekan 4)",
        category: "tutorial",
    },

    // ========== APRIL 2026 ==========
    {
        date: "2026-04-04",
        endDate: "2026-04-05",
        title: "Tutorial PAI (Pekan 4)",
        location: "Aula ITC & Masjid Al Furqan",
        category: "tutorial",
    },
    {
        date: "2026-04-04",
        endDate: "2026-04-05",
        title: "Bina Mentor",
        category: "bina",
    },
    {
        date: "2026-04-05",
        title: "Bina Kader",
        location: "Aula ITC & Masjid Al Furqan",
        category: "bina",
    },
    {
        date: "2026-04-08",
        endDate: "2026-04-10",
        title: "Tutorial SPAI (Pekan 5)",
        category: "tutorial",
    },
    {
        date: "2026-04-11",
        endDate: "2026-04-12",
        title: "Shine on Saturday/Sunday (SoS)",
        description: "Tutorial PAI",
        location: "Aula ITC & Masjid Al Furqan",
        category: "tutorial",
    },
    {
        date: "2026-04-12",
        title: "Bina Kader",
        category: "bina",
    },
    {
        date: "2026-04-15",
        endDate: "2026-04-17",
        title: "Wonderful of Warrior",
        description: "Tutorial SPAI",
        category: "tutorial",
    },
    {
        date: "2026-04-18",
        endDate: "2026-04-19",
        title: "Tutorial PAI (Pekan 6)",
        location: "Aula ITC & Masjid Al Furqan",
        category: "tutorial",
    },
    {
        date: "2026-04-18",
        endDate: "2026-04-19",
        title: "Bina Mentor",
        category: "bina",
    },
    {
        date: "2026-04-18",
        title: "Kajian Rutin 2",
        location: "Aula ITC",
        category: "seminar",
    },
    {
        date: "2026-04-19",
        title: "Bina Kader",
        location: "Aula ITC & Masjid Al Furqan",
        category: "bina",
    },
    {
        date: "2026-04-22",
        endDate: "2026-04-24",
        title: "Tutorial SPAI (Pekan 7)",
        category: "tutorial",
    },
    {
        date: "2026-04-25",
        endDate: "2026-04-26",
        title: "Tutorial PAI (Pekan 7)",
        location: "Aula ITC & Masjid Al Furqan",
        category: "tutorial",
    },
    {
        date: "2026-04-26",
        title: "Bina Kader",
        location: "Aula ITC & Masjid Al Furqan",
        category: "bina",
    },

    // ========== MEI 2026 ==========
    {
        date: "2026-05-02",
        endDate: "2026-05-03",
        title: "Pengukuhan Bina Kader 42",
        location: "Aula ITC & Masjid Al Furqan",
        category: "bina",
    },
    {
        date: "2026-05-08",
        title: "Tutorial SPAI (Penutupan)",
        category: "tutorial",
    },
    {
        date: "2026-05-09",
        endDate: "2026-05-10",
        title: "Penutupan Tutorial PAI SPAI",
        description: "Penutupan Tutorial PAI SPAI UPI Semester Genap 2025/2026",
        location: "Aula ITC & Masjid Al Furqan",
        category: "penutupan",
    },
    {
        date: "2026-05-09",
        endDate: "2026-05-10",
        title: "Apresiasi Mentor",
        category: "lainnya",
    },
    {
        date: "2026-05-16",
        title: "Pembinaan Member Mula & Calon Mentor (Day 1)",
        location: "Aula ITC & Masjid Al Furqan",
        category: "bina",
    },
    {
        date: "2026-05-17",
        title: "Pembinaan Member Mula & Calon Mentor (Day 2)",
        location: "Aula ITC & Masjid Al Furqan",
        category: "bina",
    },
    {
        date: "2026-05-17",
        title: "Pembekalan Brand Ambassador Tutorial",
        location: "Aula ITC dan Online",
        category: "lainnya",
    },

    // ========== JUNI - AGUSTUS 2026 ==========
    {
        date: "2026-06-06",
        endDate: "2026-06-07",
        title: "Projek Mini Tutorial",
        location: "Aula ITC & Masjid Al Furqan",
        category: "lainnya",
    },
    {
        date: "2026-06-20",
        endDate: "2026-06-21",
        title: "Rihlah",
        category: "lainnya",
    },
    {
        date: "2026-07-04",
        endDate: "2026-07-05",
        title: "Evaluasi Sughra",
        location: "Aula ITC dan Online",
        category: "musyawarah",
    },
    {
        date: "2026-07-11",
        title: "Sosialisasi Pemilihan Ketua Umum",
        location: "Online",
        category: "musyawarah",
    },
    {
        date: "2026-07-12",
        endDate: "2026-07-16",
        title: "Administrasi Calon Ketua Umum",
        category: "musyawarah",
    },
    {
        date: "2026-07-18",
        endDate: "2026-07-25",
        title: "Wawancara Calon Ketua Umum",
        category: "musyawarah",
    },
    {
        date: "2026-08-07",
        title: "Serah Terima Jabatan",
        location: "Aula ITC",
        category: "penutupan",
    },
];

// Category colors for display
export const CATEGORY_COLORS: Record<TimelineEvent["category"], { bg: string; text: string; dot: string }> = {
    pembukaan: { bg: "bg-primary-100", text: "text-primary-700", dot: "bg-primary-600" },
    tutorial: { bg: "bg-secondary-100", text: "text-secondary-700", dot: "bg-secondary-600" },
    bina: { bg: "bg-accent-100", text: "text-accent-700", dot: "bg-accent-600" },
    seminar: { bg: "bg-primary-50", text: "text-primary-600", dot: "bg-primary-500" },
    musyawarah: { bg: "bg-neutral-100", text: "text-neutral-700", dot: "bg-neutral-600" },
    penutupan: { bg: "bg-primary-100", text: "text-primary-700", dot: "bg-primary-600" },
    lainnya: { bg: "bg-neutral-50", text: "text-neutral-600", dot: "bg-neutral-400" },
};

// Helper to get events for a specific date
export function getEventsForDate(date: Date): TimelineEvent[] {
    const dateStr = date.toISOString().split("T")[0];
    return TIMELINE_EVENTS.filter((event) => {
        if (event.date === dateStr) return true;
        if (event.endDate) {
            const start = new Date(event.date);
            const end = new Date(event.endDate);
            return date >= start && date <= end;
        }
        return false;
    });
}

// Helper to check if date has events
export function hasEventsOnDate(date: Date): boolean {
    return getEventsForDate(date).length > 0;
}
