import HeroActivities from "@/components/HeroActivities";
import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section with Activity Photos */}
      <HeroActivities />

      {/* News Section */}
      <section className="section-academic bg-white">
        <div className="container-upi">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Kabar Tutorial</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
              Ikuti perkembangan terbaru kegiatan dan informasi seputar Tutorial PAI-SPAI UPI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Pembukaan Kuliah Dhuha Perdana"
              description="Ribuan mahasiswa antusias mengikuti Kuliah Dhuha perdana semester genap di Masjid Al-Furqan."
              date="18 Februari 2025"
              category="Kegiatan"
              imageUrl="/assets/kegiatan/placeholder-1.svg"
              href="/news/kuliah-dhuha-perdana"
            />
            <Card
              title="Seminar PAI: Membangun Generasi Rabbani"
              description="Seminar nasional menghadirkan pembicara inspiratif membahas tantangan pemuda masa kini."
              date="25 Februari 2025"
              category="Seminar"
              imageUrl="/assets/kegiatan/placeholder-2.svg"
              href="/news/seminar-pai"
            />
            <Card
              title="Open Recruitment Mentor 2025"
              description="Mari bergabung menjadi bagian dari kebaikan. Pendaftaran mentor Tutorial PAI kini dibuka."
              date="1 Maret 2025"
              category="Pengumuman"
              imageUrl="/assets/kegiatan/placeholder-3.svg"
              href="/news/oprec-mentor"
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Lihat Semua Berita
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Unggulan Preview */}
      <section className="py-20 bg-neutral-50">
        <div className="container-upi">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/kegiatan/placeholder-2.svg"
                  alt="Program Tutorial"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Program Pembinaan Karakter</h3>
                    <p>Membentuk mahasiswa yang cerdas intelektual dan mulia akhlaknya.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">Program Unggulan</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Kuliah Dhuha</h3>
                    <p className="text-neutral-600">Kajian rutin pekanan yang membahas isu-isu kontemporer dari sudut pandang Islam.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Mentoring Kelompok</h3>
                    <p className="text-neutral-600">Pendampingan intensif dalam kelompok kecil untuk pendalaman materi keislaman.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">Bina Kader</h3>
                    <p className="text-neutral-600">Program pengembangan soft skill dan kepemimpinan untuk calon penerus dakwah.</p>
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
