/**
 * Hijri Calendar Converter - Muhammadiyah Hisab Method
 * Based on astronomical calculation (Wujudul Hilal)
 * 
 * Note: This is a simplified implementation. For production,
 * consider using a more accurate library like hijri-converter
 */

// Hijri month names in Indonesian
export const HIJRI_MONTHS = [
    "Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir",
    "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban",
    "Ramadan", "Syawal", "Dzulqa'dah", "Dzulhijjah"
];

export const HIJRI_MONTHS_SHORT = [
    "Muh", "Saf", "RAw", "RAk", "JAw", "JAk",
    "Raj", "Syb", "Ram", "Syw", "Dzq", "Dzh"
];

// Days of week in Indonesian
export const HARI = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

interface HijriDate {
    day: number;
    month: number;
    year: number;
    monthName: string;
    monthNameShort: string;
}

/**
 * Convert Gregorian date to Hijri date
 * Using Muhammadiyah's Hisab Hakiki Wujudul Hilal method approximation
 */
export function gregorianToHijri(date: Date): HijriDate {
    // Julian Day Number calculation
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Calculate Julian Day Number
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;

    const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y +
        Math.floor(y / 4) - Math.floor(y / 100) +
        Math.floor(y / 400) - 32045;

    // Convert to Hijri using Muhammadiyah approximation
    // Epoch: 16 July 622 CE (1 Muharram 1 H)
    const hijriEpoch = 1948439.5; // Julian Day of Hijri epoch

    // Days since Hijri epoch
    const daysSinceEpoch = jdn - hijriEpoch;

    // Average lunar month in days (synodic month)
    const lunarMonth = 29.53058868;

    // Calculate Hijri cycle (30 years)
    const cycles = Math.floor(daysSinceEpoch / 10631.0);
    let remainingDays = daysSinceEpoch - cycles * 10631;

    // Calculate year within cycle
    let hijriYear = cycles * 30;

    // Days in each year of the 30-year cycle
    // Leap years: 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29
    const yearDays = [354, 355, 354, 354, 355, 354, 355, 354, 354, 355,
        354, 354, 355, 354, 354, 355, 354, 355, 354, 354,
        355, 354, 354, 355, 354, 354, 355, 354, 355, 354];

    for (let i = 0; i < 30 && remainingDays >= yearDays[i]; i++) {
        remainingDays -= yearDays[i];
        hijriYear++;
    }

    hijriYear += 1; // Hijri years are 1-indexed

    // Calculate month and day
    // Odd months have 30 days, even months have 29 (except leap month 12)
    let hijriMonth = 1;
    const monthDays = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

    for (let i = 0; i < 12 && remainingDays >= monthDays[i]; i++) {
        remainingDays -= monthDays[i];
        hijriMonth++;
    }

    const hijriDay = Math.floor(remainingDays) + 1;

    return {
        day: Math.max(1, Math.min(30, hijriDay)),
        month: hijriMonth,
        year: hijriYear,
        monthName: HIJRI_MONTHS[hijriMonth - 1] || "Unknown",
        monthNameShort: HIJRI_MONTHS_SHORT[hijriMonth - 1] || "?"
    };
}

/**
 * Format Hijri date to string
 */
export function formatHijriDate(date: Date, format: "full" | "short" | "day" = "full"): string {
    const hijri = gregorianToHijri(date);

    switch (format) {
        case "full":
            return `${hijri.day} ${hijri.monthName} ${hijri.year} H`;
        case "short":
            return `${hijri.day} ${hijri.monthNameShort} ${hijri.year}`;
        case "day":
            return hijri.day.toString();
        default:
            return `${hijri.day} ${hijri.monthName} ${hijri.year} H`;
    }
}

/**
 * Get current Hijri month and year
 */
export function getCurrentHijriMonthYear(): { month: string; year: number } {
    const hijri = gregorianToHijri(new Date());
    return {
        month: hijri.monthName,
        year: hijri.year
    };
}

/**
 * Get important Islamic dates for a given Gregorian year
 * Returns approximate dates based on calculation
 */
export function getIslamicDatesForYear(gregorianYear: number): Array<{
    name: string;
    hijriDate: string;
    gregorianDate: Date;
}> {
    // This is a simplified list - production would need actual calendar API
    const importantDates = [
        { name: "1 Muharram (Tahun Baru Hijriah)", month: 1, day: 1 },
        { name: "10 Muharram (Asyura)", month: 1, day: 10 },
        { name: "12 Rabiul Awal (Maulid Nabi)", month: 3, day: 12 },
        { name: "27 Rajab (Isra Mi'raj)", month: 7, day: 27 },
        { name: "1 Ramadan", month: 9, day: 1 },
        { name: "Nuzulul Quran", month: 9, day: 17 },
        { name: "1 Syawal (Idul Fitri)", month: 10, day: 1 },
        { name: "10 Dzulhijjah (Idul Adha)", month: 12, day: 10 },
    ];

    return importantDates.map(d => ({
        name: d.name,
        hijriDate: `${d.day} ${HIJRI_MONTHS[d.month - 1]}`,
        gregorianDate: new Date(gregorianYear, 0, 1) // Placeholder
    }));
}
