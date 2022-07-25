import React from 'react'

import { Box, Grid, IconButton, Toolbar, AppBar } from '@mui/material'
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone'

import SearchSection from './section/SearchSection'
import Customization from './section/Customization'
import ProfileSection from './section/ProfileSection'
import NotificationSection from './section/NotificationSection'

import logo from '@/assets/img/tienda.png'
import { drawerWidth } from '@/services/constant'

const Header = ({ drawerToggle }) => {
    return (
        <AppBar position='fixed' sx={{ zIndex: { xs: 1000, md: 1201 } }}>
            <Toolbar>
                <Box width={drawerWidth}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Grid item sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box mt={0.5}>
                                <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                                    <img src={logo} alt='Logo' height='35' />
                                    <span style={{ fontWeight: '700', maxWidth: '100px' }}>Abarroteria San Jose</span>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item>
                            <IconButton
                                sx={{ mr: 1.25 }}
                                edge='start'
                                color='inherit'
                                aria-label='open drawer'
                                onClick={drawerToggle}>
                                <MenuTwoToneIcon sx={{ fontSize: '1.5rem' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1 }} />

                <SearchSection theme='light' />
                <Customization />
                <NotificationSection />
                <ProfileSection />
            </Toolbar>
        </AppBar>
    )
}

export default Header
