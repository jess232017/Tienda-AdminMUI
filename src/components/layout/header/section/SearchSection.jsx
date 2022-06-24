import React from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';

import { Button, InputBase, Popper, Fade, Card, CardContent, Grid } from '@mui/material';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    width: 'auto',

    [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        color: theme.palette.grey[100],
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const PopperContainer = styled(Popper)({
    zIndex: 1100,
    width: '100%',
    top: '10px !important',
    padding: '0',
});

const CustCard = styled(Card)(({ theme }) => ({
    borderRadius: 0,
    background: theme.palette.primary[200],
    [theme.breakpoints.down('sm')]: {
        border: 0,
        boxShadow: 'none',
    },
}));

const CustCardContent = styled(CardContent)(({ theme }) => ({
    padding: '12px !important',
    backgroundColor: theme.palette.secondary.main,
}));

const MobileIconWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: theme.palette.grey[100],
    padding: theme.spacing(1.25),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchSection = () => {
    const { t } = useTranslation();
    return (
        <Search>
            <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <React.Fragment>
                            <Button aria-haspopup="true" {...bindToggle(popupState)} color="inherit" sx={{ minWidth: { xs: '35px' } }}>
                                <SearchTwoToneIcon sx={{ fontSize: '1.5rem' }} />
                            </Button>
                            <PopperContainer
                                {...bindPopper(popupState)}
                                transition
                                popperOptions={{
                                    modifiers: [
                                        {
                                            name: 'Search',
                                            enabled: true,
                                            phase: 'main',
                                            options: {
                                                offset: {
                                                    enable: true,
                                                    offset: '0px, 10px',
                                                },
                                                preventOverflow: {
                                                    padding: 0,
                                                },
                                            },
                                            fn({ state }) {
                                                if (state.placement === 'top') {
                                                    console.log('Popper is on the top');
                                                }
                                            },
                                        },
                                    ],
                                }}
                            >
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <CustCard>
                                            <CustCardContent>
                                                <Grid container alignItems="center" justify="space-between">
                                                    <Grid item xs>
                                                        <Box display="flex" p={0}>
                                                            <MobileIconWrapper sx={{ color: 'text.secondary' }}>
                                                                <SearchTwoToneIcon color="inherit" />
                                                            </MobileIconWrapper>
                                                            <StyledInputBase
                                                                fullWidth
                                                                placeholder="Buscar..."
                                                                inputProps={{ 'aria-label': 'buscar' }}
                                                            />
                                                            <MobileIconWrapper {...bindToggle(popupState)}>
                                                                <CloseTwoToneIcon color="inherit" />
                                                            </MobileIconWrapper>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </CustCardContent>
                                        </CustCard>
                                    </Fade>
                                )}
                            </PopperContainer>
                        </React.Fragment>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
                <SearchIconWrapper>
                    <SearchTwoToneIcon color="inherit" />
                </SearchIconWrapper>
                <StyledInputBase placeholder={t('sidebar.search')} inputProps={{ 'aria-label': 'search' }} />
            </Box>
        </Search>
    );
};

export default SearchSection;
