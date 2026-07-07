'use client';

import React from 'react';
import { Box, Typography, TextField, InputAdornment, Button, Grid } from '@mui/material';
import { Search, Download } from 'lucide-react';
import { OrdersTable } from '@/components/orders/OrdersTable';

export default function OrdersPage() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Orders
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Manage and track all customer orders
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            placeholder="Search by order ID or customer..."
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Download size={18} />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Export
          </Button>
        </Grid>
      </Grid>

      {/* Orders Table */}
      <OrdersTable />
    </Box>
  );
}
