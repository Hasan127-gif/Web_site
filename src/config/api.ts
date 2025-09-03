import { config } from './env'

// API Client
export const apiClient = {
  async get<T>(endpoint: string): Promise<{ data: T }> {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { data: await response.json() }
  },

  async post<T>(endpoint: string, data: any): Promise<{ data: T }> {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { data: await response.json() }
  },

  async put<T>(endpoint: string, data: any): Promise<{ data: T }> {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { data: await response.json() }
  },

  async delete<T>(endpoint: string): Promise<{ data: T }> {
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { data: await response.json() }
  },

  async upload<T>(endpoint: string, file: File): Promise<{ data: T }> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${config.api.baseUrl}${endpoint}`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return { data: await response.json() }
  },
}

// API Endpoints
export const endpoints = {
  // Listings
  listings: '/listings',
  listing: (id: string) => `/listings/${id}`,
  
  // Users
  users: '/users',
  user: (id: string) => `/users/${id}`,
  
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  refresh: '/auth/refresh',
  
  // Upload
  upload: '/upload',
  
  // Search
  search: '/search',
} as const
