'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Skeleton } from '@mui/material';
import { getMockData } from '@/stores/mockDataStore';
import { Warehouse } from '@/types';

export default function InventoryPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWarehouses(getMockData.getWarehouses(4));
    setLoading(false);
  }, []);
  
  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Inventory
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Track stock levels across warehouses
        </Typography>
      </Box>

      {/* Warehouse Cards */}
      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {warehouses.map((warehouse) => (
          <Grid item xs={12} sm={6} md={3} key={warehouse.id}>
            <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  {warehouse.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {warehouse.location}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Capacity
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {warehouse.currentUtilization}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={warehouse.currentUtilization}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'action.hover',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          warehouse.currentUtilization > 80 ? '#ef4444' : '#10b981',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Manager
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {warehouse.manager}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        </Grid>
      )}
    </Box>
  );
}
