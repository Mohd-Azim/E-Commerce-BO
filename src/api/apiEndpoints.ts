/**
 * Centralized API Endpoints Configuration
 * 
 * This file acts as a single source of truth for all API endpoints.
 * Backend developers only need to modify this file when routes change.
 * 
 * Usage:
 * - Modify ONLY this file when API routes change
 * - Do NOT scatter API URLs across components
 * - All components use this centralized configuration
 */

const API_VERSION = '/api/v1';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    REFRESH: `${API_VERSION}/auth/refresh`,
    REGISTER: `${API_VERSION}/auth/register`,
    FORGOT_PASSWORD: `${API_VERSION}/auth/forgot-password`,
    RESET_PASSWORD: `${API_VERSION}/auth/reset-password`,
    VERIFY_EMAIL: `${API_VERSION}/auth/verify-email`,
    MFA_SETUP: `${API_VERSION}/auth/mfa/setup`,
    MFA_VERIFY: `${API_VERSION}/auth/mfa/verify`,
  },

  // Products
  PRODUCT: {
    GET_ALL: `${API_VERSION}/products`,
    GET_ONE: (id: string) => `${API_VERSION}/products/${id}`,
    CREATE: `${API_VERSION}/products`,
    UPDATE: (id: string) => `${API_VERSION}/products/${id}`,
    DELETE: (id: string) => `${API_VERSION}/products/${id}`,
    BULK_UPDATE: `${API_VERSION}/products/bulk/update`,
    BULK_DELETE: `${API_VERSION}/products/bulk/delete`,
    SEARCH: `${API_VERSION}/products/search`,
    VARIANTS: (id: string) => `${API_VERSION}/products/${id}/variants`,
  },

  // Orders
  ORDER: {
    GET_ALL: `${API_VERSION}/orders`,
    GET_ONE: (id: string) => `${API_VERSION}/orders/${id}`,
    CREATE: `${API_VERSION}/orders`,
    UPDATE: (id: string) => `${API_VERSION}/orders/${id}`,
    CANCEL: (id: string) => `${API_VERSION}/orders/${id}/cancel`,
    RETURN: (id: string) => `${API_VERSION}/orders/${id}/return`,
    EXPORT: `${API_VERSION}/orders/export`,
    BULK_UPDATE: `${API_VERSION}/orders/bulk/update`,
  },

  // Customers
  CUSTOMER: {
    GET_ALL: `${API_VERSION}/customers`,
    GET_ONE: (id: string) => `${API_VERSION}/customers/${id}`,
    CREATE: `${API_VERSION}/customers`,
    UPDATE: (id: string) => `${API_VERSION}/customers/${id}`,
    DELETE: (id: string) => `${API_VERSION}/customers/${id}`,
    SEGMENTS: `${API_VERSION}/customers/segments`,
    LOYALTY: (id: string) => `${API_VERSION}/customers/${id}/loyalty`,
  },

  // Inventory & Warehouse
  INVENTORY: {
    GET_ALL: `${API_VERSION}/inventory`,
    GET_BY_WAREHOUSE: (warehouseId: string) => `${API_VERSION}/inventory/warehouse/${warehouseId}`,
    UPDATE_LEVEL: (id: string) => `${API_VERSION}/inventory/${id}`,
    TRANSFER: `${API_VERSION}/inventory/transfer`,
    LOW_STOCK: `${API_VERSION}/inventory/low-stock`,
  },

  WAREHOUSE: {
    GET_ALL: `${API_VERSION}/warehouses`,
    GET_ONE: (id: string) => `${API_VERSION}/warehouses/${id}`,
    CREATE: `${API_VERSION}/warehouses`,
    UPDATE: (id: string) => `${API_VERSION}/warehouses/${id}`,
    DELETE: (id: string) => `${API_VERSION}/warehouses/${id}`,
    CAPACITY: (id: string) => `${API_VERSION}/warehouses/${id}/capacity`,
  },

  // Procurement & Suppliers
  SUPPLIER: {
    GET_ALL: `${API_VERSION}/suppliers`,
    GET_ONE: (id: string) => `${API_VERSION}/suppliers/${id}`,
    CREATE: `${API_VERSION}/suppliers`,
    UPDATE: (id: string) => `${API_VERSION}/suppliers/${id}`,
    DELETE: (id: string) => `${API_VERSION}/suppliers/${id}`,
    PERFORMANCE: (id: string) => `${API_VERSION}/suppliers/${id}/performance`,
  },

  PURCHASE_ORDER: {
    GET_ALL: `${API_VERSION}/purchase-orders`,
    GET_ONE: (id: string) => `${API_VERSION}/purchase-orders/${id}`,
    CREATE: `${API_VERSION}/purchase-orders`,
    UPDATE: (id: string) => `${API_VERSION}/purchase-orders/${id}`,
    CANCEL: (id: string) => `${API_VERSION}/purchase-orders/${id}/cancel`,
    RECEIVE: (id: string) => `${API_VERSION}/purchase-orders/${id}/receive`,
  },

  // Finance & Accounting
  FINANCE: {
    REVENUE: `${API_VERSION}/finance/revenue`,
    EXPENSES: `${API_VERSION}/finance/expenses`,
    INVOICES: `${API_VERSION}/finance/invoices`,
    PAYMENTS: `${API_VERSION}/finance/payments`,
    PROFIT_LOSS: `${API_VERSION}/finance/profit-loss`,
    TAX_REPORT: `${API_VERSION}/finance/tax`,
    RECONCILIATION: `${API_VERSION}/finance/reconciliation`,
  },

  // Analytics & Reports
  ANALYTICS: {
    DASHBOARD: `${API_VERSION}/analytics/dashboard`,
    REVENUE: `${API_VERSION}/analytics/revenue`,
    SALES: `${API_VERSION}/analytics/sales`,
    CUSTOMERS: `${API_VERSION}/analytics/customers`,
    PRODUCTS: `${API_VERSION}/analytics/products`,
    ORDERS: `${API_VERSION}/analytics/orders`,
    CONVERSION: `${API_VERSION}/analytics/conversion`,
  },

  REPORT: {
    SALES: `${API_VERSION}/reports/sales`,
    INVENTORY: `${API_VERSION}/reports/inventory`,
    CUSTOMER: `${API_VERSION}/reports/customer`,
    FINANCIAL: `${API_VERSION}/reports/financial`,
    CUSTOM: `${API_VERSION}/reports/custom`,
    SCHEDULE: `${API_VERSION}/reports/schedule`,
  },

  // Marketing
  CAMPAIGN: {
    GET_ALL: `${API_VERSION}/campaigns`,
    GET_ONE: (id: string) => `${API_VERSION}/campaigns/${id}`,
    CREATE: `${API_VERSION}/campaigns`,
    UPDATE: (id: string) => `${API_VERSION}/campaigns/${id}`,
    DELETE: (id: string) => `${API_VERSION}/campaigns/${id}`,
    LAUNCH: (id: string) => `${API_VERSION}/campaigns/${id}/launch`,
    ANALYTICS: (id: string) => `${API_VERSION}/campaigns/${id}/analytics`,
  },

  DISCOUNT: {
    GET_ALL: `${API_VERSION}/discounts`,
    CREATE: `${API_VERSION}/discounts`,
    UPDATE: (id: string) => `${API_VERSION}/discounts/${id}`,
    DELETE: (id: string) => `${API_VERSION}/discounts/${id}`,
    PROMO_CODES: `${API_VERSION}/promo-codes`,
  },

  // Notifications
  NOTIFICATION: {
    GET_ALL: `${API_VERSION}/notifications`,
    MARK_READ: (id: string) => `${API_VERSION}/notifications/${id}/read`,
    MARK_ALL_READ: `${API_VERSION}/notifications/read-all`,
    DELETE: (id: string) => `${API_VERSION}/notifications/${id}`,
    SETTINGS: `${API_VERSION}/notifications/settings`,
  },

  // Admin & Settings
  USER: {
    GET_ALL: `${API_VERSION}/users`,
    GET_ONE: (id: string) => `${API_VERSION}/users/${id}`,
    CREATE: `${API_VERSION}/users`,
    UPDATE: (id: string) => `${API_VERSION}/users/${id}`,
    DELETE: (id: string) => `${API_VERSION}/users/${id}`,
    CHANGE_ROLE: (id: string) => `${API_VERSION}/users/${id}/role`,
    RESET_PASSWORD: (id: string) => `${API_VERSION}/users/${id}/reset-password`,
  },

  ROLE: {
    GET_ALL: `${API_VERSION}/roles`,
    GET_ONE: (id: string) => `${API_VERSION}/roles/${id}`,
    CREATE: `${API_VERSION}/roles`,
    UPDATE: (id: string) => `${API_VERSION}/roles/${id}`,
    DELETE: (id: string) => `${API_VERSION}/roles/${id}`,
    PERMISSIONS: (id: string) => `${API_VERSION}/roles/${id}/permissions`,
  },

  PERMISSION: {
    GET_ALL: `${API_VERSION}/permissions`,
    MATRIX: `${API_VERSION}/permissions/matrix`,
  },

  SETTINGS: {
    GET: `${API_VERSION}/settings`,
    UPDATE: `${API_VERSION}/settings`,
    GET_ONE: (key: string) => `${API_VERSION}/settings/${key}`,
    UPDATE_ONE: (key: string) => `${API_VERSION}/settings/${key}`,
  },

  // Audit & Compliance
  AUDIT: {
    LOGS: `${API_VERSION}/audit/logs`,
    ACTIVITY: `${API_VERSION}/audit/activity`,
    EXPORT: `${API_VERSION}/audit/export`,
  },

  // Dashboard
  DASHBOARD: {
    METRICS: `${API_VERSION}/dashboard/metrics`,
    CHARTS: `${API_VERSION}/dashboard/charts`,
    KPI: `${API_VERSION}/dashboard/kpi`,
  },
};

export default API_ENDPOINTS;
