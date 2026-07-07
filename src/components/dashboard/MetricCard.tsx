'use client';

import React from 'react';
import { Card, CardContent } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'primary',
}) => {
  const colorMap = {
    primary: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  };

  const isPositive = change && change >= 0;

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                backgroundColor: `${colorMap[color]}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colorMap[color],
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </Typography>
          {change !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isPositive ? (
                <TrendingUp size={16} style={{ color: '#10b981' }} />
              ) : (
                <TrendingDown size={16} style={{ color: '#ef4444' }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: isPositive ? '#10b981' : '#ef4444',
                  fontWeight: 600,
                }}
              >
                {isPositive ? '+' : ''}{change}% from last month
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
