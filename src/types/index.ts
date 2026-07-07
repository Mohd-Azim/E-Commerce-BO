// User and Auth
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  status: 'active' | 'inactive';
}

// Products
export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  images: string[];
  description: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

// Orders
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Customers
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'blocked';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  createdAt: Date;
  rewardPoints: number;
  segmentType: 'vip' | 'regular' | 'new' | 'inactive';
}

// Inventory
export interface InventoryLevel {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  reorderLevel: number;
  reorderQuantity: number;
  lastStockCheck: Date;
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentUtilization: number;
  status: 'active' | 'inactive';
  manager: string;
}

// Revenue & Finance
export interface RevenueData {
  date: Date;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  customers: number;
}

export interface FinanceMetrics {
  totalRevenue: number;
  totalExpense: number;
  profit: number;
  profitMargin: number;
  gst: number;
  taxRate: number;
}

// Dashboard
export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  inventoryValue: number;
  revenueGrowth: number;
  orderGrowth: number;
  customerGrowth: number;
  returnsRate: number;
}

// App State
export interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  user?: User;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  read: boolean;
}

// Filters
export interface FilterOptions {
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  category?: string;
  warehouse?: string;
  [key: string]: any;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
