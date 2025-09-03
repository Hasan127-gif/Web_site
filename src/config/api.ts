import { config } from './env';

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface ApiError {
  message: string;
  status: number;
  errors?: string[];
}

// API Client class
class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = config.api.baseUrl;
    this.timeout = config.api.timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    };

    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.request<T>(url.pathname + url.search, {
      method: 'GET',
    });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // File upload
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// API endpoints
export const endpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verify: '/auth/verify',
  },

  // Users
  users: {
    profile: '/users/profile',
    update: '/users/update',
    verify: '/users/verify',
  },

  // Listings
  listings: {
    list: '/listings',
    create: '/listings',
    get: (id: string) => `/listings/${id}`,
    update: (id: string) => `/listings/${id}`,
    delete: (id: string) => `/listings/${id}`,
    search: '/listings/search',
    featured: '/listings/featured',
  },

  // Categories
  categories: {
    roommate: '/listings/roommate',
    pets: '/listings/pets',
    furniture: '/listings/furniture',
  },

  // Messages
  messages: {
    list: '/messages',
    send: '/messages',
    get: (id: string) => `/messages/${id}`,
  },

  // AI
  ai: {
    recommendations: '/ai/recommendations',
    optimize: '/ai/optimize',
    match: '/ai/match',
  },

  // Upload
  upload: {
    image: '/upload/image',
    document: '/upload/document',
  },
} as const;
