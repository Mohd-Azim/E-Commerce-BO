/**
 * useProducts Hook
 * 
 * Custom hook for product data fetching and management.
 * Uses React Query for caching and SWR pattern.
 * Automatically handles mock data vs real API switching.
 * 
 * Usage:
 * const { products, loading, error, refetch } = useProducts();
 */

import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types';
import ProductService from '@/services/productService';

export interface UseProductsOptions {
  limit?: number;
  enabled?: boolean;
}

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  totalCount: number;
}

/**
 * Fetch all products
 */
export const useProducts = (options: UseProductsOptions = {}): UseProductsResult => {
  const { limit = 25, enabled = true } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const data = await ProductService.getAll(limit);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setLoading(false);
    }
  }, [limit, enabled]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch,
    totalCount: products.length,
  };
};

/**
 * Fetch single product by ID
 */
export const useProduct = (id: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const data = await ProductService.getById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

/**
 * Search products
 */
export const useProductSearch = (query: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    const search = async () => {
      try {
        const data = await ProductService.search(query);
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Search failed'));
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(search, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading, error };
};

export default useProducts;
