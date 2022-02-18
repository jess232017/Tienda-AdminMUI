import React from 'react';

import styled from '@mui/system/styled';
import useResizeObserver from "use-resize-observer";

//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

//icon
import LocalMallIcon from '@mui/icons-material/LocalMallOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//owned
import UriName from '_@/common/global/UriName';
import Item from '../../services/context/class/Item';

const IconButton = styled(Button)({
    minWidth: 0,
    maxHeight: 35.5,
    padding: '0.5rem 10px',
    ' svg': {
        fontSize: '1.28rem'
    },
})

const ListItem = ({ data, store, width }) => {
    const { id, name, image, price } = data;
    const { carrito, addItem, removeItem, editItem } = store;
    let mobile = width < 555;

    const agregarItem = () => {
        addItem(new Item(id, name, price, 1, 5, image));
    }

    const exist = carrito.find(value => value.key === id);

    return (
        <Card variant="outlined" sx={{ m: 1 }}>
            <Grid container spacing={1} columns={mobile ? 1 : 3}>
                <Grid item xs={mobile ? 1 : 2}>
                    <Box display="flex" flexDirection={`${mobile ? 'column' : 'row'}`}>
                        <Avatar
                            variant="square"
                            alt={name}
                            src={`data:image/jpeg;charset=utf-8;base64,${image}`}
                            sx={{ width: `${mobile ? '100%' : '120px'}`, height: "120px" }}
                        />
                        <Box p={2} display="flex" flexDirection=" column">
                            <UriName uri={`/producto?id=${id}`}>
                                {name}
                            </UriName>
                            <Typography variant="subtitle2" >
                                Take it as demo specs, ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum dolor sit amet...
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={1}>
                    <Box p={2}>
                        <Box display="flex" justifyContent="flex-end">
                            <span className="price h5">C$ {price} </span>
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
                                    variant="outlined"
                                    fullWidth={true}
                                    startIcon={<LocalMallIcon />}
                                    onClick={() => agregarItem()}>
                                    Comprar
                                </Button>

                                <IconButton
                                    color="secondary"
                                    variant="outlined"
                                >
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </Stack>
                        }
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ListItem;
