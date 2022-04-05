import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

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
import PageCard from '_@/common/PageCard';
import NoData from '_@/pages/error/NoData';
import api from '_@/services/api/tasks/ApiOrder';

const calculateTotal = ({ row }) => {
    const { price, quantity, discount } = row || 0;
    return ((price * quantity) - (discount * quantity)).toFixed(2);
}

const columns = [
    { field: 'id', headerName: 'Id', width: 20 },
    { field: 'name', headerName: 'Nombre', flex: 1 },
    { field: 'quantity', headerName: 'Cantidad', flex: 1 },
    { field: 'price', headerName: 'Precio', flex: 1 },
    { field: 'discount', headerName: 'Descuento', flex: 1 },
    { valueGetter: calculateTotal, headerName: 'Total', flex: 1 },
]

const Detalle = () => {
    //get data from api
    const facturaId = useParams().invoiceId;
    const { mutateAsync } = api.editNote(facturaId);
    const { data: dataFactura } = api.getById(facturaId);
    const { data: dataDetalle } = api.getDetails(facturaId);
    const reportURL = import.meta.env.VITE_API_URL + "/Reporte/factura?Id=" + facturaId;

    const { data: detalle } = dataDetalle || {};
    const { data: factura } = dataFactura || {};
    
    const [note, setNote] = useState(factura?.note || "")

    const handleNote = () => {
        toast.promise(mutateAsync({ note }), {
            pending: 'Guardando los cambios...',
            success: "Guardado correctamente",
            error: {
                render({ data }) {
                    const error = data?.response?.data?.error;
                    return error?.message || data?.message;
                }
            }
        });
    };

    return (
        <PageCard
            headerProps={{
                title: factura?.date,
                subheader: "Id Factura: " + facturaId,
                avatar: <CalendarTodayIcon />
            }}
        >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} mb={2}>
                <Article
                    title="Cliente"
                    subtitle=""
                    link="#"
                    linkText="Ver Perfil"
                    icon={PermIdentityIcon}
                >
                    {factura?.clientName} <br /> alguien@ejemplo.com <br /> +505 2212-3456
                </Article>
                <Article
                    title="Venta"
                    link={reportURL}
                    linkText="Descargar Recibo"
                    icon={ShoppingCartIcon}
                >
                    Total: C${factura?.total} <br /> Pago con: C$ {factura?.paidWith} <br /> Estado: {factura?.status}
                </Article>
                <Article
                    title="Metodo de pago"
                    link="#"
                    linkText="Ver Metodos"
                    icon={AccountWalletIcon}
                >
                    Metodo: {factura?.paymentName} <br /> Estado: {factura?.status}
                </Article>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <div style={{ height: 400, width: '100%' }}>
                        <div style={{ display: 'flex', height: '100%', padding: '7px' }}>
                            <div style={{ flexGrow: 1 }} >
                                <DataGrid
                                    columns={columns}
                                    rows={detalle || []}
                                    hideFooter
                                    components={{
                                        NoRowsOverlay: NoData
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Box sx={{ boxShadow: 1, padding: 2, borderRadius: 2, display: 'none'}} className="box shadow-sm bg-light p-5 d-none pb-4">
                        <h6>Informacion de Pago</h6>
                        <p>
                            <img src="images/card-brands/2.png" className="border" height={20} /> Master Card **** **** 4768  <br />
                            Business name: Grand Market LLC <br />
                            Phone: +1 (800) 555-154-52
                        </p>
                    </Box>
                    <div>
                        <Box mb={1}>
                            <label><Typography variant='subtitle1'>Notas</Typography></label>
                            <TextareaAutosize
                                name="notas"
                                id="notas"
                                value={note}
                                onChange={event => {
                                    setNote(event.target.value)
                                }}
                                aria-label="empty textarea"
                                placeholder="Escribe alguna nota"
                                style={{ width: 300, height: 100 }}
                            />
                        </Box>
                        <Button variant="contained" size="small" onClick={handleNote}>
                            Guardar Nota
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </PageCard>
    );
}

export default Detalle;
