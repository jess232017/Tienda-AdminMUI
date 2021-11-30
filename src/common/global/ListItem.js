import React from 'react';
import {Link} from "react-router-dom";

import styled from '@mui/system/styled';

//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//icon
import FavoriteIcon from '@mui/icons-material/FavoriteOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//owned
import UriName from 'src/common/global/UriName';
import Item from '../../services/context/class/Item'

const IconButton = styled(Button)({
    minWidth: 0,
    maxHeight:35.5,
    padding: '0.5rem 10px',
    ' svg':{
        fontSize: '1.28rem'
    },
})

const ListItem = ({productoId, descripcion, imagen, precioVenta}, carritoStore) => {
    const {carrito ,addItem, removeItem, editItem}  = carritoStore;

    const agregarItem = () =>{
        addItem(new Item(productoId, descripcion, precioVenta, 1, 5, imagen));
    }

    const exist = carrito.find(value => value.key === productoId);

    return ( 
        <Box m={1}>
            <Card variant="outlined">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
                        <Grid item xs={1} sm={2} md={2}>
                            <Avatar 
                                variant="square"
                                alt={descripcion}
                                src={`data:image/jpeg;charset=utf-8;base64,${imagen}`}
                                sx={{ width: {xs: '100%', sm: '128px'}, height: "100%"}}
                            />    
                        </Grid>

                        <Grid item xs={true} sm={true} md={true}>
                            <Box p={2} display="flex" flexDirection="column">
                                <UriName uri={`/producto?productoId=${productoId}`}>
                                    {descripcion}
                                </UriName>

                                <Link to={`/producto?productoId=${productoId}`} className="h5 title d-none">{descripcion}</Link>
                                <p> Take it as demo specs, ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum dolor sit amet...</p>
                            </Box>
                        </Grid>

                        <Grid item xs={1} sm={4} md={4}>
                            <Box p={2}>
                                <Box display="flex" justifyContent="flex-end">
                                    <span className="price h5">C$ {precioVenta} </span>  
                                    <del className="price-old">C$ 198</del>
                                </Box>
                                <br />
                                {(exist != null) ?
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            id="outlined-number"
                                            value={exist.cantidad}
                                            label="Cantidad"
                                            type="number"
                                            pattern="[0-9]*"
                                            size="small"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth={true}
                                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                                            onChange={(e) => {
                                                var value = parseInt(e.target.value, 10);
                                                editItem(exist.key, value);
                                                console.log(value);
                                            }}
                                        />

                                        <IconButton
                                            onClick={(e) => removeItem(e, exist.key)}
                                            variant="outlined"
                                            color="error"
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Stack>
                                :
                                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                                        <Button
                                            variant="outlined"
                                            fullWidth={true}
                                            startIcon={<LocalMallIcon/>}
                                            onClick={() => agregarItem()}>
                                                Comprar
                                        </Button>
                                            
                                        <IconButton
                                            color="secondary"
                                            variant="outlined"
                                        >
                                            <FavoriteBorderIcon/>
                                        </IconButton>
                                    </Stack>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Card> 
        </Box>
    );
}
 
export default ListItem;