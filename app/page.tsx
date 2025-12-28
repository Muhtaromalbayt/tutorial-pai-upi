"use client";

import { useEffect, useState } from "react";
import HeroActivities from "@/components/HeroActivities";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import { usePlaceholderPhoto } from "@/lib/use-placeholder-photo";

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

  // Fetch photo from gallery by placeholder
  const { previewUrl: programUnggulanPhoto, loading: photoLoading } = usePlaceholderPhoto(
    "program_unggulan",
    "/assets/kegiatan/program-unggulan.png" // fallback
  );

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

      {/* News Section with Ocean Tint */}
      <section className="section-academic relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ocean-100/50 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-50/50 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none" />

        <div className="container-upi relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-heading">Kabar Tutorial</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary-600 to-ocean-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Ikuti perkembangan terbaru kegiatan dan informasi seputar Tutorial PAI-SPAI UPI.
            </p>
          </div>

          <NewsGrid />

          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center px-6 py-3 rounded-full bg-ocean-50 text-ocean-700 font-semibold hover:bg-ocean-100 transition-colors duration-300"
            >
              Lihat Semua Berita
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Unggulan Preview with Ocean Theme */}
      <section className="py-24 bg-gradient-to-b from-white to-ocean-50">
        <div className="container-upi">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 font-heading">
                Program Unggulan <span className="text-gradient-ocean">AL-FATH</span>
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Kami menghadirkan program-program berkualitas untuk membentuk karakter mahasiswa yang berintegritas dan berwawasan luas.
              </p>

              <div className="space-y-6">
                <div className="flex items-start group p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-ocean-100">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-ocean rounded-2xl flex items-center justify-center text-white mr-5 shadow-lg shadow-ocean-500/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading group-hover:text-ocean-700 transition-colors">Kuliah Dhuha</h3>
                    <p className="text-neutral-600">Kajian rutin pekanan yang membahas isu-isu kontemporer dari sudut pandang Islam.</p>
                  </div>
                </div>

                <div className="flex items-start group p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-ocean-100">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center text-white mr-5 shadow-lg shadow-primary-600/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading group-hover:text-primary-700 transition-colors">Mentoring Kelompok</h3>
                    <p className="text-neutral-600">Pendampingan intensif dalam kelompok kecil untuk pendalaman materi keislaman.</p>
                  </div>
                </div>

                <div className="flex items-start group p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-ocean-100">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-warm-500 to-warm-700 rounded-2xl flex items-center justify-center text-white mr-5 shadow-lg shadow-warm-500/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading group-hover:text-warm-700 transition-colors">Bina Kader</h3>
                    <p className="text-neutral-600">Program pengembangan soft skill dan kepemimpinan untuk calon penerus dakwah.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                {/* Image Border/Effect */}
                <div className="absolute inset-0 bg-gradient-ocean rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg"></div>
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  {/* Dynamic photo from gallery or fallback */}
                  <img
                    src={programUnggulanPhoto || "/assets/kegiatan/program-unggulan.png"}
                    alt="Program Tutorial"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                    <div>
                      <div className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3">Featured</div>
                      <h3 className="text-3xl font-bold text-white mb-2 font-heading">Program Pembinaan Karakter</h3>
                      <p className="text-gray-200 text-lg">Membentuk mahasiswa yang cerdas intelektual dan mulia akhlaknya.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
