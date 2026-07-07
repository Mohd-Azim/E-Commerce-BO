'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { getMockData } from '@/stores/mockDataStore';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { DashboardMetrics } from '@/types';

export default function RevenuePage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    setMetrics(getMockData.getDashboardMetrics());
  }, []);

  if (!metrics) {
    return (
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
          Revenue Analytics
        </Typography>
      </Box>
    );
  }

  const revenueBreakdown = [
    { category: 'Electronics', percentage: 35, amount: metrics.totalRevenue * 0.35 },
    { category: 'Clothing', percentage: 25, amount: metrics.totalRevenue * 0.25 },
    { category: 'Home', percentage: 20, amount: metrics.totalRevenue * 0.20 },
    { category: 'Other', percentage: 20, amount: metrics.totalRevenue * 0.20 },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Revenue Analytics
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Financial insights and performance metrics
        </Typography>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Total Revenue
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                ${(metrics.totalRevenue / 1000).toFixed(1)}K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Avg Order Value
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                ${(metrics.totalRevenue / metrics.totalOrders).toFixed(0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Monthly Growth
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                +{metrics.revenueGrowth.toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Orders
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {metrics.totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue Trend */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <RevenueChart />
        </Grid>
      </Grid>

      {/* Revenue Breakdown */}
      <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Revenue by Category
          </Typography>
          {revenueBreakdown.map((item) => (
            <Box key={item.category} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.category}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ${(item.amount / 1000).toFixed(1)}K ({item.percentage}%)
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'action.hover',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${item.percentage}%`,
                    backgroundColor: '#3b82f6',
                  }}
                />
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
