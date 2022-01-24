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
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//owned
import UriName from '_@/common/global/UriName';
import Item from '../../services/context/class/Item'

const IconButton = styled(Button)({
    minWidth: 0,
    maxHeight:35.5,
    padding: '0.5rem 10px',
    ' svg':{
        fontSize: '1.28rem'
    },
})

const GridItem = ({productoId, descripcion, imagen, precioVenta}, carritoStore) => {
    const {carrito ,addItem, removeItem, editItem}  = carritoStore;

    const agregarItem = () =>{
        addItem(new Item(productoId, descripcion, precioVenta, 1, 5, imagen));
    }

    const exist = carrito.find(value => value.key === productoId);
    return ( 
        <div className="col">
            <Box component="article" m={1} display="flex">
                <Avatar 
                    variant="rounded"
                    alt={descripcion}
                    src={`data:image/jpeg;charset=utf-8;base64,${imagen}`}
                    sx={{ width: "92.5px", height: "92.5px" }}
                />
                <Box ml={2}>
                    <Box display="flex" flexDirection="column">
                        <UriName uri={`/producto?productoId=${productoId}`}>
                            {descripcion}
                        </UriName>

                        <p className="mb-2">C${precioVenta}</p> 
                    </Box>

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
            </Box>
        </div>
    );
}
 
export default GridItem;
