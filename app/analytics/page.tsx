'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Calendar, Download } from 'lucide-react';
import { getMockData } from '@/stores/mockDataStore';
import { DashboardMetrics } from '@/types';

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [dateRange, setDateRange] = useState('30days');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    setMetrics(getMockData.getDashboardMetrics());
  }, []);

  if (!metrics) return null;

  // Sample data for charts
  const topProducts = [
    { name: 'Laptop', sales: 1200, revenue: 48000 },
    { name: 'Monitor', sales: 950, revenue: 28500 },
    { name: 'Keyboard', sales: 850, revenue: 12750 },
    { name: 'Mouse', sales: 720, revenue: 7200 },
    { name: 'Headphones', sales: 650, revenue: 19500 },
  ];

  const conversionData = [
    { name: 'Mon', visits: 4000, conversions: 240, orders: 80 },
    { name: 'Tue', visits: 4500, conversions: 320, orders: 110 },
    { name: 'Wed', visits: 5200, conversions: 280, orders: 95 },
    { name: 'Thu', visits: 4800, conversions: 350, orders: 120 },
    { name: 'Fri', visits: 6200, conversions: 420, orders: 145 },
    { name: 'Sat', visits: 5800, conversions: 380, orders: 130 },
    { name: 'Sun', visits: 4200, conversions: 290, orders: 100 },
  ];

  const sourceData = [
    { name: 'Direct', value: 35, color: '#3b82f6' },
    { name: 'Social Media', value: 25, color: '#10b981' },
    { name: 'Search Engines', value: 20, color: '#f59e0b' },
    { name: 'Referral', value: 12, color: '#ef4444' },
    { name: 'Other', value: 8, color: '#8b5cf6' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Analytics
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Performance metrics and business insights
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="7days">Last 7 Days</MenuItem>
                  <MenuItem value="30days">Last 30 Days</MenuItem>
                  <MenuItem value="90days">Last 90 Days</MenuItem>
                  <MenuItem value="year">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="home">Home & Garden</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="date"
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Download size={18} />}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Export
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Total Visits
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {(conversionData.reduce((sum, d) => sum + d.visits, 0) / 1000).toFixed(1)}K
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                +12.5% vs last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Conversion Rate
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                6.2%
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                +0.8% vs last period
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
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                ${(metrics.totalRevenue / metrics.totalOrders).toFixed(0)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600 }}>
                -2.3% vs last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Customer Retention
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                72%
              </Typography>
              <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                +4.1% vs last period
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Conversion Funnel */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Visits & Conversions
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Traffic Source */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Traffic Source
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Products */}
      <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Top Products by Revenue
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" fill="#3b82f6" name="Sales Count" />
              <Bar yAxisId="right" dataKey="revenue" fill="#10b981" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
