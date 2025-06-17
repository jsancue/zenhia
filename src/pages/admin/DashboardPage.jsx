import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import { Event as EventIcon, AssignmentTurnedIn as AssignmentTurnedInIcon, AttachMoney as AttachMoneyIcon, StarRate as StarRateIcon } from '@mui/icons-material';

// TODO: Replace mockStats with data fetched from API
const mockStats = {
    totalBookingsMonth: 125,
    upcomingAppointments: 15,
    popularService: 'Manicura Completa',
    monthlyRevenue: 2500, // Illustrative
};

const statItems = [
    {
        title: 'Reservas Totales (Mes)',
        value: mockStats.totalBookingsMonth,
        icon: <EventIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
        color: 'primary.main',
    },
    {
        title: 'Citas Próximas',
        value: mockStats.upcomingAppointments,
        icon: <AssignmentTurnedInIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
        color: 'secondary.main',
    },
    {
        title: 'Ingresos Mensuales (€)',
        value: mockStats.monthlyRevenue.toLocaleString('es-ES'), // Format as currency
        icon: <AttachMoneyIcon sx={{ fontSize: 40, color: 'success.main' }} />,
        color: 'success.main',
    },
    {
        title: 'Servicio Más Popular',
        value: mockStats.popularService,
        icon: <StarRateIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
        color: 'warning.main',
    },
];

function DashboardPage() {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
                Panel de Administración
            </Typography>

            <Grid container spacing={3}>
                {statItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card component={Paper} elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 2, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Box sx={{ mb: 2 }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: item.color, mb: 1 }}>
                                    {item.value}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" sx={{fontSize: '1rem'}}>
                                    {item.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default DashboardPage;
