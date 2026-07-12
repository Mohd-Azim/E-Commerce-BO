# API Architecture Guide

## Overview

This document describes the enterprise API architecture implemented for the E-Commerce Dashboard. It ensures clean separation of concerns, easy backend integration, and automatic switching between mock data and real APIs.

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                   React Components                       │
│              (Dashboard, Orders, Products, etc)         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                 Custom Hooks                            │
│    (useProducts, useOrders, useCustomers, etc)         │
│              Data fetching & caching                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                 Service Layer                           │
│  (ProductService, OrderService, CustomerService, etc)  │
│   Business logic + Mock/Real API switching             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                 API Client                              │
│  (Axios wrapper with interceptors & error handling)    │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼──────────┐     ┌───────▼──────────┐
│   Mock Data      │     │   Real Backend   │
│  (Generators)    │     │    API Server    │
└──────────────────┘     └──────────────────┘
```

---

## File Structure

```
src/
├── api/
│   ├── apiEndpoints.ts    # All API routes (60+ endpoints)
│   ├── apiClient.ts       # HTTP client with interceptors
│   └── index.ts           # Exports
│
├── services/
│   ├── productService.ts  # Product API calls + mock switching
│   ├── orderService.ts    # Order API calls + mock switching
│   ├── customerService.ts # Customer API calls + mock switching
│   └── ... (more services)
│
├── hooks/
│   ├── useProducts.ts     # useProducts, useProduct, useProductSearch
│   ├── useOrders.ts       # useOrders, useOrder, useOrderSearch
│   ├── useCustomers.ts    # useCustomers, useCustomer, etc
│   └── ... (more hooks)
│
├── mock/
│   ├── generators.ts      # Mock data generation (faker.js)
│   └── ... (more mock data files)
│
└── components/
    └── ... (UI components that use hooks)
```

---

## Usage Examples

### 1. Using in Components (Recommended)

```tsx
import { useProducts } from '@/hooks/useProducts';

export function ProductsPage() {
  const { products, loading, error, refetch } = useProducts({ limit: 25 });

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (products.length === 0) return <EmptyState />;

  return (
    <ProductTable 
      data={products}
      onRefresh={refetch}
    />
  );
}
```

### 2. Service Layer (For Custom Logic)

```tsx
import ProductService from '@/services/productService';

// Somewhere in a component or hook
const product = await ProductService.getById('prod_123');
const all = await ProductService.getAll(50);
const results = await ProductService.search('laptop');
```

### 3. Direct API Client (Rare - Use Services Instead)

```tsx
import { ApiClient, API_ENDPOINTS } from '@/api';

// Only use this for one-off requests not covered by services
const data = await ApiClient.get(API_ENDPOINTS.PRODUCT.GET_ALL);
```

---

## Environment Toggle: Mock vs Real API

### Setup

Create or update `.env.local`:

```env
# Use 'true' for mock data (no API calls)
# Use 'false' for real backend API
NEXT_PUBLIC_USE_MOCK_DATA=true

# Backend API URL (when USE_MOCK_DATA is false)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### How It Works

**Services automatically switch based on environment:**

```ts
export class ProductService {
  static async getAll(limit: number = 25): Promise<Product[]> {
    if (ApiClient.isUsingMockData()) {
      // Use mock data (generateProducts)
      return generateProducts(limit);
    }
    // Use real API
    return await ApiClient.get(API_ENDPOINTS.PRODUCT.GET_ALL);
  }
}
```

**No component code changes needed** - just change the environment variable!

### Switching Between Mock and Real

```bash
# Use mock data (frontend development)
echo 'NEXT_PUBLIC_USE_MOCK_DATA=true' > .env.local

# Use real API (backend integration)
echo 'NEXT_PUBLIC_USE_MOCK_DATA=false' > .env.local
echo 'NEXT_PUBLIC_API_BASE_URL=http://localhost:3001' >> .env.local
```

---

## Adding a New API Endpoint

### Step 1: Add to API Endpoints

File: `src/api/apiEndpoints.ts`

```ts
export const API_ENDPOINTS = {
  // ... existing endpoints
  
  SHIPMENT: {
    GET_ALL: `${API_VERSION}/shipments`,
    GET_ONE: (id: string) => `${API_VERSION}/shipments/${id}`,
    CREATE: `${API_VERSION}/shipments`,
    UPDATE: (id: string) => `${API_VERSION}/shipments/${id}`,
    CANCEL: (id: string) => `${API_VERSION}/shipments/${id}/cancel`,
  },
};
```

### Step 2: Create Service

File: `src/services/shipmentService.ts`

```ts
import { Shipment } from '@/types';
import { ApiClient, API_ENDPOINTS } from '@/api';
import { generateShipments } from '@/mock/generators';

export class ShipmentService {
  static async getAll(limit: number = 25): Promise<Shipment[]> {
    if (ApiClient.isUsingMockData()) {
      return generateShipments(limit);
    }
    return await ApiClient.get(API_ENDPOINTS.SHIPMENT.GET_ALL);
  }

  static async getById(id: string): Promise<Shipment> {
    if (ApiClient.isUsingMockData()) {
      const shipments = generateShipments(50);
      return shipments.find((s) => s.id === id)!;
    }
    return await ApiClient.get(API_ENDPOINTS.SHIPMENT.GET_ONE(id));
  }

  // Add other methods...
}
```

### Step 3: Create Hook

File: `src/hooks/useShipments.ts`

```ts
import { useState, useEffect, useCallback } from 'react';
import { Shipment } from '@/types';
import ShipmentService from '@/services/shipmentService';

export const useShipments = (limit: number = 25) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ShipmentService.getAll(limit);
      setShipments(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { shipments, loading, error, refetch: fetch };
};
```

### Step 4: Use in Component

```tsx
import { useShipments } from '@/hooks/useShipments';

export function ShipmentsPage() {
  const { shipments, loading, error } = useShipments();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return <ShipmentTable data={shipments} />;
}
```

---

## Backend Integration Checklist

When connecting to your backend, follow this checklist:

- [ ] Update `API_ENDPOINTS` if routes differ
- [ ] Update `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- [ ] Set `NEXT_PUBLIC_USE_MOCK_DATA=false`
- [ ] Update services to match backend response structure
- [ ] Test each page one by one
- [ ] Handle new error cases in API client
- [ ] Add request/response logging if needed

**Important:** If the backend structure differs from mock data types:

1. Update types in `src/types/index.ts`
2. Update service response mapping
3. Update components to use new type structure
4. Tests will catch type mismatches

---

## API Client Features

### Request Interceptor

Automatically adds:

- JWT authentication token (from localStorage)
- Request ID for tracing
- Common headers

```ts
// Example: Custom headers are added automatically
const config = {
  headers: {
    'Authorization': 'Bearer <token>',
    'X-Request-ID': '<unique-id>',
    'Content-Type': 'application/json',
  },
};
```

### Response Interceptor

- Handles 401 (token expired) → redirects to login
- Handles 403 (forbidden) → shows permission error
- Handles 500 (server error) → retries once
- Extracts response data automatically
- Formats error responses consistently

### Error Handling

All errors follow this format:

```ts
{
  status: 401 | 403 | 500,
  message: 'Human-readable error message',
  data: {} // Backend error details if available
}
```

Services catch these and propagate to hooks.

---

## Common Patterns

### Pattern 1: List with Search

```ts
export const useProductSearch = (query: string) => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const search = async () => {
      try {
        setLoading(true);
        const data = await ProductService.search(query);
        setResults(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(search, 300); // Debounce
    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading, error };
};
```

### Pattern 2: Bulk Operations

```ts
// In service
static async bulkUpdate(updates: Array<{ id: string; data: Partial<T> }>) {
  if (ApiClient.isUsingMockData()) {
    return; // Mock: no-op
  }
  return await ApiClient.post(API_ENDPOINTS.BULK_UPDATE, { updates });
}

// In component
const { mutate: bulkUpdate } = useMutation(ProductService.bulkUpdate);
```

### Pattern 3: Pagination

```ts
export const useProductsPaginated = (page: number, limit: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await ApiClient.get(API_ENDPOINTS.PRODUCT.GET_ALL, {
          params: { page, limit },
        });
        setProducts(response.data);
        setTotal(response.total);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page, limit]);

  return { products, total, loading };
};
```

---

## Debugging Tips

### Check Which API Mode is Active

```ts
import { ApiClient } from '@/api';

if (ApiClient.isUsingMockData()) {
  console.log('Using mock data');
} else {
  console.log('Using real API');
}
```

### Add Logging to Requests

```ts
// In apiClient.ts, add to interceptors:
instance.interceptors.request.use((config) => {
  console.log('[API] Request:', config.url, config.method);
  return config;
});

instance.interceptors.response.use(
  (response) => {
    console.log('[API] Response:', response);
    return response;
  },
  (error) => {
    console.error('[API] Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);
```

### Test with Real API

```bash
# Terminal 1: Start your backend
npm run start:backend

# Terminal 2: Update env and restart
echo 'NEXT_PUBLIC_USE_MOCK_DATA=false' > .env.local
pnpm dev

# Check Network tab in DevTools to see API calls
```

---

## Performance Optimization (Future)

When ready for production, consider:

- [ ] Add React Query for caching
- [ ] Implement pagination
- [ ] Add request debouncing
- [ ] Cache responses in localStorage
- [ ] Lazy load data
- [ ] Request pooling

Example with React Query (future phase):

```ts
import { useQuery } from '@tanstack/react-query';

export const useProductsWithQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => ProductService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

---

## Summary

✅ **Clean Separation**: Components → Hooks → Services → API Client  
✅ **One Source of Truth**: All endpoints in apiEndpoints.ts  
✅ **Easy Backend Integration**: Change env variable, that's it  
✅ **Automatic Mock Switching**: No component code changes needed  
✅ **Built-in Error Handling**: Consistent error format everywhere  
✅ **Production Ready**: JWT, interceptors, retries, timeouts

