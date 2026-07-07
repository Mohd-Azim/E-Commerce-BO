'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Skeleton,
} from '@mui/material';
import { Search } from 'lucide-react';
import { getMockData } from '@/stores/mockDataStore';
import { Customer } from '@/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCustomers(getMockData.getCustomers(20));
    setLoading(false);
  }, []);

  const segmentColorMap: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
    vip: 'success',
    regular: 'primary',
    new: 'info',
    inactive: 'default',
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Customers
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          View and manage customer profiles
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search customers by name or email..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{ maxWidth: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Customers Table */}
      {loading ? (
        <Card sx={{ borderRadius: 2, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 3 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="text" height={40} sx={{ mb: 1 }} />
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ borderRadius: 2, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'background.default' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Phone</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Orders
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Total Spent
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Segment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    sx={{
                      '&:hover': { backgroundColor: 'action.hover' },
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{customer.name}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell align="right">{customer.totalOrders}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      ${customer.totalSpent.toFixed(0)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={customer.segmentType}
                        size="small"
                        color={segmentColorMap[customer.segmentType] || 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
