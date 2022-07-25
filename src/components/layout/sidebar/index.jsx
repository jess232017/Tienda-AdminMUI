import React from 'react'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/styles'
import SimpleBar from 'simplebar-react'
import { useMediaQuery, Divider, Drawer, Toolbar } from '@mui/material'

import MenuList from './menuList/MenuList'

import logo from '@/assets/img/tienda.png'
import { drawerWidth } from '@/services/constant'

const MainLayout = ({ drawerOpen, drawerToggle }) => {
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Box
            component='nav'
            aria-label='mailbox folders'
            sx={{ width: { xs: 0, md: `${drawerWidth}px` }, flexShrink: { xs: 1, md: 0 } }}>
            <Drawer
                anchor='left'
                open={drawerOpen}
                onClose={drawerToggle}
                ModalProps={{ keepMounted: true }}
                classes={{ paper: 'drawer-paper-light' }}
                variant={matchUpMd ? 'persistent' : 'temporary'}>
                <Toolbar sx={{ display: { xs: 'flex', md: 'none' }, gap: 2, backgroundColor: 'primary.main' }}>
                    <img src={logo} alt='Logo' height='35' />
                    <span style={{ fontWeight: '700', color: '#fff' }}>Abarroteria San Jose</span>
                </Toolbar>
                <SimpleBar
                    style={{
                        height: 'calc(100vh - 65px)',
                        padding: '.8rem',
                        borderRight: '1px dashed rgba(145, 158, 171, 0.24)',
                    }}>
                    <MenuList />
                </SimpleBar>
            </Drawer>
        </Box>
    )
}
//background: linear-gradient(75deg, rgba(22, 28, 36, 0.48) 0%, rgb(22, 28, 36) 100%);

export default MainLayout
