import React from 'react';

//control
import { Link } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

//icon
import InventoryIcon from '@mui/icons-material/InventoryOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ItemIcon from '@mui/icons-material/EmojiSymbolsOutlined';
import SaleIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import EmployeeIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import ClientIcon from '@mui/icons-material/SupervisorAccountOutlined';
import SupplierIcon from '@mui/icons-material/RecentActorsOutlined';
import LoteIcon from '@mui/icons-material/LocalConvenienceStoreOutlined';

const Counters = () => {
    return (
        <CarouselProvider
            infinite
            isPlaying
            totalSlides={8}
            visibleSlides={5}
            naturalSlideWidth={10}
            naturalSlideHeight={3.8}
            style={{ marginBottom: '1rem' }}
        >
            <Slider style={{ marginRight: '-20px' }}>
                <Slide index={0}>
                    <Counter title="Ventas" subtitle="180" icon={<SaleIcon htmlColor="white" sx={{ fontSize: '1.55rem' }} />} to="venta" />
                </Slide>
                <Slide index={1}>
                    <Counter
                        title="Stock Bajo"
                        subtitle="180"
                        icon={<WarningAmberIcon htmlColor="white" sx={{ fontSize: '1.55rem' }} />}
                        to="inventario"
                    />
                </Slide>
                <Slide index={2}>
                    <Counter
                        title="Productos"
                        subtitle="180"
                        icon={<ItemIcon htmlColor="white" sx={{ fontSize: '1.55rem' }} />}
                        to="producto"
                    />
                </Slide>
                <Slide index={3}>
                    <Counter title="Lotes" subtitle="180" icon={<LoteIcon htmlColor="white" sx={{ fontSize: '1.55rem' }} />} to="lote" />
                </Slide>
                <Slide index={4}>
                    <Counter
                        title="Inventarios"
                        subtitle="180"
                        icon={<InventoryIcon htmlColor="white" sx={{ fontSize: '1.55rem' }} />}
                        to="inventario"
                    />
                </Slide>
                <Slide index={5}>
                    <Counter
                        title="Clientes"
                        subtitle="180"
                        icon={<ClientIcon htmlColor="white" sx={{ fontSize: '1.55rem' }} />}
                        to="cliente"
                    />
                </Slide>
                <Slide index={6}>
                    <Counter
                        title="Proveedor"
                        subtitle="180"
                        icon={<SupplierIcon htmlColor="white" sx={{ fontSize: '1.55rem' }} />}
                        to="proveedor"
                    />
                </Slide>
                <Slide index={7}>
                    <Counter
                        title="Empleados"
                        subtitle="180"
                        icon={<EmployeeIcon htmlColor="white" sx={{ fontSize: '1.55rem' }} />}
                        to="empleado"
                    />
                </Slide>
            </Slider>
            <ButtonBack>chevron_left</ButtonBack>
            <ButtonNext>navigate_next</ButtonNext>
        </CarouselProvider>
    );
};

function Counter({ title, subtitle, icon, to = '/' }) {
    return (
        <Box sx={{ marginRight: '1rem' }}>
            <Link to={to}>
                <Paper sx={{ width: '100%', height: '5rem', p: 1.5, backgroundColor: 'primary.light' }} elevation={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-end" height="100%">
                        <Box display="flex" height="100%" justifyContent="space-between" flexDirection="column">
                            <Typography variant="h6" color="white">
                                {title}
                            </Typography>
                            <Typography variant="subtitle1" color="white">
                                {subtitle}
                            </Typography>
                        </Box>
                        {icon}
                    </Box>
                </Paper>
            </Link>
        </Box>
    );
}

export default Counters;
