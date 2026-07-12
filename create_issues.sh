#!/bin/bash

# GitHub Issues Creation Script for E-Commerce-BO
# This script creates all 25 issues in your repository
# Prerequisites: GitHub CLI installed and authenticated (gh auth login)

set -e

REPO="Mohd-Azim/E-Commerce-BO"

echo "🚀 Starting to create GitHub issues for $REPO..."
echo "=================================================="

# Issue 1: XSS Vulnerability
gh issue create \
  --repo "$REPO" \
  --title "Security: XSS Vulnerability - Unsanitized User Input in MetricCard Component" \
  --body "## Problem
The \`MetricCard\` component renders user-provided values directly without sanitization, creating an XSS vulnerability if the data comes from user input or untrusted sources.

**File:** \`src/components/dashboard/MetricCard.tsx\` (Line 75)

\`\`\`typescript
<Typography variant=\"h4\" sx={{ fontWeight: 700, mb: 1 }}>
  {typeof value === 'number' ? value.toLocaleString() : value}
</Typography>
\`\`\`

If \`value\` is a string containing HTML/JavaScript, it could be executed.

## Impact
- **Severity:** HIGH
- Potential code injection and data theft
- User session hijacking
- Malicious actions on behalf of the user

## Acceptance Criteria
- [ ] All user-provided string values are properly escaped/sanitized
- [ ] Implement DOMPurify or similar for HTML sanitization if rich content is needed
- [ ] Add TypeScript validation to ensure only safe types are passed
- [ ] Unit tests verify XSS prevention for malicious payloads
- [ ] Security audit passes for this component" \
  --label "security,xss,vulnerability,high-priority"

echo "✅ Issue 1 created: XSS Vulnerability"

# Issue 2: JWT Token Security
gh issue create \
  --repo "$REPO" \
  --title "Security: JWT Token Stored in localStorage - XSS Attack Vector" \
  --body "## Problem
Auth tokens are being stored in localStorage (apiClient.ts lines 41-43, 184-186), which is vulnerable to XSS attacks.

**File:** \`src/api/apiClient.ts\`

\`\`\`typescript
const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
// ...
localStorage.setItem('auth_token', token);
\`\`\`

## Attack Vector
Any XSS vulnerability in the application allows attackers to steal tokens via:
\`\`\`javascript
localStorage.getItem('auth_token')
\`\`\`

## Impact
- **Severity:** CRITICAL
- Session hijacking
- Unauthorized access to user accounts
- Data breach

## Recommended Solution
1. Use httpOnly cookies instead of localStorage
2. Implement CSRF protection
3. Add Secure flag and SameSite attributes
4. Consider using auth library (next-auth, auth0)

## Acceptance Criteria
- [ ] JWT tokens moved to httpOnly cookies
- [ ] CSRF token implementation added
- [ ] Secure and SameSite flags configured
- [ ] localStorage auth token removed completely
- [ ] Documentation updated with new auth flow
- [ ] Security audit passes" \
  --label "security,authentication,critical,jwt"

echo "✅ Issue 2 created: JWT Token Security"

# Issue 3: Missing Input Validation
gh issue create \
  --repo "$REPO" \
  --title "Validation: Missing Input Validation Across Services" \
  --body "## Problem
Service layer methods accept parameters without validation.

**File:** \`src/services/productService.ts\` (and similar in other services)

\`\`\`typescript
static async getById(id: string): Promise<Product> {
  // No validation on 'id' parameter
  if (ApiClient.isUsingMockData()) {
    const products = generateProducts(50);
    return products.find((p) => p.id === id)!;
  }
  return await ApiClient.get(API_ENDPOINTS.PRODUCT.GET_ONE(id));
}
\`\`\`

**Problems:**
- Empty strings accepted as IDs
- No UUID format validation
- Negative or invalid numbers for limits
- No type coercion validation

## Acceptance Criteria
- [ ] Implement Zod schema validation for all service methods
- [ ] Validate parameter types and formats
- [ ] Add error handling for invalid inputs
- [ ] Document validation rules
- [ ] Unit tests for validation edge cases
- [ ] Consistent error messages for validation failures" \
  --label "validation,enhancement,code-quality"

echo "✅ Issue 3 created: Missing Input Validation"

# Issue 4: Missing Error Boundaries
gh issue create \
  --repo "$REPO" \
  --title "Error Handling: Missing Error Boundaries for Component Crashes" \
  --body "## Problem
No Error Boundary components implemented. If any component crashes, the entire page renders blank.

## Impact
- White screen of death on component errors
- Poor user experience
- Difficult debugging in production
- No graceful error recovery

## Example Failure Scenario
\`\`\`typescript
// In RecentOrders.tsx line 44
date: new Date(order.createdAt).toLocaleDateString(...)
// If createdAt is invalid → component crashes → entire page white screen
\`\`\`

## Acceptance Criteria
- [ ] Create reusable ErrorBoundary component
- [ ] Implement error boundaries at page level
- [ ] Implement error boundaries at component section level
- [ ] Log errors to monitoring service
- [ ] Display user-friendly error messages
- [ ] Provide recovery options (retry, back button)
- [ ] Add error boundary tests" \
  --label "error-handling,enhancement,reliability"

echo "✅ Issue 4 created: Missing Error Boundaries"

# Issue 5: Inconsistent Loading States
gh issue create \
  --repo "$REPO" \
  --title "UX: Inconsistent Loading States Across Components" \
  --body "## Problem
Loading states are inconsistently implemented.

**File:** \`src/components/dashboard/RecentOrders.tsx\` (lines 61-72)
- Shows Skeleton loaders for RecentOrders
- BUT RevenueChart has NO loading state
- Dashboard page shows generic Skeleton without component-specific loading

**Issues:**
- Some components show loading, others don't
- Users don't know if data is loading or broken
- No standardized loading UI pattern
- Inconsistent user experience

## Acceptance Criteria
- [ ] Create standardized LoadingState component
- [ ] Implement loading state in ALL data-fetching components:
  - RevenueChart
  - MetricCard (when data is loaded async)
  - All table components
  - All chart components
- [ ] Use consistent skeleton/spinner pattern
- [ ] Add loading state tests
- [ ] Document loading pattern in DEVELOPER_GUIDE.md" \
  --label "ux,enhancement,consistency"

echo "✅ Issue 5 created: Inconsistent Loading States"

# Issue 6: Missing Empty States
gh issue create \
  --repo "$REPO" \
  --title "UX: Missing Empty States for Data Tables and Lists" \
  --body "## Problem
No empty state handling when data is empty.

**File:** \`src/components/dashboard/RecentOrders.tsx\`
\`\`\`typescript
{orders.map((order) => (...))}
// If orders.length === 0, shows blank table with just headers
\`\`\`

**Scenarios Missing:**
- No orders exist
- No products exist
- No customers exist
- Search returns no results
- Filter returns no results

## User Impact
- Confusing blank screen
- Users don't know if:
  - System is loading
  - Data actually doesn't exist
  - There's a filter/search applied
  - They need to create something

## Acceptance Criteria
- [ ] Create reusable EmptyState component with:
  - Icon representation
  - Descriptive message
  - Call-to-action button
- [ ] Add empty state to:
  - RecentOrders component
  - ProductTable
  - OrdersTable
  - CustomersTable
  - All other data components
- [ ] Handle filtered/search empty states differently
- [ ] Add EmptyState component tests" \
  --label "ux,enhancement,missing-feature"

echo "✅ Issue 6 created: Missing Empty States"

# Issue 7: Missing Error State UI
gh issue create \
  --repo "$REPO" \
  --title "UX: Missing Error States and Error Messages" \
  --body "## Problem
No error state handling in components.

**File:** \`src/components/dashboard/RecentOrders.tsx\`
\`\`\`typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null); // Defined but never used!

// No UI for error state
\`\`\`

**Missing:**
- No error message display
- No retry button
- User doesn't know what failed
- No guidance on how to recover

## Acceptance Criteria
- [ ] Create ErrorState component with:
  - Error icon
  - Error message
  - Technical details (optional, for debugging)
  - Retry button
- [ ] Implement error UI in all components:
  - RecentOrders
  - RevenueChart
  - ProductTable
  - OrdersTable
  - All data-fetching components
- [ ] Handle different error types:
  - Network errors
  - Authentication errors
  - Server errors (400, 401, 403, 500)
  - Timeout errors
- [ ] Add retry logic for failed requests" \
  --label "ux,error-handling,enhancement"

echo "✅ Issue 7 created: Missing Error State UI"

# Issue 8: Inadequate API Error Handling
gh issue create \
  --repo "$REPO" \
  --title "Enhancement: Inadequate API Error Handling and Response Processing" \
  --body "## Problem
API error responses are not properly handled in multiple places.

**File:** \`src/api/apiClient.ts\` (lines 89-96)
\`\`\`typescript
const errorResponse = {
  status: error.response?.status || 500,
  message: (error.response?.data as any)?.message || error.message || 'An error occurred',
  data: error.response?.data,
};
return Promise.reject(errorResponse);
\`\`\`

**Issues:**
- Generic error message \"An error occurred\"
- No distinction between different error types
- No retry logic for transient errors
- No timeout handling
- No logging for debugging

## Missing Error Scenarios
- Network timeouts
- Connection refused
- CORS errors
- Rate limiting (429)
- Partial failures
- Concurrent request failures

## Acceptance Criteria
- [ ] Implement specific error handling for each HTTP status code
- [ ] Add retry logic with exponential backoff for transient errors
- [ ] Implement timeout handling
- [ ] Add error logging/monitoring
- [ ] Create user-friendly error messages for common scenarios
- [ ] Handle network connectivity issues
- [ ] Add error type definitions
- [ ] Unit tests for error scenarios" \
  --label "error-handling,api,enhancement"

echo "✅ Issue 8 created: Inadequate API Error Handling"

# Issue 9: Accessibility Violations
gh issue create \
  --repo "$REPO" \
  --title "Accessibility: WCAG 2.1 Violations - Missing ARIA Labels and Semantic HTML" \
  --body "## Problem
No ARIA labels, alt text, or semantic HTML in components.

**File:** \`src/components/dashboard/MetricCard.tsx\`
\`\`\`typescript
<Box
  sx={{
    width: 40,
    height: 40,
    borderRadius: 1,
    backgroundColor: \\\`\${colorMap[color]}20\\\`,
  }}
>
  {icon} // No aria-label
</Box>
\`\`\`

**Accessibility Issues:**
- Icons have no alt text or aria-labels
- Color-only indicators (not colorblind accessible)
- No semantic HTML structure
- Tables missing ARIA roles
- No keyboard navigation support
- Missing form labels

## Acceptance Criteria
- [ ] Add aria-label to all icons
- [ ] Add alt text to all images
- [ ] Use semantic HTML (button, nav, main, etc)
- [ ] Add ARIA attributes to custom components
- [ ] Ensure color contrast ratio ≥ 4.5:1 (WCAG AA)
- [ ] Add keyboard navigation support
- [ ] Test with screen readers (NVDA, JAWS)
- [ ] Add accessibility tests

## WCAG Standards
- WCAG 2.1 Level AA minimum
- Images: 1.4.5 (Images of Text)
- Color: 1.4.1 (Color not only means)
- Labels: 1.3.1 (Info and Relationships)" \
  --label "accessibility,wcag,ux-improvement"

echo "✅ Issue 9 created: Accessibility Violations"

# Issue 10: Performance Optimization
gh issue create \
  --repo "$REPO" \
  --title "Performance: Missing React.memo and Lazy Loading for Heavy Components" \
  --body "## Problem
Large components could be optimized with React.memo and lazy loading.

**File:** \`src/components/dashboard/RevenueChart.tsx\`
- No React.memo to prevent unnecessary re-renders
- No lazy loading despite being heavy (Recharts)

**File:** \`app/dashboard/page.tsx\`
- All dashboard components render at once
- No code splitting
- No dynamic imports

## Performance Impact
- Unnecessary re-renders of heavy components
- Large bundle size
- Slow initial page load
- High memory usage

## Metrics to Track
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Bundle size

## Acceptance Criteria
- [ ] Apply React.memo to chart components
- [ ] Apply React.memo to table components
- [ ] Implement dynamic imports for heavy components
- [ ] Use React.lazy for code splitting
- [ ] Measure bundle size before/after
- [ ] Monitor Core Web Vitals
- [ ] Add performance tests" \
  --label "performance,optimization,enhancement"

echo "✅ Issue 10 created: Performance Optimization"

# Issue 11: Missing Request Caching
gh issue create \
  --repo "$REPO" \
  --title "Performance: Missing Request Caching and Deduplication" \
  --body "## Problem
No request deduplication or caching mechanism.

**File:** \`src/components/dashboard/RecentOrders.tsx\` (lines 36-51)
\`\`\`typescript
useEffect(() => {
  const generated = getMockData.getOrders(8);
  // If this component re-renders, getOrders() is called again
  // No memoization of results
}, []);
\`\`\`

**Issues:**
- Multiple identical API calls if component re-renders
- No response caching
- No cache invalidation strategy
- Duplicate network requests
- Wasted bandwidth

## Example Scenario
1. User navigates to orders page
2. Component fetches orders
3. Component re-renders (due to prop change)
4. Same orders fetched again (duplicate request)
5. No cache checking

## Acceptance Criteria
- [ ] Implement request deduplication (prevent concurrent identical requests)
- [ ] Add response caching layer
- [ ] Implement cache invalidation strategy
- [ ] Use TanStack Query for caching (already in dependencies!)
- [ ] Handle stale data scenarios
- [ ] Add cache tests
- [ ] Document caching strategy" \
  --label "performance,caching,enhancement"

echo "✅ Issue 11 created: Missing Request Caching"

# Issue 12: Hardcoded Constants
gh issue create \
  --repo "$REPO" \
  --title "Code Quality: Hardcoded Constants Should Be Centralized" \
  --body "## Problem
Hardcoded constants scattered across files instead of centralized configuration.

**Examples:**
- \`src/components/dashboard/RecentOrders.tsx\` (line 44): hardcoded date format
- \`src/mock/generators.ts\` (line 14): CATEGORIES array
- \`src/components/dashboard/MetricCard.tsx\` (line 24): colorMap object
- \`src/api/apiClient.ts\` (line 18): REQUEST_TIMEOUT = 30000

**Issues:**
- Difficult to maintain (change one constant = find all usages)
- Inconsistent values across codebase
- No single source of truth
- Hard to override in tests

## Acceptance Criteria
- [ ] Create \`src/config/constants.ts\` with all app-wide constants
- [ ] Create \`src/config/colors.ts\` for color definitions
- [ ] Create \`src/config/endpoints.ts\` for API timeouts, retry logic
- [ ] Create \`src/config/formats.ts\` for date/number formats
- [ ] Remove hardcoded values from components
- [ ] Update imports to use centralized config
- [ ] Add JSDoc comments explaining each constant
- [ ] Add unit tests for config values" \
  --label "refactoring,code-quality,maintainability"

echo "✅ Issue 12 created: Hardcoded Constants"

# Issue 13: Incomplete API Implementation
gh issue create \
  --repo "$REPO" \
  --title "Documentation: Incomplete API Endpoint Implementation and Documentation" \
  --body "## Problem
API endpoints defined in \`API_ENDPOINTS\` but not all are documented or have corresponding implementations.

**File:** \`src/api/apiEndpoints.ts\` (200+ lines)
- 60+ endpoints defined
- BUT most have NO corresponding service methods
- Components can't easily use them
- Unclear which endpoints are implemented

**Missing Services for:**
- SUPPLIER (lines 84-91)
- PURCHASE_ORDER (lines 93-100)
- FINANCE (lines 103-111)
- CAMPAIGN (lines 134-142)
- DISCOUNT (lines 144-150)
- USER management
- ROLE management
- SETTINGS
- AUDIT logs

## Impact
- Inconsistent API usage patterns
- Developers unsure which endpoints to use
- No mock data generators for many endpoints
- Wasted effort on endpoints no one uses

## Acceptance Criteria
- [ ] Audit all 60+ endpoints in API_ENDPOINTS
- [ ] Mark endpoints as: \"Implemented\", \"Mock Only\", \"Not Started\"
- [ ] Create service layer for each endpoint group
- [ ] Create mock data generators for each entity
- [ ] Create hooks for each service (useSuppliers, useCampaigns, etc)
- [ ] Update API_ARCHITECTURE.md with endpoint status
- [ ] Remove unused endpoints or document their purpose" \
  --label "documentation,api,refactoring"

echo "✅ Issue 13 created: Incomplete API Implementation"

# Issue 14: Inconsistent Data Fetching
gh issue create \
  --repo "$REPO" \
  --title "Code Quality: Inconsistent Data Fetching Patterns - Missing Custom Hooks" \
  --body "## Problem
Multiple data fetching patterns used inconsistently across components.

**Pattern 1 - Direct Mock Call:**
\`\`\`typescript
// RecentOrders.tsx
const generated = getMockData.getOrders(8);
\`\`\`

**Pattern 2 - No pattern (just state):**
\`\`\`typescript
// Dashboard page
const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
useEffect(() => {
  setMetrics(getMockData.getDashboardMetrics());
}, []);
\`\`\`

**Issues:**
- No custom hooks for data fetching
- Inconsistent loading/error patterns
- No single way to fetch data
- Difficult to maintain
- No TanStack Query usage despite being in dependencies

## Missing Patterns
- useProducts hook
- useOrders hook
- useCustomers hook
- useWarehouses hook
- useAnalytics hook

## Acceptance Criteria
- [ ] Create custom hooks for all data entities
- [ ] Use TanStack Query in all hooks
- [ ] Implement consistent loading states
- [ ] Implement consistent error states
- [ ] Document hook patterns
- [ ] Add hooks to DEVELOPER_GUIDE.md
- [ ] Refactor all components to use hooks
- [ ] Add unit tests for hooks

## Benefits
- Single source of truth for data fetching
- Automatic caching with TanStack Query
- Built-in loading/error states
- Easy to add pagination
- Easy to add filtering/sorting
- Easy to mock/test" \
  --label "refactoring,consistency,enhancement"

echo "✅ Issue 14 created: Inconsistent Data Fetching"

# Issue 15: No Unit Tests
gh issue create \
  --repo "$REPO" \
  --title "Testing: No Unit Tests - Missing Jest and React Testing Library Setup" \
  --body "## Problem
No tests exist for any component, hook, or service.

**Missing Test Coverage:**
- No unit tests for components
- No tests for API client
- No tests for services
- No tests for hooks
- No tests for utilities
- No test setup (Jest, React Testing Library)
- No test configuration

## Current State
\`\`\`bash
\$ npm test
# No test command in package.json
# No tests directory
# No *.test.ts files
\`\`\`

## Acceptance Criteria
- [ ] Add Jest and React Testing Library to devDependencies
- [ ] Configure Jest with TypeScript support
- [ ] Create test setup file
- [ ] Add tests for critical components:
  - MetricCard
  - RecentOrders
  - RevenueChart
- [ ] Add tests for API client error handling
- [ ] Add tests for service layer validation
- [ ] Add tests for hooks
- [ ] Add tests for utility functions
- [ ] Achieve minimum 80% code coverage
- [ ] Add test command to package.json
- [ ] Add GitHub Actions for CI tests
- [ ] Document testing approach in DEVELOPER_GUIDE.md

## Testing Priorities
1. Critical: API client, services, validation
2. High: Dashboard components
3. Medium: Other components
4. Low: Utilities, helpers" \
  --label "testing,quality-assurance,ci-cd"

echo "✅ Issue 15 created: No Unit Tests"

# Issue 16: Unclear Folder Structure
gh issue create \
  --repo "$REPO" \
  --title "Architecture: Unclear Folder Structure - Missing Organization Guidelines" \
  --body "## Problem
Folder structure is unclear and inconsistent.

**Current Structure:**
- src/components/  (Has dashboard/, layout/, orders/, products/)
- src/stores/      (Global state)
- src/types/       (All types in one file?)
- src/mock/        (Only generators.ts?)
- src/services/    (Only productService, mockService?)
- src/theme/       (Theme files?)

**Issues:**
- No clear separation of concerns
- Feature folders mixed with cross-cutting concerns
- No clear where to add new features
- No utilities folder
- No constants folder
- No UI components folder
- No hooks folder

## Recommended Structure
\`\`\`
src/
├── app/
├── components/
│   ├── ui/
│   ├── common/
│   ├── dashboard/
│   ├── products/
│   ├── orders/
│   ├── customers/
│   ├── warehouse/
│   └── revenue/
├── pages/
├── hooks/
├── services/
├── stores/
├── types/
├── utils/
├── config/
├── theme/
├── styles/
├── mock/
└── lib/
\`\`\`

## Acceptance Criteria
- [ ] Create missing directories (hooks/, utils/, config/)
- [ ] Move components to feature-based folders
- [ ] Separate UI components into ui/ folder
- [ ] Add index.ts barrel files for cleaner imports
- [ ] Update all imports to new structure
- [ ] Document folder structure in DEVELOPER_GUIDE.md
- [ ] Add examples of where to add new features" \
  --label "refactoring,architecture,documentation"

echo "✅ Issue 16 created: Unclear Folder Structure"

# Issue 17: Missing Logging and Monitoring
gh issue create \
  --repo "$REPO" \
  --title "DevOps: Missing Logging and Error Monitoring for Production" \
  --body "## Problem
No logging or monitoring setup for production issues.

**Current State:**
- No console logging in critical paths
- No error logging service
- No analytics
- No performance monitoring
- No crash reporting

## Missing Capabilities
1. **Error Tracking**
   - When API calls fail, no logging
   - Component errors not tracked
   - No crash reports

2. **Performance Monitoring**
   - No Core Web Vitals tracking
   - No API response time monitoring
   - No memory leak detection

3. **User Analytics**
   - No user actions tracked
   - No feature usage metrics
   - No funnel analysis

4. **Debugging**
   - Difficult to debug production issues
   - No request/response logs
   - No error stack traces

## Acceptance Criteria
- [ ] Integrate Sentry for error tracking (or similar)
- [ ] Add Vercel Analytics (already in package.json!)
- [ ] Implement logging service
- [ ] Add structured logging (Winston or Pino)
- [ ] Track Core Web Vitals
- [ ] Set up error boundaries with logging
- [ ] Add API request/response logging
- [ ] Document monitoring setup
- [ ] Create alerts for critical errors" \
  --label "monitoring,logging,production,devops"

echo "✅ Issue 17 created: Missing Logging and Monitoring"

# Issue 18: Environment Variables Not Validated
gh issue create \
  --repo "$REPO" \
  --title "DevOps: Environment Variables Not Validated or Documented" \
  --body "## Problem
Environment variables are not properly validated or documented.

**File:** \`src/api/apiClient.ts\` (line 16-17)
\`\`\`typescript
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
\`\`\`

**Issues:**
- No validation that env vars are set
- No defaults or fallback handling
- String comparison is fragile ('true' vs true)
- No type safety for env vars
- No documentation of required env vars
- Missing .env.example file

## Missing Env Vars
- NEXT_PUBLIC_USE_MOCK_DATA (used, not validated)
- NEXT_PUBLIC_API_BASE_URL (used, no fallback)
- NEXT_PUBLIC_API_TIMEOUT (not used!)
- NEXT_PUBLIC_LOG_LEVEL (not used!)
- AUTH_SECRET (for session/JWT)

## Acceptance Criteria
- [ ] Create .env.example with all required env vars
- [ ] Create environment configuration with validation (using zod)
- [ ] Add type-safe env var access (e.g., getEnv('API_BASE_URL'))
- [ ] Validate env vars on app startup
- [ ] Document all env vars in README
- [ ] Add fallback values for optional env vars
- [ ] Handle missing required env vars gracefully
- [ ] Add env var validation tests
- [ ] Update DEVELOPER_GUIDE.md with env setup" \
  --label "configuration,devops,enhancement"

echo "✅ Issue 18 created: Environment Variables Not Validated"

# Issue 19: Missing Rate Limiting
gh issue create \
  --repo "$REPO" \
  --title "Security: Missing Rate Limiting and Throttling - DoS Prevention" \
  --body "## Problem
No rate limiting or DoS protection.

**Issues:**
- API calls can be made unlimited times
- No throttling on user actions
- No request rate limiting
- No bot protection
- No CAPTCHA verification

## Attack Vectors
1. **API Abuse**
   - Attacker makes 1000s of API requests
   - Exhausts server resources
   - Causes denial of service

2. **Button Spamming**
   - User clicks submit button 100 times
   - Multiple duplicate requests sent
   - Duplicate orders created

3. **Form Attacks**
   - Attacker submits form 1000s of times
   - Causes database load
   - Creates spam data

## Acceptance Criteria
- [ ] Implement client-side request throttling
- [ ] Add debouncing to form submissions
- [ ] Add debouncing to search inputs
- [ ] Disable buttons during submission
- [ ] Implement rate limiting headers from API
- [ ] Handle 429 (Too Many Requests) errors
- [ ] Add CAPTCHA for sensitive operations (optional)
- [ ] Document rate limiting strategy
- [ ] Add throttling/debouncing utilities
- [ ] Add tests for throttling" \
  --label "security,performance,enhancement"

echo "✅ Issue 19 created: Missing Rate Limiting"

# Issue 20: Missing Form Validation
gh issue create \
  --repo "$REPO" \
  --title "Enhancement: Missing Form Validation and Error Handling" \
  --body "## Problem
No form validation or error handling implemented.

**Issues:**
- No client-side form validation
- No form error messages
- Users can submit invalid data
- No field-level error display
- No real-time validation feedback
- No accessibility for errors

## Missing Validations
- Email format validation
- Required field validation
- Min/max length validation
- Number range validation
- Date format validation
- Phone number validation
- URL validation

## Acceptance Criteria
- [ ] Implement form validation library (React Hook Form recommended)
- [ ] Add Zod schemas for form validation
- [ ] Display field-level error messages
- [ ] Highlight invalid fields
- [ ] Implement real-time validation feedback
- [ ] Add accessible error labels
- [ ] Handle form submission errors
- [ ] Add success messages after submission
- [ ] Add form reset functionality
- [ ] Add form validation tests
- [ ] Document form patterns in DEVELOPER_GUIDE.md" \
  --label "validation,ux,enhancement"

echo "✅ Issue 20 created: Missing Form Validation"

# Issue 21: Missing Responsive Design
gh issue create \
  --repo "$REPO" \
  --title "UX: Missing Responsive Design and Mobile Optimization" \
  --body "## Problem
Components are not fully responsive for mobile devices.

**Issues:**
- Tables may not be readable on mobile
- No mobile-first breakpoint handling
- Components may overflow on small screens
- No touch-friendly interactions
- Navigation may not work on mobile
- Forms not optimized for mobile

## Acceptance Criteria
- [ ] Implement Mobile First design approach
- [ ] Test on common breakpoints (320px, 768px, 1024px, 1440px)
- [ ] Make tables mobile-friendly (stack or scroll)
- [ ] Optimize touch targets (minimum 44x44px)
- [ ] Test on real mobile devices
- [ ] Implement responsive images
- [ ] Test navigation on mobile
- [ ] Optimize forms for mobile input
- [ ] Add responsive design tests

## Mobile Breakpoints
- xs: 0px to 599px
- sm: 600px to 899px
- md: 900px to 1199px
- lg: 1200px to 1535px
- xl: 1536px and up" \
  --label "ux,responsive-design,enhancement"

echo "✅ Issue 21 created: Missing Responsive Design"

# Issue 22: Missing Documentation
gh issue create \
  --repo "$REPO" \
  --title "Documentation: Missing Developer Guide and API Documentation" \
  --body "## Problem
No comprehensive documentation for developers.

**Missing Documentation:**
- No DEVELOPER_GUIDE.md
- No API documentation
- No architecture overview
- No setup instructions
- No deployment guide
- No testing guide
- No contribution guidelines

## Acceptance Criteria
- [ ] Create DEVELOPER_GUIDE.md with:
  - Project overview
  - Setup instructions
  - Folder structure explanation
  - Architecture overview
  - Data fetching patterns
  - Component patterns
  - Styling guidelines
  - Testing guide
  - Deployment guide
- [ ] Create API_DOCUMENTATION.md
- [ ] Create ARCHITECTURE.md
- [ ] Create SETUP.md for initial setup
- [ ] Add JSDoc comments to all public functions
- [ ] Add inline comments for complex logic
- [ ] Update README.md with links to all docs

## Documentation Topics
1. Project structure
2. Development environment setup
3. Running the application
4. Code style and conventions
5. Component patterns and best practices
6. Data fetching and state management
7. Testing strategies
8. Deployment process
9. Troubleshooting common issues
10. Contributing guidelines" \
  --label "documentation,enhancement"

echo "✅ Issue 22 created: Missing Documentation"

# Issue 23: Missing CSRF Protection
gh issue create \
  --repo "$REPO" \
  --title "Security: Missing CSRF Protection on Forms and API Calls" \
  --body "## Problem
No CSRF (Cross-Site Request Forgery) protection implemented.

**Issues:**
- No CSRF tokens on forms
- No token validation on API calls
- Forms vulnerable to CSRF attacks
- State-changing operations not protected

## Attack Scenario
1. User logs into admin panel
2. User visits malicious website in another tab
3. Malicious site sends request to admin panel
4. Since user is already logged in, request succeeds
5. Data could be modified/deleted without user consent

## Acceptance Criteria
- [ ] Implement CSRF token generation
- [ ] Add CSRF tokens to all forms
- [ ] Validate CSRF tokens on API calls
- [ ] Use double-submit cookie pattern or similar
- [ ] Add CSRF protection middleware
- [ ] Document CSRF protection strategy
- [ ] Add CSRF protection tests
- [ ] Configure SameSite cookie attribute

## Implementation Options
1. Double-Submit Cookie Pattern
2. Synchronizer Token Pattern (CSRF tokens in forms)
3. Custom Header Pattern (X-CSRF-Token)" \
  --label "security,csrf,enhancement"

echo "✅ Issue 23 created: Missing CSRF Protection"

# Issue 24: Missing Pagination
gh issue create \
  --repo "$REPO" \
  --title "Feature: Missing Pagination Implementation" \
  --body "## Problem
No pagination implemented for data tables and lists.

**Issues:**
- All data loaded at once (could be thousands of items)
- No page navigation
- Performance issues with large datasets
- Difficult to scroll through large lists

## Impact
- Slow page load with lots of data
- High memory usage
- Poor user experience
- Network inefficiency

## Acceptance Criteria
- [ ] Implement pagination component
- [ ] Support limit/offset pagination
- [ ] Add page navigation (prev/next, page numbers)
- [ ] Show total count and current page info
- [ ] Allow user to change items per page
- [ ] Persist pagination state in URL
- [ ] Implement cursor-based pagination for APIs
- [ ] Add pagination to:
  - RecentOrders
  - ProductTable
  - OrdersTable
  - CustomersTable
  - All data tables
- [ ] Add pagination tests

## Pagination Best Practices
- Default: 25 items per page
- Options: 10, 25, 50, 100 items per page
- Show total count
- Show current range (e.g., \"1-25 of 500\")
- Disable prev/next when at start/end" \
  --label "feature,enhancement,ux"

echo "✅ Issue 24 created: Missing Pagination"

# Issue 25: Missing Search and Filtering
gh issue create \
  --repo "$REPO" \
  --title "Feature: Missing Search and Filtering Capabilities" \
  --body "## Problem
No search or filtering functionality for tables and lists.

**Issues:**
- Users can't find specific items
- No way to filter by status, date, etc.
- No search functionality
- Difficult to work with large datasets

## Missing Features
- Search bar for quick lookup
- Filter by status
- Filter by date range
- Filter by category
- Filter by warehouse
- Sort by different columns
- Combine multiple filters
- Save filter presets

## Acceptance Criteria
- [ ] Create search/filter component
- [ ] Implement search for:
  - Products (by name, SKU)
  - Orders (by order number, customer)
  - Customers (by name, email)
- [ ] Implement filters for:
  - Status filters
  - Date range filters
  - Category filters
- [ ] Add sorting on table columns
- [ ] Support multiple active filters
- [ ] Show active filters
- [ ] Add clear filters button
- [ ] Persist search/filter in URL
- [ ] Debounce search input
- [ ] Add filter tests
- [ ] Document filter patterns

## Implementation
- Use TanStack Query for server-side filtering
- Add filter validation
- Handle edge cases (empty results)
- Show number of results" \
  --label "feature,enhancement,ux"

echo "✅ Issue 25 created: Missing Search and Filtering"

echo ""
echo "=================================================="
echo "✅ SUCCESS! All 25 issues have been created!"
echo "=================================================="
echo ""
echo "Visit your repository to see them:"
echo "https://github.com/Mohd-Azim/E-Commerce-BO/issues"
echo ""
