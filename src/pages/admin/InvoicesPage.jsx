import React, { useState } from 'react';
import {
    Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

// TODO: Replace mockInvoices with data fetched from API
const initialMockInvoices = [
    {
        id: 'INV-2024-001',
        customerName: 'Elena García',
        serviceName: 'Manicura y Pedicura',
        date: '2024-07-15',
        amount: 55.00,
        status: 'Pagada',
    },
    {
        id: 'INV-2024-002',
        customerName: 'Carlos Fernández',
        serviceName: 'Masaje Relajante',
        date: '2024-07-18',
        amount: 70.00,
        status: 'Pendiente',
    },
    {
        id: 'INV-2024-003',
        customerName: 'Laura Martínez',
        serviceName: 'Tratamiento Facial',
        date: '2024-06-20',
        amount: 85.00,
        status: 'Vencida',
    },
    {
        id: 'INV-2024-004',
        customerName: 'Pedro Sánchez',
        serviceName: 'Corte y Peinado',
        date: '2024-07-22',
        amount: 45.00,
        status: 'Pagada',
    },
];

const getStatusChipColor = (status) => {
    switch (status) {
        case 'Pagada':
            return 'success';
        case 'Pendiente':
            return 'warning';
        case 'Vencida':
            return 'error';
        default:
            return 'default';
    }
};

function InvoicesPage() {
    const [invoices, setInvoices] = useState(initialMockInvoices);

    const handleViewDetails = (invoiceId) => {
        // TODO: Implement actual view details functionality (e.g., open a modal or navigate to a detail page)
        console.log(`Viewing details for invoice: ${invoiceId}`);
        alert(`Simulación: Ver detalles de Factura ID: ${invoiceId}`);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
                Gestión de Facturas
            </Typography>

            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="invoices table">
                    <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold', backgroundColor: 'grey.200' } }}>
                            <TableCell>ID Factura</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Servicio</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="right">Total (€)</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow
                                key={invoice.id}
                                sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}
                            >
                                <TableCell component="th" scope="row">
                                    {invoice.id}
                                </TableCell>
                                <TableCell>{invoice.customerName}</TableCell>
                                <TableCell>{invoice.serviceName}</TableCell>
                                <TableCell>{new Date(invoice.date).toLocaleDateString('es-ES')}</TableCell>
                                <TableCell align="right">{invoice.amount.toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={invoice.status}
                                        color={getStatusChipColor(invoice.status)}
                                        size="small"
                                        sx={{ fontWeight: 'medium' }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleViewDetails(invoice.id)}
                                        title="Ver Detalles"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {invoices.length === 0 && (
                <Typography sx={{ textAlign: 'center', mt: 4 }}>
                    No hay facturas para mostrar.
                </Typography>
            )}
        </Box>
    );
}

export default InvoicesPage;
