const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export async function apiRequest<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        credentials: 'include', // Include cookies for authentication
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// Auth API
export const authApi = {
    login: (email: string, password: string) =>
        apiRequest<{ success: boolean; user: any }>('/api/cms/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    logout: () =>
        apiRequest<{ success: boolean }>('/api/cms/logout', {
            method: 'POST',
        }),

    getSession: () =>
        apiRequest<{ user: any }>('/api/cms/session'),
};

// News API
export const newsApi = {
    getAll: () =>
        apiRequest<{ news: any[] }>('/api/news'),

    create: (data: any) =>
        apiRequest<{ success: boolean }>('/api/news', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (data: any) =>
        apiRequest<{ success: boolean }>('/api/news', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id: string) =>
        apiRequest<{ success: boolean }>(`/api/news?id=${id}`, {
            method: 'DELETE',
        }),
};
