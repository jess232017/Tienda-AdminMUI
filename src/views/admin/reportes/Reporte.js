import React from 'react';
import PageCard from 'src/common/PageCard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

//Icon
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

//owned
import { show } from '@ebay/nice-modal-react';
import ReportViewer from 'src/common/ReportViewer';

const make = (title, subtitle, link) => ({ title, subtitle, link });
const URL = process.env.REACT_APP_API_URL;


const reportes = [
    make("Clientes", "Listado de todos los clientes", URL + "/Reporte/clientes"),
    make("Gastos", "Reporte con los gastos de este mes", URL + "/Reporte/gastos"),
    make("Productos", "Reporte con todos los productos registrados hasta la fecha", URL + "/Reporte/productos"),
    make("Productos por vencerse", "Reporte con los productos proximos a caducar", URL + "/Reporte/productos/vence"),
    make("Productos Vencidos", "Reporte con los lotes ya caducados", URL + "/Reporte/productos/vencido"),
    make("General", "Reporte con estadisticas generales", URL + "/Reporte/panel"),
    make("Proveedores", "Listado de todos los proveedores", URL + "/Reporte/proveedores"),
    make("Mejores Empleado", "Reporte con el listado de los vendedores que mas venden", URL + "/Reporte/empleados/top"),
    make("Factura", "Factura de una venta realizada", URL + "/Reporte/ventas"),
    make("Ventas", "Listado de todos las ventas", URL + "/Reporte/ventas/todas"),
]

const Reporte = () => {


    return (
        <PageCard
            icon="pi-shopping-cart"
            titulo="Reportes"
            subTitulo="Lista de Reportes disponibles"
        >
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {reportes.map(({ title, subtitle, link }, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Box component="article" sx={{ p: 2, borderBottom: '1px dashed grey' }}>
                            <h5>{title}</h5>
                            <p style={{ minHeight: '3rem' }}>
                                {subtitle}
                            </p>
                            <p>
                                <Button onClick={() => show(ReportViewer, { title, link })}
                                    endIcon={<NavigateNextIcon />}
                                    variant="outlined"
                                >
                                    Ver
                                </Button>
                            </p>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </PageCard>
    );
}

export default Reporte;