"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { convertGoogleDriveUrl } from "@/lib/google-drive-helper";

interface NewsItem {
    id: string;
    title: string;
    content: string;
    category: string;
    imageUrl?: string;
    image_url?: string; // Fallback
    author?: string;
    publishedDate?: string;
    published_date?: string; // Fallback
    isPublished: boolean | number;
    is_published?: boolean | number; // Fallback
    createdAt?: string;
    created_at?: string; // Fallback
}

// Simple markdown to HTML converter
function renderMarkdown(text: string): string {
    if (!text) return "";
    return text
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3 text-neutral-900">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-neutral-900">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-neutral-900">$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary-600 underline hover:text-primary-800">$1</a>')
        .replace(/^- (.*)$/gim, '<li class="ml-6 mb-1">• $1</li>')
        .replace(/\n\n/g, '</p><p class="mb-4">')
        .replace(/\n/g, '<br/>');
}

// Extract plain text from markdown for excerpt
function getExcerpt(content: string, maxLength: number = 150): string {
    const plainText = content
        .replace(/^#{1,3} .*$/gim, '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/\[(.+?)\]\((.+?)\)/g, '$1')
        .replace(/^- /gim, '')
        .replace(/\n+/g, ' ')
        .trim();

    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
}

// Format date to Indonesian locale
function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

const categories = [
    { value: 'all', label: 'Semua' },
    { value: 'Kegiatan', label: 'Kegiatan' },
    { value: 'Pengumuman', label: 'Pengumuman' },
    { value: 'Artikel', label: 'Artikel' },
    { value: 'Info', label: 'Info' },
];

export default function NewsListPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetchNews();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredNews(news);
        } else {
            setFilteredNews(news.filter(item => item.category === selectedCategory));
        }
    }, [selectedCategory, news]);

    const fetchNews = async () => {
        try {
            const response = await fetch("/api/news");
            const data = await response.json() as { news: NewsItem[] };
            // Filter only published news
            const publishedNews = (data.news || []).filter((item: NewsItem) => {
                // Check both camelCase (Drizzle) and snake_case (Raw DB)
                const isPub = item.isPublished !== undefined ? item.isPublished : item.is_published;
                return isPub;
            });
            setNews(publishedNews);
            setFilteredNews(publishedNews);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    // Featured news (first item)
    const featuredNews = filteredNews[0];
    // Rest of the news
    const restNews = filteredNews.slice(1);

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="relative text-white py-24 md:py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-primary-900">
                    <Image
                        src="/assets/kuliah-dhuha-hero.jpg"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-60 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/60 to-primary-800/80 mix-blend-multiply"></div>
                </div>

                <div className="container-upi relative z-10 flex flex-col items-center text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors group px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 backdrop-blur-sm bg-black/10 text-sm font-medium"
                    >
                        <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-heading tracking-tight drop-shadow-lg">
                        Kabar Tutorial
                    </h1>
                    <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md font-light">
                        Ikuti perkembangan terbaru kegiatan dan informasi seputar Tutorial PAI-SPAI UPI Kabinet AL-FATH.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
                <div className="container-upi py-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <span className="text-sm text-neutral-500 font-medium whitespace-nowrap">Kategori:</span>
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat.value
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Content */}
            <section className="py-12 md:py-16">
                <div className="container-upi">
                    {loading ? (
                        /* Loading skeleton */
                        <div className="space-y-8">
                            {/* Featured skeleton */}
                            <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="md:flex">
                                    <div className="md:w-1/2 h-64 md:h-96 bg-neutral-200" />
                                    <div className="p-8 md:w-1/2 space-y-4">
                                        <div className="h-6 bg-neutral-200 rounded w-24" />
                                        <div className="h-8 bg-neutral-200 rounded w-3/4" />
                                        <div className="h-4 bg-neutral-200 rounded w-full" />
                                        <div className="h-4 bg-neutral-200 rounded w-5/6" />
                                    </div>
                                </div>
                            </div>
                            {/* Grid skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-md">
                                        <div className="h-48 bg-neutral-200" />
                                        <div className="p-6 space-y-3">
                                            <div className="h-4 bg-neutral-200 rounded w-20" />
                                            <div className="h-6 bg-neutral-200 rounded w-3/4" />
                                            <div className="h-4 bg-neutral-200 rounded w-full" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : filteredNews.length === 0 ? (
                        /* Empty state */
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Belum ada berita</h3>
                            <p className="text-neutral-600">
                                {selectedCategory !== 'all'
                                    ? `Tidak ada berita dalam kategori "${selectedCategory}".`
                                    : 'Belum ada berita yang dipublikasikan.'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* Featured News */}
                            {featuredNews && (
                                <Link
                                    href={`/news/${featuredNews.id}`}
                                    className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <div className="md:flex">
                                        <div className="md:w-1/2 relative h-64 md:h-[400px] overflow-hidden">
                                            {featuredNews.imageUrl || featuredNews.image_url ? (
                                                <img
                                                    src={convertGoogleDriveUrl(featuredNews.imageUrl || featuredNews.image_url || '')}
                                                    alt={featuredNews.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-ocean-100 flex items-center justify-center">
                                                    <svg className="w-20 h-20 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Featured badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                                    Berita Utama
                                                </span>
                                            </div>
                                        </div>
                                        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 bg-ocean-100 text-ocean-700 text-sm font-medium rounded-full">
                                                    {featuredNews.category}
                                                </span>
                                                {(featuredNews.publishedDate || featuredNews.published_date) && (
                                                    <span className="text-sm text-neutral-500">
                                                        {formatDate(featuredNews.publishedDate || featuredNews.published_date || '')}
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors font-heading">
                                                {featuredNews.title}
                                            </h2>
                                            <p className="text-neutral-600 text-lg mb-6 leading-relaxed">
                                                {getExcerpt(featuredNews.content, 200)}
                                            </p>
                                            {featuredNews.author && (
                                                <p className="text-sm text-neutral-500">
                                                    Oleh: <span className="font-medium text-neutral-700">{featuredNews.author}</span>
                                                </p>
                                            )}
                                            <div className="mt-6">
                                                <span className="inline-flex items-center text-primary-600 font-semibold group-hover:text-primary-700">
                                                    Baca selengkapnya
                                                    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Rest of News Grid */}
                            {restNews.length > 0 && (
                                <>
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-2xl font-bold text-neutral-900 font-heading">Berita Lainnya</h2>
                                        <div className="flex-1 h-px bg-neutral-200" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {restNews.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/news/${item.id}`}
                                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
                                            >
                                                <div className="relative h-48 overflow-hidden">
                                                    {item.imageUrl || item.image_url ? (
                                                        <img
                                                            src={convertGoogleDriveUrl(item.imageUrl || item.image_url || '')}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                                                            <svg className="w-12 h-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    <div className="absolute top-3 left-3">
                                                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium rounded-full shadow">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6 flex-1 flex flex-col">
                                                    {(item.publishedDate || item.published_date) && (
                                                        <span className="text-sm text-neutral-500 mb-2">
                                                            {formatDate(item.publishedDate || item.published_date || '')}
                                                        </span>
                                                    )}
                                                    <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2 font-heading">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-neutral-600 text-sm flex-1 line-clamp-3">
                                                        {getExcerpt(item.content, 120)}
                                                    </p>
                                                    <div className="mt-4 pt-4 border-t border-neutral-100">
                                                        <span className="inline-flex items-center text-primary-600 text-sm font-semibold group-hover:text-primary-700">
                                                            Baca selengkapnya
                                                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
