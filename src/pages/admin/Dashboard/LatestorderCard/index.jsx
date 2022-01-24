import React from 'react';

import {
    Card,
    CardHeader,
    Divider,
    Grid,
    CardContent,
    CardActions,
    Chip,
    IconButton,
    CardMedia,
    Typography,
    Button,
} from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { gridSpacing } from '_@/services/constant';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Phone1 from '_@/assets/images/widget/PHONE1.jpg';
import Phone2 from '_@/assets/images/widget/PHONE2.jpg';
import Phone3 from '_@/assets/images/widget/PHONE3.jpg';
import Phone4 from '_@/assets/images/widget/PHONE4.jpg';


function createData(customer, cid, photo, product, quantity, date, status, statuscolor) {
    return { customer, cid, photo, product, quantity, date, status, statuscolor };
}

const rows = [
    createData('John Deo', '#81412314', Phone1, 'Moto G5', '10', '17-2-2017', 'Pendiente', 'secondary'),
    createData('Jenny William', '#68457898', Phone2, 'iPhone 8', '16', '20-2-2017', 'Pagado', 'primary'),
    createData('Lori Moore', '#45457898', Phone3, 'Redmi 4', '20', '17-2-2017', 'Exitoso', 'secondary'),
    createData('Austin Pena', '#62446232', Phone4, 'Jio', '15', '25-4-2017', 'Fallado', 'primary'),
];

export default function LatestorderCard() {

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        title={
                            <Typography variant="h6" gutterBottom component="div">
                                Ultimas ordenes
                            </Typography>
                        }
                    />
                    <Divider />
                    <CardContent className="p-0">
                        <TableContainer>
                            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>Orden Id</TableCell>
                                        <TableCell>Foto</TableCell>
                                        <TableCell>Producto</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Fecha</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Acción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.customer}</TableCell>
                                            <TableCell>{row.cid}</TableCell>
                                            <TableCell>
                                                <CardMedia component="img" image={row.photo} title="image" sx={{ width: '20px', height: 'auto' }} />
                                            </TableCell>
                                            <TableCell>{row.product}</TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>
                                                <Chip color={row.statuscolor} label={row.status} size="small" />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton color="primary">
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                                <IconButton color="inherit">
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                    <CardActions className="f-right">
                        <Button variant="text" size="small" color="primary">
                            Ver todas las ordenes
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
