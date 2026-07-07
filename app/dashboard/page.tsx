'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { ShoppingCart, Users, TrendingUp, Warehouse } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { getMockData } from '@/stores/mockDataStore';
import { DashboardMetrics } from '@/types';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    setMetrics(getMockData.getDashboardMetrics());
  }, []);

  if (!metrics) {
    return (
      <Box>
        <Skeleton variant="text" width="200px" height={40} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Skeleton variant="rounded" height={150} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Welcome back! Here's what's happening with your business today.
        </Typography>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value={`$${(metrics.totalRevenue / 1000).toFixed(1)}K`}
            change={metrics.revenueGrowth}
            icon={<TrendingUp size={24} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Orders"
            value={metrics.totalOrders.toLocaleString()}
            change={metrics.orderGrowth}
            icon={<ShoppingCart size={24} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Customers"
            value={metrics.totalCustomers.toLocaleString()}
            change={metrics.customerGrowth}
            icon={<Users size={24} />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Inventory Value"
            value={`$${(metrics.inventoryValue / 1000).toFixed(1)}K`}
            change={-metrics.returnsRate}
            icon={<Warehouse size={24} />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Charts and Tables */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <RevenueChart />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Avg Order Value
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  ${(metrics.totalRevenue / metrics.totalOrders).toFixed(2)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Return Rate
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {metrics.returnsRate.toFixed(2)}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Revenue Growth
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: metrics.revenueGrowth >= 0 ? '#10b981' : '#ef4444',
                  }}
                >
                  {metrics.revenueGrowth >= 0 ? '+' : ''}{metrics.revenueGrowth.toFixed(1)}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <RecentOrders />
        </Grid>
      </Grid>
    </Box>
  );
}
