'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Typography,
} from '@mui/material';
import { Search, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useAppStore, useTheme, useToggleTheme } from '@/stores/appStore';
import { mockDemoUser } from '@/mock/generators';

export const TopBar: React.FC = () => {
  const user = useAppStore((state) => state.user) || mockDemoUser;
  const notifications = useAppStore((state) => state.notifications);
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
        {/* Search Bar */}
        <TextField
          placeholder="Search products, orders, customers..."
          variant="outlined"
          size="small"
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'background.default',
            borderRadius: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          {/* Theme Toggle */}
          <IconButton
            size="small"
            onClick={toggleTheme}
            sx={{
              backgroundColor: 'action.hover',
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </IconButton>

          {/* Notifications */}
          <IconButton
            size="small"
            sx={{
              backgroundColor: 'action.hover',
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <Bell size={18} />
            </Badge>
          </IconButton>

          {/* Settings */}
          <IconButton
            size="small"
            sx={{
              backgroundColor: 'action.hover',
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <Settings size={18} />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1 }} />

          {/* User Menu */}
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{ width: 32, height: 32 }}
            />
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {user.role}
              </Typography>
            </Box>
          </Box>

          {/* User Menu Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem disabled>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
            </MenuItem>
            <Typography variant="caption" sx={{ px: 2, color: 'text.secondary' }}>
              {user.email}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <MenuItem onClick={handleMenuClose}>
              <Settings size={18} style={{ marginRight: 8 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <LogOut size={18} style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
