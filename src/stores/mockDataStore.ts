// Mock data cache using simple object to avoid Zustand infinite loops
let mockDataCache: Record<string, any> = {};

export const getMockData = {
  getDashboardMetrics: () => {
    if (!mockDataCache.dashboardMetrics) {
      const { generateDashboardMetrics } = require('@/mock/generators');
      mockDataCache.dashboardMetrics = generateDashboardMetrics();
    }
    return mockDataCache.dashboardMetrics;
  },

  getProducts: (count = 25) => {
    const key = `products_${count}`;
    if (!mockDataCache[key]) {
      const { generateProducts } = require('@/mock/generators');
      mockDataCache[key] = generateProducts(count);
    }
    return mockDataCache[key];
  },

  getOrders: (count = 20) => {
    const key = `orders_${count}`;
    if (!mockDataCache[key]) {
      const { generateOrders } = require('@/mock/generators');
      mockDataCache[key] = generateOrders(count);
    }
    return mockDataCache[key];
  },

  getCustomers: (count = 20) => {
    const key = `customers_${count}`;
    if (!mockDataCache[key]) {
      const { generateCustomers } = require('@/mock/generators');
      mockDataCache[key] = generateCustomers(count);
    }
    return mockDataCache[key];
  },

  getWarehouses: (count = 4) => {
    const key = `warehouses_${count}`;
    if (!mockDataCache[key]) {
      const { generateWarehouses } = require('@/mock/generators');
      mockDataCache[key] = generateWarehouses(count);
    }
    return mockDataCache[key];
  },

  getRevenueData: (days = 30) => {
    const key = `revenue_${days}`;
    if (!mockDataCache[key]) {
      const { generateRevenueData } = require('@/mock/generators');
      mockDataCache[key] = generateRevenueData(days);
    }
    return mockDataCache[key];
  },
};
