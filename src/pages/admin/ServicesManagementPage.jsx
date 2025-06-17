import React, { useState, useEffect } from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Snackbar, Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

// Simulate fetching data from db.json
import dbData from '../../../db.json'; // Adjust path as necessary

const initialServiceFormState = {
    id: null,
    title: '',
    description: '',
    category: '',
    price: '',
    icon: '',
    imageUrl: '',
};

function ServicesManagementPage() {
    const [services, setServices] = useState([]);
    const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentService, setCurrentService] = useState(initialServiceFormState);
    const [isEditing, setIsEditing] = useState(false);
    const [serviceToDeleteId, setServiceToDeleteId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        // Simulate API call to fetch services
        setServices(dbData.services);
    }, []);

    const handleAddService = (newService) => {
        // TODO: Replace with API call
        const serviceWithId = { ...newService, id: Date.now() }; // Simulate ID generation
        setServices((prevServices) => [...prevServices, serviceWithId]);
        setSnackbar({ open: true, message: 'Servicio añadido con éxito!', severity: 'success' });
    };

    const handleUpdateService = (updatedService) => {
        // TODO: Replace with API call
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === updatedService.id ? updatedService : service
            )
        );
        setSnackbar({ open: true, message: 'Servicio actualizado con éxito!', severity: 'success' });
    };

    const handleDeleteService = (serviceId) => {
        // TODO: Replace with API call
        setServices((prevServices) =>
            prevServices.filter((service) => service.id !== serviceId)
        );
        setSnackbar({ open: true, message: 'Servicio eliminado con éxito!', severity: 'success' });
    };

    const handleOpenAddDialog = () => {
        setIsEditing(false);
        setCurrentService(initialServiceFormState);
        setOpenAddEditDialog(true);
    };

    const handleOpenEditDialog = (service) => {
        setIsEditing(true);
        setCurrentService(service);
        setOpenAddEditDialog(true);
    };

    const handleCloseAddEditDialog = () => {
        setOpenAddEditDialog(false);
        setCurrentService(initialServiceFormState);
    };

    const handleOpenDeleteDialog = (serviceId) => {
        setServiceToDeleteId(serviceId);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setServiceToDeleteId(null);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setCurrentService((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Basic validation
        if (!currentService.title || !currentService.category || !currentService.price) {
            setSnackbar({ open: true, message: 'Por favor, completa los campos obligatorios (Título, Categoría, Precio).', severity: 'error' });
            return;
        }
        if (isEditing) {
            handleUpdateService(currentService);
        } else {
            handleAddService(currentService);
        }
        handleCloseAddEditDialog();
    };

    const confirmDelete = () => {
        if (serviceToDeleteId) {
            handleDeleteService(serviceToDeleteId);
        }
        handleCloseDeleteDialog();
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom component="div">
                Gestión de Servicios
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{ mb: 2 }}
            >
                Añadir Nuevo Servicio
            </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Título</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Precio (€)</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell>{service.id}</TableCell>
                                <TableCell>{service.title}</TableCell>
                                <TableCell>{service.category}</TableCell>
                                <TableCell>{typeof service.price === 'number' ? service.price.toFixed(2) : service.price}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenEditDialog(service)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenDeleteDialog(service.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Dialog */}
            <Dialog open={openAddEditDialog} onClose={handleCloseAddEditDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditing ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="dense"
                            name="title"
                            label="Título del Servicio"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={currentService.title}
                            onChange={handleFormChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Descripción"
                            type="text"
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            value={currentService.description}
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="dense"
                            name="category"
                            label="Categoría"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={currentService.category}
                            onChange={handleFormChange}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="price"
                            label="Precio (€)"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={currentService.price}
                            onChange={handleFormChange}
                            required
                            InputProps={{
                                inputProps: { min: 0, step: "0.01" }
                            }}
                        />
                        <TextField
                            margin="dense"
                            name="icon"
                            label="Icono (Ej: ✂️ o nombre de ícono MUI)"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={currentService.icon}
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="dense"
                            name="imageUrl"
                            label="URL de la Imagen"
                            type="url"
                            fullWidth
                            variant="outlined"
                            value={currentService.imageUrl}
                            onChange={handleFormChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddEditDialog}>Cancelar</Button>
                    <Button type="submit" onClick={handleFormSubmit} variant="contained">
                        {isEditing ? 'Guardar Cambios' : 'Añadir Servicio'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
                    <Button onClick={confirmDelete} color="error" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ServicesManagementPage;
