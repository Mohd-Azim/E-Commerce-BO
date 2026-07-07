'use client';

import React, { useMemo } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { generateProducts } from '@/mock/generators';

export const ProductTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

  const products = useMemo(() => {
    return generateProducts(50).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage]);

  const statusColorMap: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
    active: 'success',
    inactive: 'default',
    archived: 'error',
  };

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <CardHeader
          title="Products"
          action={
            <Button
              variant="contained"
              color="primary"
              startIcon={<Plus size={18} />}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Add Product
            </Button>
          }
          titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
          sx={{ pb: 0 }}
        />
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'background.default' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>SKU</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Category</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Price
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Stock
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{product.sku}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          backgroundColor: product.stock > 100 ? '#d1fae5' : '#fef3c7',
                          color: product.stock > 100 ? '#065f46' : '#92400e',
                          fontWeight: 600,
                        }}
                      >
                        {product.stock}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.status}
                        size="small"
                        color={statusColorMap[product.status] || 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(product)}
                        sx={{ color: 'primary.main' }}
                      >
                        <Edit2 size={16} />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'error.main' }}>
                        <Trash2 size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {selectedProduct && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <strong>SKU:</strong> {selectedProduct.sku}
              </Box>
              <Box>
                <strong>Name:</strong> {selectedProduct.name}
              </Box>
              <Box>
                <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
              </Box>
              <Box>
                <strong>Stock:</strong> {selectedProduct.stock}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
