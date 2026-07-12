# Developer Guide - Enterprise E-Commerce Dashboard

## Getting Started

### Prerequisites

- Node.js 18+ (v19+ recommended)
- pnpm 8+ (recommended over npm/yarn)
- Git

### Initial Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
open http://localhost:3000
```

### Build & Test

```bash
# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

---

## Project Structure Overview

### Root Level

```
project/
├── .env.local              # Environment variables
├── .next/                  # Build output (auto-generated)
├── node_modules/           # Dependencies
├── public/                 # Static assets
├── app/                    # Next.js App Router pages
├── src/                    # Source code
├── package.json
├── tsconfig.json
├── PROJECT_WORKSHEET.md    # Project status & progress
├── API_ARCHITECTURE.md     # API architecture guide
└── DEVELOPER_GUIDE.md      # This file
```

### Source Code Structure

```
src/
├── api/
│   ├── apiClient.ts         # HTTP client with interceptors
│   ├── apiEndpoints.ts      # All API routes (single source of truth)
│   └── index.ts             # Exports
│
├── components/              # React components
│   ├── dashboard/           # Dashboard-specific components
│   ├── layout/              # Layout components (Sidebar, TopBar, etc)
│   ├── orders/              # Order-specific components
│   ├── products/            # Product-specific components
│   └── ui/                  # Reusable UI components (from shadcn)
│
├── hooks/                   # Custom React hooks
│   └── useProducts.ts       # Example: data fetching hooks
│
├── services/                # Business logic & API calls
│   ├── productService.ts    # Example: service layer
│   └── mockService.ts       # Mock data service
│
├── stores/                  # Zustand state management
│   ├── appStore.ts          # Global app state (theme, user, etc)
│   └── mockDataStore.ts     # Mock data cache
│
├── mock/                    # Mock data generators
│   └── generators.ts        # Faker.js-based mock data
│
├── theme/                   # Theme configuration
│   └── theme.ts             # Material UI theme (light/dark)
│
├── types/                   # TypeScript type definitions
│   └── index.ts             # All interfaces and types
│
└── utils/                   # Utility functions
```

### Pages Structure

```
app/
├── layout.tsx               # Root layout with theme provider
├── page.tsx                 # Home page (redirects to /dashboard)
├── dashboard/
│   ├── layout.tsx           # Dashboard layout (with sidebar)
│   └── page.tsx             # Dashboard page (metrics & charts)
├── products/
│   ├── layout.tsx
│   └── page.tsx             # Products table
├── orders/
│   ├── layout.tsx
│   └── page.tsx             # Orders table
├── customers/
│   ├── layout.tsx
│   └── page.tsx             # Customers table
├── inventory/
│   ├── layout.tsx
│   └── page.tsx             # Warehouse inventory
├── revenue/
│   ├── layout.tsx
│   └── page.tsx             # Revenue analytics
├── analytics/
│   ├── layout.tsx
│   └── page.tsx             # Business analytics
├── settings/
│   ├── layout.tsx
│   └── page.tsx             # System settings
└── warehouse/
    ├── layout.tsx
    └── page.tsx             # Warehouse dashboard
```

---

## Development Workflow

### Before Starting

1. Read `PROJECT_WORKSHEET.md` - understand current status
2. Read `API_ARCHITECTURE.md` - understand data flow
3. Check the "Next Task" section in PROJECT_WORKSHEET.md

### When Adding a Feature

#### Phase 1: Component Structure

```bash
# Create feature directory
mkdir -p src/components/features/shipments

# Create component files
touch src/components/features/shipments/ShipmentTable.tsx
touch src/components/features/shipments/ShipmentForm.tsx
touch src/components/features/shipments/ShipmentDetails.tsx
```

#### Phase 2: Types & Interfaces

Update `src/types/index.ts`:

```ts
// Add Shipment interface
export interface Shipment {
  id: string;
  orderId: string;
  status: 'pending' | 'shipped' | 'delivered' | 'failed';
  trackingNumber: string;
  // ... more fields
}
```

#### Phase 3: API Endpoints

Update `src/api/apiEndpoints.ts`:

```ts
SHIPMENT: {
  GET_ALL: `${API_VERSION}/shipments`,
  GET_ONE: (id: string) => `${API_VERSION}/shipments/${id}`,
  CREATE: `${API_VERSION}/shipments`,
  UPDATE: (id: string) => `${API_VERSION}/shipments/${id}`,
}
```

#### Phase 4: Mock Data

Update `src/mock/generators.ts`:

```ts
export const generateShipments = (count: number = 10): Shipment[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `ship_${i + 1}`,
    orderId: faker.string.uuid(),
    status: faker.helpers.arrayElement(['pending', 'shipped', 'delivered']),
    trackingNumber: faker.string.alphaNumeric(15),
    // ... more fields
  }));
};
```

#### Phase 5: Service Layer

Create `src/services/shipmentService.ts`:

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
  // ... more methods
}
```

#### Phase 6: Custom Hook

Create `src/hooks/useShipments.ts`:

```ts
import { useState, useEffect } from 'react';
import { Shipment } from '@/types';
import ShipmentService from '@/services/shipmentService';

export const useShipments = (limit: number = 25) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await ShipmentService.getAll(limit);
        setShipments(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [limit]);

  return { shipments, loading, error };
};
```

#### Phase 7: Component Implementation

Create `src/components/features/shipments/ShipmentTable.tsx`:

```tsx
import { useShipments } from '@/hooks/useShipments';

export const ShipmentTable: React.FC = () => {
  const { shipments, loading, error } = useShipments();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (shipments.length === 0) return <EmptyState />;

  return (
    <Table>
      {/* render shipments */}
    </Table>
  );
};
```

#### Phase 8: Page

Create `app/shipments/page.tsx`:

```tsx
'use client';

import { ShipmentTable } from '@/components/features/shipments/ShipmentTable';

export default function ShipmentsPage() {
  return (
    <Box>
      <Typography variant="h3">Shipments</Typography>
      <ShipmentTable />
    </Box>
  );
}
```

#### Phase 9: Routing

Update `src/components/layout/Sidebar.tsx` to add shipments link.

#### Phase 10: Testing

- ✅ Component compiles without errors
- ✅ TypeScript has zero errors
- ✅ ESLint passes
- ✅ Production build passes (`pnpm build`)
- ✅ Route works (`http://localhost:3000/shipments`)
- ✅ UI matches design
- ✅ Theme support works (light/dark mode)
- ✅ Mock data works
- ✅ Component is reusable
- ✅ No console errors
- ✅ Loading state exists
- ✅ Empty state exists
- ✅ Error state exists

### After Completing Feature

1. Update `PROJECT_WORKSHEET.md`
2. Commit code with descriptive message
3. Move to next task in worksheet

---

## Important Patterns & Rules

### ❌ DON'T Do This

```tsx
// ❌ Never call API directly from components
const ProductsPage = () => {
  useEffect(() => {
    axios.get('/api/products').then(/* ... */); // WRONG!
  }, []);
};

// ❌ Never scatter API endpoints across files
axios.get('http://localhost:3001/api/v1/products'); // WRONG!

// ❌ Never hardcode data in components
const products = [
  { id: 1, name: 'Product 1' }, // WRONG!
];

// ❌ Never use different loading patterns
if (isLoading) return <div>Loading...</div>; // Inconsistent
```

### ✅ DO This Instead

```tsx
// ✅ Use custom hooks for data fetching
const { products, loading, error } = useProducts();

// ✅ API endpoints in one file
import { API_ENDPOINTS } from '@/api';

// ✅ Mock data generated consistently
import { generateProducts } from '@/mock/generators';

// ✅ Use consistent loading component
import { LoadingState } from '@/components/common/LoadingState';
```

---

## Debugging

### Check Environment Mode

```ts
import { ApiClient } from '@/api';

// Are we using mock data?
if (ApiClient.isUsingMockData()) {
  console.log('Using mock data');
} else {
  console.log('Using real API');
}
```

### Debug API Calls

```bash
# 1. Open DevTools → Network tab
# 2. Look for API requests (when USE_MOCK_DATA=false)
# 3. Check request/response payloads

# Or add logging to apiClient.ts:
instance.interceptors.request.use((config) => {
  console.log('[API]', config.method?.toUpperCase(), config.url);
  return config;
});
```

### Check Component State

```tsx
// Add temporary debug logging
useEffect(() => {
  console.log('[DEBUG] Products loaded:', products.length, error);
}, [products, error]);
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 16 | App Router, server/client components |
| **UI Framework** | Material UI v9 | Pre-built components |
| **State Management** | Zustand | Global state (theme, user, etc) |
| **HTTP Client** | Axios | API requests with interceptors |
| **Data Visualization** | Recharts | Charts and graphs |
| **Forms** | React Hook Form | Form handling |
| **Validation** | Zod | Schema validation |
| **Styling** | Tailwind CSS + MUI | Component styling |
| **Icons** | Lucide React | Icon library |
| **Animations** | Framer Motion | Smooth animations |
| **Data Fetching** | TanStack Query | Query caching (future) |
| **Mock Data** | Faker.js | Realistic fake data |
| **Language** | TypeScript | Type safety |

---

## Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production build
pnpm lint             # Check code quality

# Useful shortcuts
pnpm type-check       # Check TypeScript errors
pnpm format           # Format code (if configured)
pnpm clean            # Clean build artifacts
```

---

## Environment Variables

See `.env.local` file:

```env
# 'true' = mock data, 'false' = real API
NEXT_PUBLIC_USE_MOCK_DATA=true

# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Feature flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### Switching Between Modes

```bash
# Development (mock data)
echo 'NEXT_PUBLIC_USE_MOCK_DATA=true' > .env.local
pnpm dev

# Integration (real API)
echo 'NEXT_PUBLIC_USE_MOCK_DATA=false' > .env.local
echo 'NEXT_PUBLIC_API_BASE_URL=http://localhost:3001' >> .env.local
pnpm dev
```

---

## Performance Tips

1. **Use React Query** (TanStack Query) for caching
2. **Lazy load components** with `React.lazy()`
3. **Optimize images** - use next/image
4. **Minimize re-renders** - use useCallback, useMemo
5. **Code split** - use dynamic imports
6. **Monitor bundle size** - use Webpack analyzer

---

## Code Style Guidelines

### Naming Conventions

```ts
// Components: PascalCase
export const ProductTable: React.FC = () => {};

// Hooks: camelCase with 'use' prefix
export const useProducts = () => {};

// Services: PascalCase (class-like)
export class ProductService {}

// Constants: UPPER_SNAKE_CASE
export const API_TIMEOUT = 30000;

// Files: Match export name
// ProductTable.tsx exports ProductTable
// useProducts.ts exports useProducts
```

### Component Structure

```tsx
'use client'; // Client component marker if needed

import React from 'react';
import { Box, Typography } from '@mui/material';

// Types
interface ProductTableProps {
  data: Product[];
  onDelete: (id: string) => void;
}

// Component
export const ProductTable: React.FC<ProductTableProps> = ({
  data,
  onDelete,
}) => {
  // Hooks
  const [selected, setSelected] = React.useState<string[]>([]);

  // Handlers
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  // Render
  return (
    <Box>
      {/* JSX */}
    </Box>
  );
};

// Default export
export default ProductTable;
```

---

## Testing Checklist

Before pushing code:

- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds
- [ ] Component renders without console errors
- [ ] Loading state works
- [ ] Error state works
- [ ] Empty state works
- [ ] Responsive layout works
- [ ] Theme toggle works
- [ ] Mock data displays correctly
- [ ] No TypeScript errors

---

## Getting Help

1. **Check PROJECT_WORKSHEET.md** - Current status and known issues
2. **Check API_ARCHITECTURE.md** - API patterns and structure
3. **Read existing code** - Follow established patterns
4. **Console errors** - Browser DevTools will show issues
5. **Network tab** - See API requests and responses

---

## Next Steps

Refer to `PROJECT_WORKSHEET.md` for the current priority:

**Current:** Phase 9 - Core Back Office Pages
**Next:** Add Component States (Loading, Error, Empty)
**Blocked Until:** Component states implemented

---

## Contact & Support

This is a frontend-only project. For backend integration:

1. Update `API_ENDPOINTS` if routes differ
2. Update `.env.local` with backend URL
3. Set `NEXT_PUBLIC_USE_MOCK_DATA=false`
4. Test each page independently

For questions, refer to the documentation files in the project root.

