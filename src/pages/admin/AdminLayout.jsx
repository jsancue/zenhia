import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Toolbar, Typography, CssBaseline, AppBar } from '@mui/material';

const drawerWidth = 240;

const adminNavLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Services', path: '/admin/services' },
    { name: 'Invoices', path: '/admin/invoices' },
];

function AdminLayout() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar /> {/* For spacing under the AppBar */}
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {adminNavLinks.map((link) => (
                            <ListItem
                                button
                                key={link.name}
                                component={RouterLink}
                                to={link.path}
                            >
                                <ListItemText primary={link.name} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar /> {/* For spacing under the AppBar */}
                <Outlet /> {/* Nested route content will be rendered here */}
            </Box>
        </Box>
    );
}

export default AdminLayout;
