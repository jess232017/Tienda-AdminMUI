import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/BookmarkTwoTone';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import Styled from '@mui/system/styled';
import Image from 'mui-image';

const Card = Styled('div')({
    boxShadow: '0 1px 2px rgb(51 51 51 / 7%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    wordWrap: 'break-word',
    backgroundColor: '#fff',
    backgroundClip: 'border-box',
    border: '1px solid rgba(81,88,94,.12)',
    borderRadius: '.35rem',
    marginRight: '20px',
});

const Price = Styled(Typography)({
    color: 'rgb(55, 125, 255)',
    lineHeight: 1.5,
    fontWeight: 700,
    fontSize: '1rem',
});

const RoundedButton = Styled(IconButton)({
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    padding: 5,
    backgroundColor: '#ffffff',
    '&:hover': {
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    color: 'rgb(47, 106, 217)',
    right: '10px',
    top: '10px',
    position: 'absolute',
});

const TopItem = ({ id, image, name, category, categoryId, price }) => {
    return (
        <Card>
            <Box position="relative">
                <Image
                    component="img"
                    height={220}
                    alt={name}
                    errorIcon={true}
                    sx={{ background: '#fff', borderRadius: '.25rem .25rem 0 0' }}
                    src={image || ''}
                />
                <RoundedButton>
                    <BookmarkIcon />
                </RoundedButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem 1.2rem',
                }}
            >
                {/*<Typography component={Link} to={`/store/catalogo?id=${categoryId}`} gutterBottom variant="subtitle1">
                    {category}
                </Typography>*/}
                <Typography component={Link} to={`/store/catalogo/producto?id=${id}`} gutterBottom variant="h5">
                    {name}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #dee2e6',
                    padding: '1rem 1.2rem',
                }}
            >
                <Price>C$ {price}</Price>
                <Button variant="contained" disableElevation size="large" endIcon={<LocalMallIcon />}>
                    Comprar
                </Button>
            </Box>
        </Card>
    );
};

export default TopItem;
