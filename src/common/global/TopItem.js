import * as React from 'react';
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import Styled from '@mui/system/styled';


const Price = Styled(Typography)({
    color: 'rgb(55, 125, 255)',
    lineHeight: 1.5,
    fontWeight: 700,
    fontSize: '1rem',
});

const RoundedButton = Styled(IconButton)({
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    padding: 12,
    fontSize: "1.75rem",
    backgroundColor: "#ffffff",
    '&:hover': {
        color: "#ffffff",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    color: "rgb(47, 106, 217)",
})

const TopItem = ({ productoId, imagen, descripcion, precioVenta }) => {
    return (
        <Box >
            <Card variant="outlined">
                <Box position="relative">
                    <CardMedia
                        component="img"
                        alt={descripcion}
                        height="220"
                        sx={{ background: '#f7faff' }}
                        src={`data:image/jpeg;charset=utf-8;base64,${imagen}`}
                    />
                    <Box width="100%" top="1px" position="absolute" display="flex" p={2} justifyContent="flex-end">
                        <RoundedButton>
                            <FavoriteBorderIcon />
                        </RoundedButton>
                    </Box>
                </Box>
                <CardContent>
                    <Link to={`/producto?productoId=${productoId}`}>
                        <Typography gutterBottom variant="h5" component="div">
                            {descripcion}
                        </Typography>
                    </Link>

                    <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Price>C$ {precioVenta}</Price>
                        <Button variant="contained" size="large" leftIcon={<LocalMallIcon/>}>
                            Comprar
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>
    );
}




export default TopItem





/*
import React from 'react';
import { Link } from "react-router-dom";

import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Card = styled('div')({
    '&:hover': {
        boxShadow: '0 4px 15px rgb(153 153 153 / 30%)',
        transition: '0.3s',
    }
})

const GoLink = styled(Link)({
    textDecoration: 'none'
});

const TopItem = ({productoId, imagen, descripcion, precioVenta}) => {
    return (
        <Card className="card m-2">
            <GoLink to={`/producto?productoId=${productoId}`} className="img-wrap">
                <Avatar
                    variant="square"
                    alt={descripcion}
                    sx={{height: "220px", width: "220px"}}
                    src={`data:image/jpeg;charset=utf-8;base64,${imagen}`}/>
            </GoLink>
            <figcaption className="p-3">
                <GoLink to={`/producto?productoId=${productoId}`} className="title">
                    <Typography variant="h6">{descripcion}</Typography>
                </GoLink>
                <Typography>C$ {precioVenta}</Typography>
            </figcaption>
        </Card>
    );
}

export default TopItem;*/