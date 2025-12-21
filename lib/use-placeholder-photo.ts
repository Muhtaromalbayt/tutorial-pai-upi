"use client";

import { useState, useEffect } from "react";

interface PlaceholderPhoto {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    category: string;
    placeholder: string;
}

interface PlaceholderPhotoResponse {
    photo: PlaceholderPhoto | null;
    previewUrl: string | null;
    fallback: boolean;
    message?: string;
}

interface PlaceholderPhotoResult {
    photo: PlaceholderPhoto | null;
    previewUrl: string | null;
    fallback: boolean;
    loading: boolean;
    error: string | null;
}

/**
 * Hook to fetch a photo by placeholder ID
 * Usage: const { previewUrl, loading, fallback } = usePlaceholderPhoto("hero_home", "/fallback.jpg");
 */
export function usePlaceholderPhoto(placeholderId: string, fallbackUrl?: string): PlaceholderPhotoResult {
    const [result, setResult] = useState<PlaceholderPhotoResult>({
        photo: null,
        previewUrl: fallbackUrl || null,
        fallback: true,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!placeholderId) {
            setResult(prev => ({ ...prev, loading: false }));
            return;
        }

        const fetchPhoto = async () => {
            try {
                const response = await fetch(`/api/gallery/placeholder/${placeholderId}`);
                const data: PlaceholderPhotoResponse = await response.json();

                if (data.photo && data.previewUrl) {
                    setResult({
                        photo: data.photo,
                        previewUrl: data.previewUrl,
                        fallback: false,
                        loading: false,
                        error: null,
                    });
                } else {
                    // No photo found, use fallback
                    setResult({
                        photo: null,
                        previewUrl: fallbackUrl || null,
                        fallback: true,
                        loading: false,
                        error: null,
                    });
                }
            } catch (error) {
                console.error(`Error fetching placeholder photo ${placeholderId}:`, error);
                setResult({
                    photo: null,
                    previewUrl: fallbackUrl || null,
                    fallback: true,
                    loading: false,
                    error: error instanceof Error ? error.message : "Unknown error",
                });
            }
        };

        fetchPhoto();
    }, [placeholderId, fallbackUrl]);

    return result;
}

/**
 * Function to fetch placeholder photo (non-hook version for SSR or one-time fetch)
 */
export async function fetchPlaceholderPhoto(placeholderId: string): Promise<{
    previewUrl: string | null;
    photo: PlaceholderPhoto | null;
    fallback: boolean;
}> {
    try {
        const response = await fetch(`/api/gallery/placeholder/${placeholderId}`);
        const data: PlaceholderPhotoResponse = await response.json();

        if (data.photo && data.previewUrl) {
            return {
                previewUrl: data.previewUrl,
                photo: data.photo,
                fallback: false,
            };
        }

        return {
            previewUrl: null,
            photo: null,
            fallback: true,
        };
    } catch (error) {
        console.error(`Error fetching placeholder photo ${placeholderId}:`, error);
        return {
            previewUrl: null,
            photo: null,
            fallback: true,
        };
    }
}
