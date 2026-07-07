'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Package as PackageIcon,
  Users,
  TrendingUp,
  Settings,
  ChevronLeft,
  Warehouse,
  Package,
  BarChart3,
} from 'lucide-react';
import { useSidebar } from '@/stores/appStore';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Orders',
    href: '/orders',
    icon: <ShoppingCart size={20} />,
    badge: 12,
  },
  {
    label: 'Products',
    href: '/products',
    icon: <Package size={20} />,
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: <PackageIcon size={20} />,
  },
  {
    label: 'Warehouse',
    href: '/warehouse',
    icon: <Warehouse size={20} />,
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: <Users size={20} />,
  },
  {
    label: 'Revenue',
    href: '/revenue',
    icon: <TrendingUp size={20} />,
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: <BarChart3 size={20} />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings size={20} />,
  },
];

export const Sidebar: React.FC = () => {
  const { open, toggle } = useSidebar();
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 280 : 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 280 : 80,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 2,
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              opacity: open ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              E
            </Box>
            {open && (
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Admin
              </Typography>
            )}
          </Box>
          <IconButton size="small" onClick={toggle} sx={{ width: 36, height: 36 }}>
            <ChevronLeft size={20} />
          </IconButton>
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Navigation */}
        <List sx={{ flex: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ marginBottom: 0.5 }}>
              <Link href={item.href} style={{ width: '100%' }}>
                <ListItemButton
                  selected={isActive(item.href)}
                  sx={{
                    borderRadius: 1,
                    minHeight: 44,
                    justifyContent: open ? 'flex-start' : 'center',
                    px: open ? 2 : 0,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: open ? 40 : 'auto',
                      color: isActive(item.href) ? '#3b82f6' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: isActive(item.href) ? 600 : 500,
                      }}
                    />
                  )}
                  {open && item.badge && (
                    <Box
                      sx={{
                        ml: 'auto',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        borderRadius: 1,
                        padding: '2px 6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.badge}
                    </Box>
                  )}
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ marginY: 2 }} />

        {/* Footer Info */}
        {open && (
          <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }}>
            <Typography variant="caption">v1.0.0</Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};
