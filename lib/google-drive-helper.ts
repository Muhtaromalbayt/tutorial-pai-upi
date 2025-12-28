/**
 * Google Drive URL Helper
 * 
 * Converts Google Drive share URLs to direct image URLs that can be displayed.
 * Uses thumbnail format which is more reliable than uc?export=view due to CORS.
 */

/**
 * Convert Google Drive share URL to HIGH RESOLUTION thumbnail URL
 * Using thumbnail?sz=w2000 for reliable loading (uc?export=view has CORS issues)
 * 
 * Supports formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * 
 * Returns the original URL if no Google Drive pattern is detected.
 */
export function convertGoogleDriveUrl(url: string, size: number = 2000): string {
    if (!url) return url;

    // Extract file ID
    let fileId = "";

    // Format: /file/d/FILE_ID/view
    const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const fileMatch = url.match(filePattern);
    if (fileMatch) {
        fileId = fileMatch[1];
    } else {
        // Format: open?id=FILE_ID or uc?id=FILE_ID
        const idPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
        const idMatch = url.match(idPattern);
        if (idMatch) {
            fileId = idMatch[1];
        }
    }

    if (fileId) {
        // Use thumbnail with sz=w2000 for high resolution (max supported)
        // This format is more reliable than uc?export=view which has CORS issues
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
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
    return convertGoogleDriveUrl(url, size);
}
