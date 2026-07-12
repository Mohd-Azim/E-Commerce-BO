'use client';

import React, { useEffect } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useAppStore } from '@/stores/appStore';
import { lightTheme, darkTheme } from '@/theme/theme';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useAppStore((state) => state.theme);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  useEffect(() => {
    // Initialize theme from localStorage on mount only
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme && savedTheme !== theme) {
        useAppStore.setState({ theme: savedTheme });
      }
    }
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* TopBar */}
          <TopBar />

          {/* Page Content */}
          <Box
            component="main"
            sx={{
              flex: 1,
              overflow: 'auto',
              padding: 3,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
