# Quick Start Guide

Welcome to the Enterprise E-Commerce Dashboard! This is a production-ready frontend with enterprise architecture.

---

## 1️⃣ First Time Setup (2 minutes)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open in browser
open http://localhost:3000
```

You should see the dashboard with 8 working pages.

---

## 2️⃣ Understand the Status (5 minutes)

**Read these three files in order:**

1. **PROJECT_WORKSHEET.md** - Current completion status
   - What's done (40% complete)
   - What's next
   - Known issues

2. **API_ARCHITECTURE.md** - How data flows
   - Architecture layers
   - How to add new features
   - Environment toggle (mock vs real API)

3. **DEVELOPER_GUIDE.md** - How to develop
   - Project structure
   - Step-by-step feature workflow
   - Code patterns

---

## 3️⃣ Start Development (Choose Your Task)

### Option A: Add Missing Component States (Recommended - Next Priority)

**Goal:** Add consistent loading, error, and empty states to all pages

1. Create `ErrorBoundary` component
2. Create `EmptyState` component
3. Update all 8 pages to use them
4. Test and build

**Time:** 1-2 hours | **Impact:** Required for production

### Option B: Integrate with Real Backend

**Goal:** Connect to your backend API instead of mock data

1. Update `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. Set `NEXT_PUBLIC_USE_MOCK_DATA=false`
3. Test each page
4. Done! (No component code changes needed)

**Time:** 30 minutes setup + testing | **Impact:** Ready for backend

### Option C: Add New Feature (Advanced)

**Goal:** Add a new page like Shipments or Returns

Follow the 10-phase workflow in DEVELOPER_GUIDE.md

**Time:** 2-3 hours per feature

---

## 4️⃣ Switching Between Mock Data and Real API

### Development (Mock Data - Default)

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK_DATA=true
```

No API calls made. All data comes from Faker.js generators.

### Integration (Real API)

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK_DATA=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Components automatically call your backend. **No code changes needed!**

---

## 5️⃣ Project Structure at a Glance

```
app/                    # Next.js pages (dashboard, orders, products, etc)
src/
├── api/                # API endpoints & client
├── components/         # React components
├── hooks/              # Data fetching hooks
├── services/           # Business logic
├── mock/               # Fake data generators
├── stores/             # Global state (Zustand)
├── types/              # TypeScript interfaces
└── theme/              # Light/dark theme

Documentation:
├── PROJECT_WORKSHEET.md   # Current status
├── API_ARCHITECTURE.md    # How API works
├── DEVELOPER_GUIDE.md     # How to build
└── QUICKSTART.md          # This file
```

---

## 6️⃣ Available Pages

| Page | Status | Route |
|------|--------|-------|
| Dashboard | ✅ Complete | /dashboard |
| Products | ✅ Complete | /products |
| Orders | ✅ Complete | /orders |
| Customers | ✅ Complete | /customers |
| Inventory | ✅ Complete | /inventory |
| Revenue | ✅ Complete | /revenue |
| Analytics | ✅ Complete | /analytics |
| Settings | ✅ Complete | /settings |
| Warehouse | ⚠️ Stub | /warehouse |

---

## 7️⃣ Key Technologies

- **Next.js 16** - React framework with App Router
- **Material UI** - Pre-built components
- **Zustand** - State management
- **Axios** - HTTP client
- **TypeScript** - Type safety
- **Recharts** - Data visualizations
- **Faker.js** - Mock data

---

## 8️⃣ Common Commands

```bash
# Development
pnpm dev               # Start server

# Building
pnpm build             # Production build
pnpm start             # Run production build

# Quality
pnpm lint              # Check code

# Useful info
ls src/api/            # View API architecture
ls src/services/       # View services
ls src/hooks/          # View custom hooks
```

---

## 9️⃣ Important Patterns

### ❌ Never Do This

```tsx
// Don't call API directly
const data = await axios.get('/api/products');

// Don't hardcode endpoints
axios.get('http://localhost:3001/api/v1/products');

// Don't create inconsistent loading UIs
if (loading) return <div>Loading...</div>;
```

### ✅ Do This Instead

```tsx
// Use custom hooks
const { products, loading, error } = useProducts();

// API endpoints in one file
import { API_ENDPOINTS } from '@/api';

// Consistent loading component
import { LoadingState } from '@/components/LoadingState';
```

---

## 🔟 Debugging

### Check API Mode

```ts
import { ApiClient } from '@/api';
console.log('Mock mode?', ApiClient.isUsingMockData());
```

### View Network Requests

Open DevTools → Network tab when `USE_MOCK_DATA=false`

### Check TypeScript

```bash
pnpm run type-check  # See all type errors
```

---

## 1️⃣1️⃣ Next Steps

1. **Read PROJECT_WORKSHEET.md** - Understand what needs to be done next
2. **Choose your task** - Component states or backend integration
3. **Follow DEVELOPER_GUIDE.md** - Step-by-step instructions
4. **Build and test** - `pnpm build` must pass
5. **Update PROJECT_WORKSHEET.md** - Track your progress

---

## 1️⃣2️⃣ Getting Help

**Check these files:**
- **PROJECT_WORKSHEET.md** - Current status & known issues
- **API_ARCHITECTURE.md** - How to add API endpoints
- **DEVELOPER_GUIDE.md** - How to build features

**Look for patterns in existing code:**
- ProductService - How to create a service
- useProducts - How to create a hook
- ProductTable - How to use a hook in a component

---

## 1️⃣3️⃣ Deployment

When ready for production:

```bash
# Build
pnpm build

# Test build locally
pnpm start

# Deploy to Vercel
vercel deploy
```

---

## 1️⃣4️⃣ Architecture at a Glance

**Data Flow:**
```
Component (useProducts)
    ↓
Hook (useProducts fetches data)
    ↓
Service (ProductService)
    ↓
API Client (ApiClient.get)
    ↓
Mock Data OR Real Backend
```

**Mock/Real Toggle:**
```
NEXT_PUBLIC_USE_MOCK_DATA=true   → Uses Faker.js generators
NEXT_PUBLIC_USE_MOCK_DATA=false  → Calls your backend API
                                   (No component code change!)
```

---

## 1️⃣5️⃣ You're Ready!

Start with reading PROJECT_WORKSHEET.md to see what to build next.

Happy coding! 🚀
