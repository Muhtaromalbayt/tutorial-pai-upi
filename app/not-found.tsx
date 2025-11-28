import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Halaman Tidak Ditemukan</h2>
            <p className="text-neutral-600 mb-8">Maaf, halaman yang Anda cari tidak tersedia.</p>
            <Link href="/" className="btn-primary">
                Kembali ke Beranda
            </Link>
        </div>
    )
}
