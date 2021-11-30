import React from 'react';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    border: '1px solid rgba(51, 102, 255, 0.5)',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        border: '1px solid ' + theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
    },
    marginLeft: 1,
    width: '100%',
    maxHeight: '36.67px',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    borderColor: theme.palette.primary.main,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        color: theme.palette.primary.main,
        fontWeigth: '800',
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

const Search = () => {
    return ( 
        <SearchWrapper>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Buscar..."
                inputProps={{ 'aria-label': 'search' }}
            />
        </SearchWrapper>
    );
}
 
export default Search;