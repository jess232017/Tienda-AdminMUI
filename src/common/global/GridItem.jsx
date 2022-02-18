import React from 'react';

import styled from '@mui/system/styled';

//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//icon
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//owned
import UriName from '_@/common/global/UriName';
import Item from '../../services/context/class/Item'

const IconButton = styled(Button)({
    minWidth: 0,
    maxHeight: 34.11,
    padding: '0.5rem 10px',
    ' svg': {
        fontSize: '1.28rem'
    },
})

const GridItem = ({ data, store, width }) => {
    const { id, name, image, price } = data;
    const { carrito, addItem, removeItem, editItem } = store;

    const agregarItem = () => {
        addItem(new Item(id, name, price, 1, 5, image));
    }

    const exist = carrito.find(value => value.key === id);

    return (
        <Grid item flexGrow={1}>
            <Box component="article" display="flex">
                <Avatar
                    variant="rounded"
                    alt={name}
                    src={`data:image/jpeg;charset=utf-8;base64,${image}`}
                    sx={{ width: "70px", height: "70px" }}
                />
                <Box ml={1} width="100%">
                    <Box display="flex" flexDirection="column">
                        <UriName uri={`/producto?id=${id}`}>
                            {name}
                        </UriName>
                        <Typography variant="caption" mb={1} >
                            C$ {price}
                        </Typography>
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
                                }}
                            />

                            <IconButton
                                onClick={() => removeItem(exist.key)}
                                variant="outlined"
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                        :
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                            <Button
                                size="small"
                                variant="outlined"
                                fullWidth={true}
                                onClick={() => agregarItem()}>
                                Comprar
                            </Button>

                            <IconButton
                                size="small"
                                color="secondary"
                                variant="outlined"
                                disabled={true}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Stack>
                    }
                </Box>
            </Box>
        </Grid>
    );
}

export default GridItem;
