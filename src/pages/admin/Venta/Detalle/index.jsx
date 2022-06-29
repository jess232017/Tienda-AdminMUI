import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

//Controls
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { DataGrid } from '@mui/x-data-grid';

//Icon
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayTwoTone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

//own
import Article from './Article';
import PageCard from '@/common/PageCard';
import NoData from '@/pages/error/NoData';
import api from '@/api/tasks/ApiOrder';

const calculateTotal = ({ row }) => {
    const { price, quantity, discount } = row || 0;
    return (price * quantity - discount * quantity).toFixed(2);
};

const columns = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },
    { field: 'price', headerName: 'Precio', width: 100 },
    { field: 'discount', headerName: 'Descuento', width: 100 },
    { valueGetter: calculateTotal, headerName: 'Total', width: 100 },
];

const Details = () => {
    //get data from api
    const orderId = useParams().invoiceId;
    const { mutate } = api.editNote(orderId);
    const { data: order } = api.getById(orderId);
    const { data: details } = api.getDetails(orderId);
    const reportURL = import.meta.env.VITE_API_URL + '/api/Reporte/order?Id=' + orderId;

    console.log('details', details);

    const [note, setNote] = useState(order?.note || '');

    const handleNote = () => mutate({ note });

    return (
        <PageCard
            headerProps={{
                title: order?.date,
                subheader: 'Id order: ' + orderId,
                avatar: <CalendarTodayIcon />,
            }}
        >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} mb={2}>
                <Article title="Cliente" subtitle="" link="#" linkText="Ver Perfil" icon={PermIdentityIcon}>
                    {order?.clientName} <br /> {order?.clientEmail} <br /> +505 {order?.clientPhone}
                </Article>
                <Article title="Venta" link={reportURL} linkText="Descargar Recibo" icon={ShoppingCartIcon}>
                    Total: C${order?.total} <br /> Pago con: C$ {order?.paidWith} <br /> Estado: {order?.status}
                </Article>
                <Article title="Informacion de Pago" link="#" linkText="Ver Metodos" icon={AccountWalletIcon}>
                    Metodo: {order?.paymentName} <br /> Estado: {order?.status}
                </Article>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <Box sx={{ display: 'flex', height: '100%', padding: '7px' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <DataGrid
                                    columns={columns}
                                    rows={details || []}
                                    hideFooter
                                    components={{
                                        NoRowsOverlay: NoData,
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Box mb={1}>
                        <label>
                            <Typography variant="subtitle1">Notas</Typography>
                        </label>
                        <div className="input-style">
                            <TextareaAutosize
                                name="notas"
                                id="notas"
                                value={note}
                                onChange={(event) => {
                                    setNote(event.target.value);
                                }}
                                aria-label="empty textarea"
                                placeholder="Escribe alguna nota"
                                style={{ width: 300, height: 100 }}
                            />
                        </div>
                    </Box>
                    <Button variant="contained" size="small" onClick={handleNote}>
                        Guardar Nota
                    </Button>
                </Grid>
            </Grid>
        </PageCard>
    );
};

export default Details;
