import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

interface User {
    id: string
    email: string
    name: string
    role: string
}

interface Stats {
    total: number
    published: number
    drafts: number
}

async function fetchSession(): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE}/api/cms/session`, {
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error('Not authenticated')
    }
    return response.json()
}

async function fetchStats(): Promise<Stats> {
    const response = await fetch(`${API_BASE}/api/news`, {
        credentials: 'include'
    })
    if (!response.ok) {
        return { total: 0, published: 0, drafts: 0 }
    }
    const data = await response.json() as { news: any[] }
    const news = data.news || []
    return {
        total: news.length,
        published: news.filter((n: any) => n.isPublished).length,
        drafts: news.filter((n: any) => !n.isPublished).length,
    }
}

export const Route = createFileRoute('/dashboard')({
    component: DashboardPage,
})

function DashboardPage() {
    const navigate = useNavigate()

    const { data: sessionData, isLoading: sessionLoading, isError } = useQuery({
        queryKey: ['session'],
        queryFn: fetchSession,
        retry: false,
    })

    const { data: stats = { total: 0, published: 0, drafts: 0 } } = useQuery({
        queryKey: ['stats'],
        queryFn: fetchStats,
        enabled: !!sessionData,
    })

    useEffect(() => {
        if (isError) {
            navigate({ to: '/login' })
        }
    }, [isError, navigate])

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE}/api/cms/logout`, {
                method: 'POST',
                credentials: 'include'
            })
            navigate({ to: '/login' })
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    if (sessionLoading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-neutral-900">CMS Dashboard</h1>
                            <p className="text-sm text-neutral-600 mt-1">
                                Selamat datang, {sessionData?.user?.name}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm text-neutral-700 hover:text-neutral-900 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-neutral-600">Total Berita</p>
                                <p className="text-3xl font-bold text-neutral-900 mt-2">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-neutral-600">Published</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.published}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-neutral-600">Drafts</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.drafts}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 mb-4">Kelola Konten</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            to="/kabar-tutorial"
                            className="flex items-center p-4 border-2 border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900 group-hover:text-primary-700">
                                    Kabar Tutorial
                                </h3>
                                <p className="text-sm text-neutral-600">Kelola berita dan pengumuman</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
