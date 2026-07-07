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
  Divider,
  Typography,
} from '@mui/material';
import { Eye, Filter } from 'lucide-react';
import { generateOrders } from '@/mock/generators';

export const OrdersTable: React.FC = () => {
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);

  const orders = useMemo(() => {
    return generateOrders(50).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage]);

  const statusColorMap: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
    pending: 'warning',
    confirmed: 'primary',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'error',
  };

  const paymentColorMap: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
    paid: 'success',
    pending: 'warning',
    failed: 'error',
    refunded: 'default',
  };

  const handleViewClick = (order: any) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
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
          title="Orders"
          action={
            <IconButton
              size="small"
              sx={{ backgroundColor: 'action.hover' }}
            >
              <Filter size={18} />
            </IconButton>
          }
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
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Email</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Total
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Date</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Actions
                  </TableCell>
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
                    <TableCell sx={{ fontWeight: 600 }}>{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                      {order.customerEmail}
                    </TableCell>
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
                    <TableCell>
                      <Chip
                        label={order.paymentStatus}
                        size="small"
                        color={paymentColorMap[order.paymentStatus] || 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleViewClick(order)}
                        sx={{ color: 'primary.main' }}
                      >
                        <Eye size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {selectedOrder && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Order Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedOrder.orderNumber}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Customer
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {selectedOrder.customerName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {selectedOrder.customerEmail}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Items ({selectedOrder.items.length})
                </Typography>
                {selectedOrder.items.map((item: any, idx: number) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{item.productName}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${item.total.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Total Amount
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  ${selectedOrder.total.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
