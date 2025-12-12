import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

interface NewsItem {
    id: string
    title: string
    content: string
    category: string
    imageUrl?: string
    author?: string
    publishedDate?: string
    isPublished: boolean
}

interface FormData {
    title: string
    content: string
    category: string
    imageUrl: string
    author: string
    publishedDate: string
    isPublished: boolean
}

async function fetchNews(): Promise<NewsItem[]> {
    const response = await fetch(`${API_BASE}/api/news`, {
        credentials: 'include'
    })
    if (!response.ok) throw new Error('Failed to fetch news')
    const data = await response.json() as { news: NewsItem[] }
    return data.news || []
}

async function checkSession() {
    const response = await fetch(`${API_BASE}/api/cms/session`, {
        credentials: 'include'
    })
    if (!response.ok) throw new Error('Not authenticated')
    return response.json()
}

export const Route = createFileRoute('/kabar-tutorial')({
    component: KabarTutorialPage,
})

function KabarTutorialPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        category: 'Kegiatan',
        imageUrl: '',
        author: '',
        publishedDate: '',
        isPublished: false,
    })

    // Check session
    const { isError: sessionError } = useQuery({
        queryKey: ['session'],
        queryFn: checkSession,
        retry: false,
    })

    useEffect(() => {
        if (sessionError) {
            navigate({ to: '/login' })
        }
    }, [sessionError, navigate])

    // Fetch news
    const { data: newsList = [], isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: fetchNews,
    })

    // Create/Update mutation
    const saveMutation = useMutation({
        mutationFn: async (data: FormData & { id?: string }) => {
            const response = await fetch(`${API_BASE}/api/news`, {
                method: data.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to save')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
            resetForm()
            alert(editingId ? 'Berita berhasil diupdate!' : 'Berita berhasil ditambahkan!')
        },
        onError: () => {
            alert('Gagal menyimpan berita')
        },
    })

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_BASE}/api/news?id=${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (!response.ok) throw new Error('Failed to delete')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['news'] })
            queryClient.invalidateQueries({ queryKey: ['stats'] })
            alert('Berita berhasil dihapus!')
        },
        onError: () => {
            alert('Gagal menghapus berita')
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        saveMutation.mutate({ ...formData, ...(editingId && { id: editingId }) })
    }

    const handleEdit = (news: NewsItem) => {
        setFormData({
            title: news.title,
            content: news.content,
            category: news.category || 'Kegiatan',
            imageUrl: news.imageUrl || '',
            author: news.author || '',
            publishedDate: news.publishedDate || '',
            isPublished: news.isPublished,
        })
        setEditingId(news.id)
        setShowForm(true)
    }

    const handleDelete = (id: string) => {
        if (!confirm('Yakin ingin menghapus berita ini?')) return
        deleteMutation.mutate(id)
    }

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            category: 'Kegiatan',
            imageUrl: '',
            author: '',
            publishedDate: '',
            isPublished: false,
        })
        setEditingId(null)
        setShowForm(false)
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link
                                to="/dashboard"
                                className="text-sm text-neutral-600 hover:text-primary-600 mb-2 inline-block"
                            >
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold text-neutral-900">Kelola Kabar Tutorial</h1>
                        </div>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                            {showForm ? 'Tutup Form' : '+ Tambah Berita'}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Form */}
                {showForm && (
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">
                            {editingId ? 'Edit Berita' : 'Tambah Berita Baru'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Judul*</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Judul Berita"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Konten/Deskripsi*</label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Deskripsi singkat berita..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        <option value="Kegiatan">Kegiatan</option>
                                        <option value="Seminar">Seminar</option>
                                        <option value="Pengumuman">Pengumuman</option>
                                        <option value="Berita">Berita</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Penulis</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Nama Penulis"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">URL Gambar</label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="/assets/kegiatan/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Tanggal Publish</label>
                                    <input
                                        type="date"
                                        value={formData.publishedDate}
                                        onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                                />
                                <label htmlFor="isPublished" className="ml-2 block text-sm text-neutral-900">
                                    Publish Sekarang
                                </label>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={saveMutation.isPending}
                                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                                >
                                    {saveMutation.isPending ? 'Menyimpan...' : (editingId ? 'Update Berita' : 'Simpan Berita')}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-200">
                        <h2 className="text-lg font-semibold text-neutral-900">
                            Daftar Berita ({newsList.length})
                        </h2>
                    </div>

                    {isLoading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-neutral-600">Memuat berita...</p>
                        </div>
                    ) : newsList.length === 0 ? (
                        <div className="p-8 text-center text-neutral-600">
                            Belum ada berita. Klik "Tambah Berita" untuk menambahkan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-neutral-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Judul</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Tanggal</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200">
                                    {newsList.map((news) => (
                                        <tr key={news.id} className="hover:bg-neutral-50">
                                            <td className="px-6 py-4 text-sm font-medium text-neutral-900">{news.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {news.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                                {news.publishedDate || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                                                {news.isPublished ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleEdit(news)} className="text-primary-600 hover:text-primary-900 mr-4">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(news.id)}
                                                    disabled={deleteMutation.isPending}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
