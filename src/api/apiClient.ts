/**
 * Centralized API Client
 * 
 * Handles:
 * - HTTP requests (GET, POST, PUT, DELETE, PATCH)
 * - Request/Response interceptors
 * - JWT token management
 * - Error handling and retry logic
 * - Request timeouts
 * - Common headers
 * - Mock data toggle
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Create and configure Axios instance
 */
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: USE_MOCK_DATA ? undefined : API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  /**
   * Request Interceptor
   * - Add JWT token to headers
   * - Add custom headers
   */
  instance.interceptors.request.use(
    (config) => {
      // Add JWT token if available
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add request ID for tracing
      config.headers['X-Request-ID'] = generateRequestId();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * Response Interceptor
   * - Handle token refresh
   * - Handle global errors
   * - Parse response data
   */
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error: AxiosError) => {
      const config = error.config;

      // Handle 401 Unauthorized - Token expired
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          // Redirect to login
          window.location.href = '/login';
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.error('Access forbidden:', error.message);
      }

      // Handle 500 Server Error with retry
      if (error.response?.status === 500 && config && !config.headers['X-Retry-Attempt']) {
        config.headers['X-Retry-Attempt'] = '1';
        return instance(config);
      }

      // Format error response
      const errorResponse = {
        status: error.response?.status || 500,
        message: (error.response?.data as any)?.message || error.message || 'An error occurred',
        data: error.response?.data,
      };

      return Promise.reject(errorResponse);
    }
  );

  return instance;
};

/**
 * Generate unique request ID for tracing
 */
const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * API Client Interface
 */
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiError {
  status: number;
  message: string;
  data?: any;
}

/**
 * Main API Client Class
 */
export class ApiClient {
  private static instance: AxiosInstance;

  /**
   * Initialize API client
   */
  static initialize(): void {
    if (!ApiClient.instance) {
      ApiClient.instance = createApiClient();
    }
  }

  /**
   * GET request
   */
  static async get<T = any>(url: string, config?: any): Promise<T> {
    ApiClient.initialize();
    return ApiClient.instance.get<any, T>(url, config);
  }

  /**
   * POST request
   */
  static async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    ApiClient.initialize();
    return ApiClient.instance.post<any, T>(url, data, config);
  }

  /**
   * PUT request
   */
  static async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    ApiClient.initialize();
    return ApiClient.instance.put<any, T>(url, data, config);
  }

  /**
   * PATCH request
   */
  static async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    ApiClient.initialize();
    return ApiClient.instance.patch<any, T>(url, data, config);
  }

  /**
   * DELETE request
   */
  static async delete<T = any>(url: string, config?: any): Promise<T> {
    ApiClient.initialize();
    return ApiClient.instance.delete<any, T>(url, config);
  }

  /**
   * Set auth token
   */
  static setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
    ApiClient.initialize();
    ApiClient.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear auth token
   */
  static clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    ApiClient.initialize();
    delete ApiClient.instance.defaults.headers.common['Authorization'];
  }

  /**
   * Check if using mock data
   */
  static isUsingMockData(): boolean {
    return USE_MOCK_DATA;
  }
}

// Initialize on module load
ApiClient.initialize();

export default ApiClient;
