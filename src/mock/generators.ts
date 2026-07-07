import { faker } from '@faker-js/faker';
import {
  User,
  Product,
  Order,
  OrderItem,
  Customer,
  Warehouse,
  InventoryLevel,
  RevenueData,
  DashboardMetrics,
} from '@/types';

const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Toys', 'Food', 'Beauty'];
const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;
const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'] as const;
const CUSTOMER_SEGMENTS = ['vip', 'regular', 'new', 'inactive'] as const;

export const generateUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  role: faker.helpers.arrayElement(['admin', 'manager', 'staff', 'viewer'] as const),
  status: faker.helpers.arrayElement(['active', 'inactive'] as const),
});

export const generateProduct = (): Product => ({
  id: faker.string.uuid(),
  sku: faker.commerce.isbn({ variant: '10' }).slice(0, 10),
  name: faker.commerce.productName(),
  category: faker.helpers.arrayElement(CATEGORIES),
  price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
  costPrice: parseFloat(faker.commerce.price({ min: 5, max: 250 })),
  stock: faker.number.int({ min: 0, max: 1000 }),
  images: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
    faker.image.url()
  ),
  description: faker.commerce.productDescription(),
  status: faker.helpers.arrayElement(['active', 'inactive', 'archived'] as const),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export const generateProducts = (count: number): Product[] =>
  Array.from({ length: count }, () => generateProduct());

export const generateOrderItem = (product?: Product): OrderItem => {
  const p = product || generateProduct();
  const quantity = faker.number.int({ min: 1, max: 10 });
  const price = p.price;
  const total = quantity * price;

  return {
    id: faker.string.uuid(),
    productId: p.id,
    productName: p.name,
    sku: p.sku,
    quantity,
    price,
    total,
  };
};

export const generateOrder = (): Order => {
  const itemCount = faker.number.int({ min: 1, max: 5 });
  const items = Array.from({ length: itemCount }, () => generateOrderItem());
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1;
  const shipping = faker.number.int({ min: 5, max: 30 });
  const total = subtotal + tax + shipping;

  return {
    id: faker.string.uuid(),
    orderNumber: `ORD-${faker.number.int({ min: 100000, max: 999999 })}`,
    customerId: faker.string.uuid(),
    customerName: faker.person.fullName(),
    customerEmail: faker.internet.email(),
    status: faker.helpers.arrayElement(ORDER_STATUSES),
    items,
    subtotal,
    tax,
    shipping,
    total,
    paymentStatus: faker.helpers.arrayElement(PAYMENT_STATUSES),
    paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer', 'upi']),
    shippingAddress: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
    billingAddress: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent(),
    notes: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
  };
};

export const generateOrders = (count: number): Order[] =>
  Array.from({ length: count }, () => generateOrder());

export const generateCustomer = (): Customer => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  status: faker.helpers.arrayElement(['active', 'inactive', 'blocked'] as const),
  totalOrders: faker.number.int({ min: 0, max: 100 }),
  totalSpent: parseFloat((Math.random() * 50000).toFixed(2)),
  lastOrderDate: faker.datatype.boolean() ? faker.date.past() : undefined,
  createdAt: faker.date.past({ years: 2 }),
  rewardPoints: faker.number.int({ min: 0, max: 10000 }),
  segmentType: faker.helpers.arrayElement(CUSTOMER_SEGMENTS),
});

export const generateCustomers = (count: number): Customer[] =>
  Array.from({ length: count }, () => generateCustomer());

export const generateWarehouse = (): Warehouse => ({
  id: faker.string.uuid(),
  name: faker.company.name() + ' Warehouse',
  location: faker.location.city() + ', ' + faker.location.state(),
  capacity: faker.number.int({ min: 1000, max: 100000 }),
  currentUtilization: faker.number.int({ min: 0, max: 100 }),
  status: faker.helpers.arrayElement(['active', 'inactive'] as const),
  manager: faker.person.fullName(),
});

export const generateWarehouses = (count: number): Warehouse[] =>
  Array.from({ length: count }, () => generateWarehouse());

export const generateInventoryLevel = (product?: Product, warehouse?: Warehouse): InventoryLevel => {
  const p = product || generateProduct();
  const w = warehouse || generateWarehouse();

  return {
    id: faker.string.uuid(),
    productId: p.id,
    warehouseId: w.id,
    quantity: faker.number.int({ min: 0, max: 500 }),
    reorderLevel: faker.number.int({ min: 10, max: 100 }),
    reorderQuantity: faker.number.int({ min: 50, max: 200 }),
    lastStockCheck: faker.date.recent(),
  };
};

export const generateRevenueData = (days: number): RevenueData[] =>
  Array.from({ length: days }, (_, i) => {
    const date = faker.date.past({ years: 1 });
    date.setDate(date.getDate() + i);

    const revenue = parseFloat((Math.random() * 100000 + 10000).toFixed(2));
    const orders = faker.number.int({ min: 10, max: 500 });
    const avgOrderValue = parseFloat((revenue / orders).toFixed(2));
    const customers = faker.number.int({ min: 5, max: orders });

    return {
      date,
      revenue,
      orders,
      avgOrderValue,
      customers,
    };
  });

export const generateDashboardMetrics = (): DashboardMetrics => {
  const totalRevenue = parseFloat((Math.random() * 500000 + 50000).toFixed(2));
  const totalOrders = faker.number.int({ min: 100, max: 5000 });
  const totalCustomers = faker.number.int({ min: 50, max: 2000 });
  const inventoryValue = parseFloat((Math.random() * 200000 + 20000).toFixed(2));

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    inventoryValue,
    revenueGrowth: parseFloat((Math.random() * 50 - 25).toFixed(2)),
    orderGrowth: parseFloat((Math.random() * 30 - 15).toFixed(2)),
    customerGrowth: parseFloat((Math.random() * 20 - 10).toFixed(2)),
    returnsRate: parseFloat((Math.random() * 10).toFixed(2)),
  };
};

// Mock user for demo - static to avoid hydration mismatch
export const mockDemoUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  role: 'admin',
  status: 'active',
};
