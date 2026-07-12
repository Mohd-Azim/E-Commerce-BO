/**
 * Product Service
 * 
 * Handles all product-related API calls and mock data switching.
 * Components never call API directly - they use this service.
 */

import { Product } from '@/types';
import { ApiClient, API_ENDPOINTS } from '@/api';
import { generateProducts } from '@/mock/generators';

/**
 * Product Service Class
 */
export class ProductService {
  /**
   * Get all products
   * 
   * Automatically uses mock data or real API based on environment variable
   */
  static async getAll(limit: number = 25): Promise<Product[]> {
    try {
      if (ApiClient.isUsingMockData()) {
        // Use mock data
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(generateProducts(limit));
          }, 500); // Simulate network delay
        });
      }

      // Use real API
      const response = await ApiClient.get<Product[]>(API_ENDPOINTS.PRODUCT.GET_ALL);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get single product by ID
   */
  static async getById(id: string): Promise<Product> {
    try {
      if (ApiClient.isUsingMockData()) {
        const products = generateProducts(50);
        const product = products.find((p) => p.id === id);
        if (!product) throw new Error('Product not found');
        return product;
      }

      return await ApiClient.get<Product>(API_ENDPOINTS.PRODUCT.GET_ONE(id));
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  /**
   * Create new product
   */
  static async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      if (ApiClient.isUsingMockData()) {
        // Mock: return with generated ID
        return {
          ...product,
          id: `prod_${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

      return await ApiClient.post<Product>(API_ENDPOINTS.PRODUCT.CREATE, product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update product
   */
  static async update(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      if (ApiClient.isUsingMockData()) {
        // Mock: return updated product
        return {
          ...(generateProducts(1)[0]),
          ...updates,
          id,
          updatedAt: new Date(),
        };
      }

      return await ApiClient.put<Product>(API_ENDPOINTS.PRODUCT.UPDATE(id), updates);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  /**
   * Delete product
   */
  static async delete(id: string): Promise<void> {
    try {
      if (ApiClient.isUsingMockData()) {
        // Mock: no-op
        return;
      }

      await ApiClient.delete(API_ENDPOINTS.PRODUCT.DELETE(id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  /**
   * Search products
   */
  static async search(query: string): Promise<Product[]> {
    try {
      if (ApiClient.isUsingMockData()) {
        const all = generateProducts(50);
        return all.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase())
        );
      }

      return await ApiClient.get<Product[]>(API_ENDPOINTS.PRODUCT.SEARCH, {
        params: { q: query },
      });
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  /**
   * Bulk update products
   */
  static async bulkUpdate(updates: Array<{ id: string; data: Partial<Product> }>): Promise<void> {
    try {
      if (ApiClient.isUsingMockData()) {
        // Mock: no-op
        return;
      }

      await ApiClient.post(API_ENDPOINTS.PRODUCT.BULK_UPDATE, { updates });
    } catch (error) {
      console.error('Error bulk updating products:', error);
      throw error;
    }
  }
}

export default ProductService;
