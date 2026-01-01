"use client";

import { useEffect, useState } from "react";
import HeroActivities from "@/components/HeroActivities";
import Card from "@/components/Card";
import GalleryCatalog from "@/components/GalleryCatalog";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  image_url?: string;
  publishedDate?: string;
  published_date?: string;
  isPublished: boolean | number;
  is_published?: boolean | number;
}

interface SiteSettings {
  hero_title?: string;
  hero_subtitle?: string;
  hero_image_url?: string;
  [key: string]: any;
}

function NewsGrid() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Fetch only news that should appear on home page
      const response = await fetch("/api/news?location=home");
      const data = await response.json() as { news: NewsItem[] };
      // Get first 3 news (already filtered by API)
      const publishedNews = (data.news || []).slice(0, 3);
      setNews(publishedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-neutral-200 h-48 rounded-t-xl"></div>
            <div className="bg-neutral-100 p-6 rounded-b-xl">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-neutral-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">Belum ada berita yang dipublikasikan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {news.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.content}
          date={item.publishedDate || item.published_date || ""}
          category={item.category}
          imageUrl={item.imageUrl || item.image_url || "/assets/kegiatan/default.png"}
          href={`/news/${item.id}`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json() as { settings?: SiteSettings };
      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    }
  };

  return (
    <main className="bg-neutral-50">
      {/* Hero Section with Activity Photos - now Dynamic */}
      <HeroActivities
        title={settings.hero_title}
        subtitle={settings.hero_subtitle}
        heroImage={settings.hero_image_url}
      />

      {/* News Section */}
      <section className="section-academic relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-50/50 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none" />

        <div className="container-upi relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-heading">Kabar Tutorial</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Ikuti perkembangan terbaru kegiatan dan informasi seputar Tutorial PAI-SPAI UPI.
            </p>
          </div>

          <NewsGrid />

          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary-50 text-primary-700 font-semibold hover:bg-primary-100 transition-colors duration-300"
            >
              Lihat Semua Berita
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Catalog - Dokumentasi Kegiatan */}
      <GalleryCatalog />
    </main>
  );
}
