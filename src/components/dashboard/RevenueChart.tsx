'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';
import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getMockData } from '@/stores/mockDataStore';
import { RevenueData } from '@/types';

interface ChartData {
  date: string;
  revenue: number;
}

export const RevenueChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rawData = getMockData.getRevenueData(30);
    const transformed = rawData.map((item: RevenueData) => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.round(item.revenue),
    }));
    setData(transformed);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Card sx={{ borderRadius: 2, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
        <CardHeader title="Revenue Trend" subheader="Last 30 days" sx={{ pb: 0 }} />
        <CardContent>
          <Skeleton variant="rounded" height={300} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 2,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardHeader
        title="Revenue Trend"
        subheader="Last 30 days"
        titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        subheaderTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="rgba(0,0,0,0.5)"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="rgba(0,0,0,0.5)"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
