"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Edge runtime for Cloudflare Pages
export const runtime = "edge";

interface NewsItem {
    id: string;
    title: string;
    content: string;
    category: string;
    imageUrl?: string;
    image_url?: string;
    author?: string;
    publishedDate?: string;
    published_date?: string;
    isPublished: boolean | number;
    is_published?: boolean | number;
    createdAt?: string;
    created_at?: string;
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

export default function NewsDetailPage() {
    const params = useParams();
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (params.id) {
            fetchNews(params.id as string);
        }
    }, [params.id]);

    const fetchNews = async (id: string) => {
        try {
            const response = await fetch("/api/news");
            const data = await response.json() as { news: NewsItem[] };
            const newsItem = (data.news || []).find((n: NewsItem) => n.id === id);

            if (newsItem) {
                setNews(newsItem);
            } else {
                setError("Berita tidak ditemukan");
            }
        } catch (err) {
            console.error("Error fetching news:", err);
            setError("Gagal memuat berita");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-neutral-50">
                <div className="container-upi py-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-neutral-200 rounded w-1/4 mb-8"></div>
                        <div className="h-64 bg-neutral-200 rounded-xl mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-neutral-200 rounded w-full"></div>
                            <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                            <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !news) {
        return (
            <main className="min-h-screen bg-neutral-50">
                <div className="container-upi py-12">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                            {error || "Berita tidak ditemukan"}
                        </h1>
                        <Link
                            href="/news"
                            className="text-primary-600 hover:text-primary-800 underline"
                        >
                            ← Kembali ke Kabar Tutorial
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-12">
                <div className="container-upi">
                    <Link
                        href="/news"
                        className="inline-flex items-center text-primary-100 hover:text-white mb-4 transition-colors"
                    >
                        ← Kembali ke Kabar Tutorial
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                            {news.category}
                        </span>
                        {(news.publishedDate || news.published_date) && (
                            <span className="text-primary-100 text-sm">
                                {news.publishedDate || news.published_date}
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        {news.title}
                    </h1>
                    {news.author && (
                        <p className="text-primary-100">
                            Oleh: {news.author}
                        </p>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="container-upi py-12">
                <article className="max-w-4xl mx-auto">
                    {/* Featured Image */}
                    {(news.imageUrl || news.image_url) && (
                        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={news.imageUrl || news.image_url}
                                alt={news.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none text-neutral-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: `<p class="mb-4">${renderMarkdown(news.content)}</p>`
                        }}
                    />
                </article>
            </div>
        </main>
    );
}
