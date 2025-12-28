/**
 * Google Drive URL Helper
 * 
 * Converts Google Drive share URLs to direct image URLs that can be displayed.
 */

/**
 * Convert Google Drive share URL to direct view URL
 * 
 * Supports formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * 
 * Returns the original URL if no Google Drive pattern is detected.
 */
export function convertGoogleDriveUrl(url: string): string {
    if (!url) return url;

    // Already in direct format
    if (url.includes('/uc?') && url.includes('export=view')) {
        return url;
    }

    // Format: /file/d/FILE_ID/view
    const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const fileMatch = url.match(filePattern);
    if (fileMatch) {
        return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
    }

    // Format: open?id=FILE_ID or uc?id=FILE_ID
    const idPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
    const idMatch = url.match(idPattern);
    if (idMatch) {
        return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }

    // Not a Google Drive URL, return as-is
    return url;
}

/**
 * Check if a URL is a Google Drive URL
 */
export function isGoogleDriveUrl(url: string): boolean {
    if (!url) return false;
    return url.includes('drive.google.com');
}

/**
 * Get a thumbnail URL for Google Drive (smaller size for previews)
 * 
 * @param url - Google Drive URL
 * @param size - Size in pixels (default 400)
 */
export function getGoogleDriveThumbnail(url: string, size: number = 400): string {
    if (!isGoogleDriveUrl(url)) return url;

    // Extract file ID
    const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const idPattern = /[?&]id=([a-zA-Z0-9_-]+)/;

    let fileId: string | null = null;

    const fileMatch = url.match(filePattern);
    if (fileMatch) {
        fileId = fileMatch[1];
    } else {
        const idMatch = url.match(idPattern);
        if (idMatch) {
            fileId = idMatch[1];
        }
    }

    if (fileId) {
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
    }

    return convertGoogleDriveUrl(url);
}
