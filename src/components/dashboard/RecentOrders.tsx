'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Typography,
  Skeleton,
} from '@mui/material';
import Link from 'next/link';
import { getMockData } from '@/stores/mockDataStore';
import { Order } from '@/types';

interface OrderRow {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: string;
  date: string;
}

export const RecentOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generated = getMockData.getOrders(8);
    const transformed = generated.map((order: Order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: order.customerName,
      total: order.total,
      status: order.status,
      date: new Date(order.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }));
    setOrders(transformed);
    setLoading(false);
  }, []);

  const statusColorMap: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
    pending: 'warning',
    confirmed: 'primary',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'error',
  };

  if (loading) {
    return (
      <Card sx={{ borderRadius: 2, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
        <CardHeader title="Recent Orders" titleTypographyProps={{ variant: 'h6', fontWeight: 700 }} sx={{ pb: 0 }} />
        <CardContent sx={{ p: 3 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="text" height={40} sx={{ mb: 1 }} />
          ))}
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
        title="Recent Orders"
        titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.default' }}>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Customer</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <TableCell>
                    <Link
                      href={`/orders/${order.id}`}
                      style={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      {order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      size="small"
                      color={statusColorMap[order.status] || 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
