import {
  generateProducts,
  generateOrders,
  generateCustomers,
  generateWarehouses,
  generateInventoryLevel,
  generateRevenueData,
  generateDashboardMetrics,
} from '@/mock/generators';
import { Product, Order, Customer, Warehouse, InventoryLevel, RevenueData, DashboardMetrics } from '@/types';

// Mock service functions that mimic real API calls
// Can be easily replaced with actual API calls later

const MOCK_DELAY = 300; // Simulate network delay

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Products
export const productService = {
  async getProducts(limit = 50, page = 1): Promise<{ data: Product[]; total: number }> {
    await delay(MOCK_DELAY);
    const products = generateProducts(limit);
    return {
      data: products,
      total: 500, // Mock total count
    };
  },

  async getProductById(id: string): Promise<Product> {
    await delay(MOCK_DELAY);
    const products = generateProducts(1);
    return products[0];
  },

  async searchProducts(query: string): Promise<Product[]> {
    await delay(MOCK_DELAY);
    return generateProducts(10);
  },
};

// Orders
export const orderService = {
  async getOrders(limit = 50, page = 1): Promise<{ data: Order[]; total: number }> {
    await delay(MOCK_DELAY);
    const orders = generateOrders(limit);
    return {
      data: orders,
      total: 2000,
    };
  },

  async getOrderById(id: string): Promise<Order> {
    await delay(MOCK_DELAY);
    const orders = generateOrders(1);
    return orders[0];
  },

  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    await delay(MOCK_DELAY);
    const orders = generateOrders(1);
    return { ...orders[0], ...data };
  },
};

// Customers
export const customerService = {
  async getCustomers(limit = 50, page = 1): Promise<{ data: Customer[]; total: number }> {
    await delay(MOCK_DELAY);
    const customers = generateCustomers(limit);
    return {
      data: customers,
      total: 5000,
    };
  },

  async getCustomerById(id: string): Promise<Customer> {
    await delay(MOCK_DELAY);
    const customers = generateCustomers(1);
    return customers[0];
  },
};

// Warehouse
export const warehouseService = {
  async getWarehouses(): Promise<Warehouse[]> {
    await delay(MOCK_DELAY);
    return generateWarehouses(5);
  },

  async getInventoryByWarehouse(warehouseId: string): Promise<InventoryLevel[]> {
    await delay(MOCK_DELAY);
    return Array.from({ length: 10 }, () => generateInventoryLevel());
  },
};

// Revenue/Finance
export const revenueService = {
  async getRevenueData(days = 30): Promise<RevenueData[]> {
    await delay(MOCK_DELAY);
    return generateRevenueData(days);
  },

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    await delay(MOCK_DELAY);
    return generateDashboardMetrics();
  },
};

// Analytics
export const analyticsService = {
  async getSalesData(startDate: Date, endDate: Date): Promise<any> {
    await delay(MOCK_DELAY);
    return {
      totalSales: 150000,
      ordersCount: 450,
      averageOrderValue: 333.33,
    };
  },

  async getTopProducts(): Promise<any[]> {
    await delay(MOCK_DELAY);
    return generateProducts(10);
  },

  async getCustomerSegments(): Promise<any[]> {
    await delay(MOCK_DELAY);
    return [
      { segment: 'VIP', count: 150, revenue: 50000 },
      { segment: 'Regular', count: 2000, revenue: 300000 },
      { segment: 'New', count: 500, revenue: 50000 },
      { segment: 'Inactive', count: 3000, revenue: 0 },
    ];
  },
};
