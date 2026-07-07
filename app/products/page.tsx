'use client';

import React from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';
import { ProductTable } from '@/components/products/ProductTable';

export default function ProductsPage() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Products
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Manage your product catalog and inventory
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search products by name, SKU..."
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

      {/* Product Table */}
      <ProductTable />
    </Box>
  );
}
