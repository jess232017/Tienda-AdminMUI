import React from 'react'

//control
import { Link } from 'react-router-dom'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

//icon
import InventoryIcon from '@mui/icons-material/InventoryOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ItemIcon from '@mui/icons-material/EmojiSymbolsOutlined'
import SaleIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import EmployeeIcon from '@mui/icons-material/SupervisedUserCircleOutlined'
import ClientIcon from '@mui/icons-material/SupervisorAccountOutlined'
import SupplierIcon from '@mui/icons-material/RecentActorsOutlined'
import LoteIcon from '@mui/icons-material/LocalConvenienceStoreOutlined'

const Counters = () => {
    return (
        <div>
            <CarouselProvider
                infinite
                isPlaying
                totalSlides={8}
                visibleSlides={3}
                naturalSlideWidth={16}
                naturalSlideHeight={6}>
                <Slider style={{ marginRight: '-20px' }}>
                    <Slide index={0}>
                        <Counter
                            title='Ventas'
                            subtitle='180'
                            icon={<SaleIcon htmlColor='white' sx={{ fontSize: '1.55rem' }} />}
                            to='venta'
                        />
                    </Slide>
                    <Slide index={1}>
                        <Counter
                            title='Stock Bajo'
                            subtitle='180'
                            icon={<WarningAmberIcon htmlColor='white' sx={{ fontSize: '1.55rem' }} />}
                            to='inventario'
                        />
                    </Slide>
                    <Slide index={2}>
                        <Counter
                            title='Productos'
                            subtitle='180'
                            icon={<ItemIcon htmlColor='white' sx={{ fontSize: '1.55rem' }} />}
                            to='producto'
                        />
                    </Slide>
                    <Slide index={3}>
                        <Counter
                            title='Lotes'
                            subtitle='180'
                            icon={<LoteIcon htmlColor='white' sx={{ fontSize: '1.55rem' }} />}
                            to='lote'
                        />
                    </Slide>
                    <Slide index={4}>
                        <Counter
                            title='Inventarios'
                            subtitle='180'
                            icon={<InventoryIcon htmlColor='white' sx={{ fontSize: '1.55rem' }} />}
                            to='inventario'
                        />
                    </Slide>
                    <Slide index={5}>
                        <Counter
                            title='Clientes'
                            subtitle='180'
                            icon={<ClientIcon htmlColor='white' sx={{ fontSize: '1.55rem' }} />}
                            to='cliente'
                        />
                    </Slide>
                    <Slide index={6}>
                        <Counter
                            title='Proveedor'
                            subtitle='180'
                            icon={<SupplierIcon htmlColor='white' sx={{ fontSize: '1.55rem' }} />}
                            to='proveedor'
                        />
                    </Slide>
                    <Slide index={7}>
                        <Counter
                            title='Empleados'
                            subtitle='180'
                            icon={<EmployeeIcon htmlColor='white' sx={{ fontSize: '1.55rem' }} />}
                            to='empleado'
                        />
                    </Slide>
                </Slider>
                <ButtonBack>chevron_left</ButtonBack>
                <ButtonNext>navigate_next</ButtonNext>
            </CarouselProvider>
        </div>
    )
}

function Counter({ title, subtitle, icon, to = '/' }) {
    return (
        <Box sx={{ height: '100%', mr: '20px' }}>
            <Link to={to}>
                <Card
                    variant='outlined'
                    sx={{
                        width: '100%',
                        height: '100%',
                        p: 1.5,
                        px: 3,
                        backgroundColor: 'primary.light',
                        borderRadius: 2,
                    }}>
                    <Box display='flex' gap={2} alignItems='center' height='100%'>
                        <Box sx={{ backgroundColor: 'success.light', p: 0.8, pb: 0.2, borderRadius: 2 }}>{icon}</Box>
                        <Box display='flex' height='100%' gap={1} flexDirection='column'>
                            <Typography variant='h6' color='white'>
                                {title}
                            </Typography>
                            <Typography variant='subtitle1' color='white'>
                                {subtitle}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Link>
        </Box>
    )
}

export default Counters
