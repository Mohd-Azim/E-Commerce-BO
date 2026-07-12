'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Settings as SettingsIcon, Bell, Shield, Users, Palette } from 'lucide-react';

interface SettingsTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [settings, setSettings] = useState({
    storeName: 'My E-Commerce Store',
    storeEmail: 'admin@store.com',
    currency: 'USD',
    timezone: 'UTC',
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    twoFactorAuth: false,
    dataExport: true,
    darkMode: false,
  });

  const tabs: SettingsTab[] = [
    { id: 'general', label: 'General', icon: <SettingsIcon size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
    { id: 'team', label: 'Team', icon: <Users size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={20} /> },
  ];

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Store Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Store Name"
                    value={settings.storeName}
                    onChange={(e) => handleChange('storeName', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Store Email"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleChange('storeEmail', e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={settings.currency}
                      label="Currency"
                      onChange={(e) => handleChange('currency', e.target.value)}
                    >
                      <MenuItem value="USD">USD ($)</MenuItem>
                      <MenuItem value="EUR">EUR (€)</MenuItem>
                      <MenuItem value="GBP">GBP (£)</MenuItem>
                      <MenuItem value="INR">INR (₹)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={settings.timezone}
                      label="Timezone"
                      onChange={(e) => handleChange('timezone', e.target.value)}
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="EST">EST</MenuItem>
                      <MenuItem value="PST">PST</MenuItem>
                      <MenuItem value="IST">IST</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4 }}>
                <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        );

      case 'notifications':
        return (
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Notification Preferences
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                    />
                  }
                  label="Email Notifications"
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4, mt: -1 }}>
                  Receive email notifications for important events
                </Typography>

                <Divider sx={{ my: 2 }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={(e) => handleChange('pushNotifications', e.target.checked)}
                    />
                  }
                  label="Push Notifications"
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4, mt: -1 }}>
                  Browser push notifications for real-time updates
                </Typography>

                <Divider sx={{ my: 2 }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.weeklyReports}
                      onChange={(e) => handleChange('weeklyReports', e.target.checked)}
                    />
                  }
                  label="Weekly Reports"
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4, mt: -1 }}>
                  Receive weekly summary reports every Monday
                </Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Save Preferences
                </Button>
              </Box>
            </CardContent>
          </Card>
        );

      case 'security':
        return (
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Security Settings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                    />
                  }
                  label="Two-Factor Authentication"
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4, mt: -1 }}>
                  Add an extra layer of security to your account
                </Typography>

                <Divider sx={{ my: 2 }} />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.dataExport}
                      onChange={(e) => handleChange('dataExport', e.target.checked)}
                    />
                  }
                  label="Allow Data Export"
                />
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4, mt: -1 }}>
                  Permit exporting of business data
                </Typography>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Button variant="outlined" color="error" sx={{ textTransform: 'none', fontWeight: 600 }}>
                Change Password
              </Button>
            </CardContent>
          </Card>
        );

      case 'team':
        return (
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Team Members
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Manage team members and their access levels
              </Typography>
              {[
                { name: 'Admin User', email: 'admin@store.com', role: 'Owner', status: 'Active' },
                { name: 'John Doe', email: 'john@store.com', role: 'Manager', status: 'Active' },
                { name: 'Jane Smith', email: 'jane@store.com', role: 'Editor', status: 'Pending' },
              ].map((member) => (
                <Box
                  key={member.email}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {member.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: member.status === 'Active' ? 'success.main' : 'warning.main' }}>
                      {member.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Invite Member
                </Button>
              </Box>
            </CardContent>
          </Card>
        );

      case 'appearance':
        return (
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Appearance Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.darkMode}
                    onChange={(e) => handleChange('darkMode', e.target.checked)}
                  />
                }
                label="Dark Mode"
              />
              <Typography variant="body2" sx={{ color: 'text.secondary', ml: 4, mt: 1 }}>
                Enable dark theme for comfortable viewing at night
              </Typography>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Manage your store preferences and configurations
        </Typography>
      </Box>

      {/* Desktop Layout - Sidebar Tabs */}
      <Grid container spacing={3}>
        {/* Tabs Sidebar */}
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 0 }}>
              {tabs.map((tab) => (
                <Box
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 3,
                    py: 2,
                    cursor: 'pointer',
                    backgroundColor: activeTab === tab.id ? 'action.selected' : 'transparent',
                    borderLeft: activeTab === tab.id ? '3px solid' : 'none',
                    borderColor: activeTab === tab.id ? 'primary.main' : 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Box sx={{ color: activeTab === tab.id ? 'primary.main' : 'text.secondary' }}>
                    {tab.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: activeTab === tab.id ? 700 : 500,
                      color: activeTab === tab.id ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {tab.label}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Tab Content */}
        <Grid item xs={12} md={9}>
          {renderTabContent()}
        </Grid>
      </Grid>
    </Box>
  );
}
