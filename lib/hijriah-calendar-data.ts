/**
 * Kalender Hijriah 1447 H - Data Statis
 * Berdasarkan Kalender Hijriah Global Tunggal (KHGT) Muhammadiyah
 * Source: https://khgt.muhammadiyah.or.id/kalendar-hijriah
 */

export interface HijriMonth {
    hijriMonth: number;
    hijriMonthName: string;
    hijriYear: number;
    gregorianRange: string;
    startGregorianDate: string; // ISO date format for first day of Hijri month
    daysInMonth: number;
    specialDays: SpecialDay[];
}

export interface SpecialDay {
    hijriDay: number;
    gregorianDate: string; // DD MMM YYYY format
    name: string;
    type: 'islamic' | 'activity'; // islamic = hari istimewa, activity = kegiatan organisasi
    description?: string;
    time?: string;
    location?: string;
}

export interface OrganizationActivity {
    date: string; // ISO date or readable format
    hijriDate?: string;
    title: string;
    description?: string;
    time?: string;
    location?: string;
    category?: string;
}

// Nama bulan Hijriah dalam bahasa Indonesia
export const HIJRI_MONTH_NAMES = [
    "Muharam",
    "Safar",
    "Rabiulawal",
    "Rabiulakhir",
    "Jumadilawal",
    "Jumadilakhir",
    "Rajab",
    "Syakban",
    "Ramadan",
    "Syawal",
    "Zulkaidah",
    "Zulhijah"
];

// Nama hari dalam bahasa Indonesia
export const DAY_NAMES = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

// Angka Arab untuk tanggal
export const ARABIC_NUMERALS: Record<number, string> = {
    1: "١", 2: "٢", 3: "٣", 4: "٤", 5: "٥",
    6: "٦", 7: "٧", 8: "٨", 9: "٩", 10: "١٠",
    11: "١١", 12: "١٢", 13: "١٣", 14: "١٤", 15: "١٥",
    16: "١٦", 17: "١٧", 18: "١٨", 19: "١٩", 20: "٢٠",
    21: "٢١", 22: "٢٢", 23: "٢٣", 24: "٢٤", 25: "٢٥",
    26: "٢٦", 27: "٢٧", 28: "٢٨", 29: "٢٩", 30: "٣٠"
};

/**
 * Data Kalender Hijriah 1447 H
 * Berdasarkan KHGT Muhammadiyah
 */
export const HIJRI_CALENDAR_1447: HijriMonth[] = [
    {
        hijriMonth: 1,
        hijriMonthName: "Muharam",
        hijriYear: 1447,
        gregorianRange: "Juni 2025 - Juli 2025",
        startGregorianDate: "2025-06-26",
        daysInMonth: 30,
        specialDays: [
            { hijriDay: 1, gregorianDate: "26 Jun 2025", name: "Hari Tahun Baru Islam (Hijriah)", type: "islamic" },
            { hijriDay: 9, gregorianDate: "04 Jul 2025", name: "Hari Tasua", type: "islamic" },
            { hijriDay: 10, gregorianDate: "05 Jul 2025", name: "Hari Asyura", type: "islamic" },
            { hijriDay: 13, gregorianDate: "08 Jul 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "09 Jul 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "10 Jul 2025", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 2,
        hijriMonthName: "Safar",
        hijriYear: 1447,
        gregorianRange: "Juli 2025 - Agustus 2025",
        startGregorianDate: "2025-07-26",
        daysInMonth: 29,
        specialDays: [
            { hijriDay: 13, gregorianDate: "07 Agt 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "08 Agt 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "09 Agt 2025", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 3,
        hijriMonthName: "Rabiulawal",
        hijriYear: 1447,
        gregorianRange: "Agustus 2025 - September 2025",
        startGregorianDate: "2025-08-24",
        daysInMonth: 30,
        specialDays: [
            { hijriDay: 12, gregorianDate: "04 Sep 2025", name: "Hari Maulid Nabi", type: "islamic" },
            { hijriDay: 13, gregorianDate: "05 Sep 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "06 Sep 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "07 Sep 2025", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 4,
        hijriMonthName: "Rabiulakhir",
        hijriYear: 1447,
        gregorianRange: "September 2025 - Oktober 2025",
        startGregorianDate: "2025-09-23",
        daysInMonth: 29,
        specialDays: [
            { hijriDay: 13, gregorianDate: "05 Okt 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "06 Okt 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "07 Okt 2025", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 5,
        hijriMonthName: "Jumadilawal",
        hijriYear: 1447,
        gregorianRange: "Oktober 2025 - November 2025",
        startGregorianDate: "2025-10-22",
        daysInMonth: 30,
        specialDays: [
            { hijriDay: 13, gregorianDate: "04 Nov 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "05 Nov 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "06 Nov 2025", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 6,
        hijriMonthName: "Jumadilakhir",
        hijriYear: 1447,
        gregorianRange: "November 2025 - Desember 2025",
        startGregorianDate: "2025-11-21",
        daysInMonth: 29,
        specialDays: [
            { hijriDay: 13, gregorianDate: "03 Des 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "04 Des 2025", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "05 Des 2025", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 7,
        hijriMonthName: "Rajab",
        hijriYear: 1447,
        gregorianRange: "Desember 2025 - Januari 2026",
        startGregorianDate: "2025-12-20",
        daysInMonth: 30,
        specialDays: [
            { hijriDay: 13, gregorianDate: "02 Jan 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "03 Jan 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "04 Jan 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 27, gregorianDate: "16 Jan 2026", name: "Hari Isra Mi'raj", type: "islamic" },
        ]
    },
    {
        hijriMonth: 8,
        hijriMonthName: "Syakban",
        hijriYear: 1447,
        gregorianRange: "Januari 2026 - Februari 2026",
        startGregorianDate: "2026-01-19",
        daysInMonth: 29,
        specialDays: [
            { hijriDay: 13, gregorianDate: "01 Feb 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "02 Feb 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "03 Feb 2026", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 9,
        hijriMonthName: "Ramadan",
        hijriYear: 1447,
        gregorianRange: "Februari 2026 - Maret 2026",
        startGregorianDate: "2026-02-17",
        daysInMonth: 30,
        specialDays: [
            { hijriDay: 1, gregorianDate: "18 Feb 2026", name: "Awal Ramadhan", type: "islamic" },
            { hijriDay: 13, gregorianDate: "02 Mar 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "03 Mar 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "04 Mar 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 17, gregorianDate: "06 Mar 2026", name: "Hari Nuzulul Quran", type: "islamic" },
        ]
    },
    {
        hijriMonth: 10,
        hijriMonthName: "Syawal",
        hijriYear: 1447,
        gregorianRange: "Maret 2026 - April 2026",
        startGregorianDate: "2026-03-19",
        daysInMonth: 29,
        specialDays: [
            { hijriDay: 1, gregorianDate: "20 Mar 2026", name: "Hari Idul Fitri", type: "islamic" },
            { hijriDay: 13, gregorianDate: "01 Apr 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "02 Apr 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "03 Apr 2026", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 11,
        hijriMonthName: "Zulkaidah",
        hijriYear: 1447,
        gregorianRange: "April 2026 - Mei 2026",
        startGregorianDate: "2026-04-17",
        daysInMonth: 30,
        specialDays: [
            { hijriDay: 13, gregorianDate: "30 Apr 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 14, gregorianDate: "01 Mei 2026", name: "Ayyamul Bidh", type: "islamic" },
            { hijriDay: 15, gregorianDate: "02 Mei 2026", name: "Ayyamul Bidh", type: "islamic" },
        ]
    },
    {
        hijriMonth: 12,
        hijriMonthName: "Zulhijah",
        hijriYear: 1447,
        gregorianRange: "Mei 2026 - Juni 2026",
        startGregorianDate: "2026-05-17",
        daysInMonth: 29,
        specialDays: [
            { hijriDay: 9, gregorianDate: "26 Mei 2026", name: "Hari Arafah", type: "islamic" },
            { hijriDay: 10, gregorianDate: "27 Mei 2026", name: "Hari Idul Adha", type: "islamic" },
            { hijriDay: 11, gregorianDate: "28 Mei 2026", name: "Hari Tasyrik", type: "islamic" },
            { hijriDay: 12, gregorianDate: "29 Mei 2026", name: "Hari Tasyrik", type: "islamic" },
            { hijriDay: 13, gregorianDate: "30 Mei 2026", name: "Hari Tasyrik", type: "islamic" },
        ]
    }
];

/**
 * Kegiatan Organisasi Tutorial PAI UPI
 * Semester Genap 2025/2026
 */
export const ORGANIZATION_ACTIVITIES: OrganizationActivity[] = [
    // Januari 2026
    { date: "2026-01-17", title: "Musyawarah Pimpinan (Hari 1)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-18", title: "Musyawarah Pimpinan (Hari 2)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-19", title: "Pembacaan SK dan Pengambilan Sumpah Jabatan", location: "Aula ITC", category: "Kepengurusan" },
    { date: "2026-01-24", title: "Musyawarah Bidang (Hari 1)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-25", title: "Musyawarah Bidang (Hari 2)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-26", title: "Musyawarah Bidang (Hari 3)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-27", title: "Musyawarah Bidang (Hari 4)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-28", title: "Musyawarah Bidang (Hari 5)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-29", title: "Musyawarah Bidang (Hari 6)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-30", title: "Musyawarah Bidang (Hari 7)", location: "-", category: "Kepengurusan" },
    { date: "2026-01-31", title: "Musyawarah Kerja (Hari 1)", location: "Aula ITC dan Online", category: "Kepengurusan" },

    // Februari 2026
    { date: "2026-02-01", title: "Musyawarah Kerja (Hari 2)", location: "Aula ITC dan Online", category: "Kepengurusan" },
    { date: "2026-02-02", title: "Sosialisasi Kahim", location: "Online", category: "Sosialisasi" },
    { date: "2026-02-07", title: "Sosialisasi PJ Tutorial PAI SPAI", location: "Aula ITC", category: "Sosialisasi" },
    { date: "2026-02-08", title: "In House Training Pengurus", location: "Aula ITC", category: "Kepengurusan" },
    { date: "2026-02-08", title: "Kajian Rutin 1 (Munggahan)", location: "Aula ITC", category: "Kajian" },
    { date: "2026-02-13", title: "Sosialisasi Delegasi", location: "Online", category: "Sosialisasi" },
    { date: "2026-02-14", title: "Sosialisasi Bina Kader", location: "Online & Aula ITC", category: "Sosialisasi" },
    { date: "2026-02-21", title: "Pembukaan dan Diklat Mentor Tutorial", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial" },
    { date: "2026-02-25", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-02-27", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-02-28", title: "Tutorial PAI Pekan Ke-dua", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-02-28", title: "Bina Mentor", time: "08.00 - 10.30 WIB", location: "-", category: "Bina Mentor" },

    // Maret 2026
    { date: "2026-03-01", title: "Tutorial PAI Pekan Ke-dua", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-03-01", title: "Bina Mentor", time: "08.00 - 10.30 WIB", location: "-", category: "Bina Mentor" },
    { date: "2026-03-01", title: "Bina Kader", time: "08.30 - 12.00 WIB", location: "-", category: "Bina Kader" },
    { date: "2026-03-04", title: "Tutorial SPAI Ke-tiga", time: "15.30 - 17.30 WIB", location: "Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-03-06", title: "Tutorial SPAI Ke-tiga", time: "15.30 - 17.30 WIB", location: "Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-03-07", title: "Tutorial PAI Pekan Ke-tiga", time: "08.45 - 13.00 WIB", location: "Aula ITC", category: "Tutorial PAI" },
    { date: "2026-03-08", title: "Tutorial PAI Pekan Ke-tiga", time: "08.45 - 13.00 WIB", location: "Aula ITC", category: "Tutorial PAI" },
    { date: "2026-03-08", title: "Bina Kader", time: "08.30 - 12.00 WIB", location: "Masjid Al Furqan", category: "Bina Kader" },

    // April 2026
    { date: "2026-04-04", title: "Tutorial PAI Pekan Ke-empat", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-04-04", title: "Bina Mentor", time: "08.00 - 10.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Bina Mentor" },
    { date: "2026-04-05", title: "Tutorial PAI Pekan Ke-empat", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-04-05", title: "Bina Mentor", time: "08.00 - 10.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Bina Mentor" },
    { date: "2026-04-05", title: "Bina Kader", time: "08.30 - 12.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Bina Kader" },
    { date: "2026-04-08", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-04-10", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-04-12", title: "Shine on Sunday (SoS) - Pekan Kelima", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-04-12", title: "Bina Kader", time: "08.30 - 12.00 WIB", location: "-", category: "Bina Kader" },
    { date: "2026-04-15", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-04-17", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-04-18", title: "Tutorial PAI Pekan Ke-enam", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-04-18", title: "Bina Mentor", time: "08.00 - 10.30 WIB", location: "-", category: "Bina Mentor" },
    { date: "2026-04-18", title: "Kajian Rutin 2", location: "Aula ITC", category: "Kajian" },
    { date: "2026-04-19", title: "Tutorial PAI Pekan Ke-enam", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-04-19", title: "Bina Mentor", time: "08.00 - 10.30 WIB", location: "-", category: "Bina Mentor" },
    { date: "2026-04-19", title: "Bina Kader", time: "08.30 - 12.00 WIB", location: "-", category: "Bina Kader" },
    { date: "2026-04-22", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-04-24", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-04-25", title: "Tutorial PAI Pekan Ke-tujuh", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-04-26", title: "Tutorial PAI Pekan Ke-tujuh", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-04-26", title: "Bina Kader", time: "08.30 - 12.00 WIB", location: "-", category: "Bina Kader" },
    { date: "2026-04-29", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial SPAI" },

    // Mei 2026
    { date: "2026-05-02", title: "Bina Kader 42 Pengukuhan (Hari 1)", time: "08.30 - 12.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Bina Kader" },
    { date: "2026-05-03", title: "Bina Kader 42 Pengukuhan (Hari 2)", time: "08.30 - 12.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Bina Kader" },
    { date: "2026-05-08", title: "Tutorial SPAI", time: "15.30 - 17.30 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial SPAI" },
    { date: "2026-05-09", title: "Tutorial PAI Pekan Ke-delapan", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-05-09", title: "Apresiasi Mentor", location: "-", category: "Apresiasi" },
    { date: "2026-05-10", title: "Tutorial PAI Pekan Ke-delapan", time: "08.45 - 13.00 WIB", location: "Aula ITC dan Masjid Al Furqan", category: "Tutorial PAI" },
    { date: "2026-05-10", title: "Apresiasi Mentor", location: "-", category: "Apresiasi" },
    { date: "2026-05-16", title: "Pembinaan Member Mula dan Calon Mentor Day 1", location: "Aula ITC dan Masjid Al Furqan", category: "Pembinaan" },
    { date: "2026-05-17", title: "Pembinaan Member Mula dan Calon Mentor Day 2", location: "Aula ITC dan Masjid Al Furqan", category: "Pembinaan" },
    { date: "2026-05-17", title: "Pembekalan Brand Ambassador Tutorial", location: "Aula ITC dan Online", category: "Pembekalan" },

    // Juni 2026
    { date: "2026-06-06", title: "Projek Mini Tutorial (Hari 1)", location: "Aula ITC dan Masjid Al Furqan", category: "Projek" },
    { date: "2026-06-07", title: "Projek Mini Tutorial (Hari 2)", location: "Aula ITC dan Masjid Al Furqan", category: "Projek" },
    { date: "2026-06-20", title: "Rihlah (Hari 1)", location: "-", category: "Rihlah" },
    { date: "2026-06-21", title: "Rihlah (Hari 2)", location: "-", category: "Rihlah" },

    // Juli 2026
    { date: "2026-07-04", title: "Evaluasi Sughra (Hari 1)", location: "Aula ITC dan Online", category: "Evaluasi" },
    { date: "2026-07-05", title: "Evaluasi Sughra (Hari 2)", location: "Aula ITC dan Online", category: "Evaluasi" },
    { date: "2026-07-11", title: "Sosialisasi Pemilihan Ketua Umum", location: "Online", category: "Sosialisasi" },

    // Agustus 2026
    { date: "2026-08-07", title: "Serah Terima Jabatan", location: "Aula ITC", category: "Kepengurusan" },
];

/**
 * Helper: Get month data by month number
 */
export function getHijriMonth(monthNumber: number): HijriMonth | undefined {
    return HIJRI_CALENDAR_1447.find(m => m.hijriMonth === monthNumber);
}

/**
 * Helper: Get current Hijri month based on today's date
 */
export function getCurrentHijriMonth(): HijriMonth {
    const today = new Date();

    // Find the month where today falls within the range
    for (const month of HIJRI_CALENDAR_1447) {
        const startDate = new Date(month.startGregorianDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + month.daysInMonth - 1);

        if (today >= startDate && today <= endDate) {
            return month;
        }
    }

    // Default to first month if not found (before calendar starts)
    // or last month if after calendar ends
    const firstMonth = HIJRI_CALENDAR_1447[0];
    const lastMonth = HIJRI_CALENDAR_1447[HIJRI_CALENDAR_1447.length - 1];
    const firstStart = new Date(firstMonth.startGregorianDate);

    if (today < firstStart) {
        return firstMonth;
    }
    return lastMonth;
}

/**
 * Helper: Calculate Gregorian date for a given Hijri day in a month
 */
export function getGregorianDateForHijriDay(month: HijriMonth, hijriDay: number): Date {
    const startDate = new Date(month.startGregorianDate);
    const result = new Date(startDate);
    result.setDate(result.getDate() + hijriDay - 1);
    return result;
}

/**
 * Helper: Get day of week for a Hijri day (0 = Ahad/Sunday)
 */
export function getDayOfWeek(month: HijriMonth, hijriDay: number): number {
    const gregDate = getGregorianDateForHijriDay(month, hijriDay);
    return gregDate.getDay();
}

/**
 * Helper: Format Gregorian date to Indonesian format
 */
export function formatGregorianDate(date: Date): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return `${date.getDate()} ${months[date.getMonth()]}`;
}

/**
 * Helper: Get all special days for display (Islamic + Activities)
 */
export function getAllSpecialDaysForMonth(month: HijriMonth): SpecialDay[] {
    // Combine Islamic special days with organization activities
    const islamicDays = month.specialDays;

    // Find activities that fall within this month
    const startDate = new Date(month.startGregorianDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + month.daysInMonth - 1);

    const activities: SpecialDay[] = ORGANIZATION_ACTIVITIES
        .filter(activity => {
            const actDate = new Date(activity.date);
            return actDate >= startDate && actDate <= endDate;
        })
        .map(activity => {
            const actDate = new Date(activity.date);
            const hijriDay = Math.floor((actDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            return {
                hijriDay,
                gregorianDate: formatGregorianDate(actDate),
                name: activity.title,
                type: 'activity' as const,
                description: activity.description,
                time: activity.time,
                location: activity.location
            };
        });

    return [...islamicDays, ...activities].sort((a, b) => a.hijriDay - b.hijriDay);
}
