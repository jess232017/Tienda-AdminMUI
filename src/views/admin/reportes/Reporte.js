import React from 'react';
import PageCard from 'src/common/PageCard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const make = (title, subtitle, link) => ({title, subtitle, link});
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
            titulo = "Reportes"
            subTitulo = "Lista de Reportes disponibles"
        >
            <Grid container  columns={{ xs: 4, sm: 8, md: 12 }}>
                {reportes.map((value, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Box component="article" sx={{ p: 2, borderBottom: '1px dashed grey' }}>
                            <h5>{value.title}</h5>
                            <p style={{minHeight: '3rem'}}> 
                                {value.subtitle}
                                {/*This example handle multiple cases of the countdown, show <code class="highlighter-rouge">%-w</code> weeks and <code class="highlighter-rouge">%-d</code> days only when necessary and handle pluralization, display the time as <code class="highlighter-rouge">%H:%M:%S</code>.*/
                                }  
                            </p>
                            <p>
                                <Button target="_blank" href={value.link}
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