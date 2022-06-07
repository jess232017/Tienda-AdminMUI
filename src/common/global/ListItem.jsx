import React from 'react';

import styled from '@mui/system/styled';

//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Image from 'mui-image';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

//icon
import CategoryIcon from '@mui/icons-material/Category';
import LocalMallIcon from '@mui/icons-material/LocalMallTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteTwoTone';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderTwoTone';

//owned
import UriName from '@/common/global/UriName';
import Item from '../../services/context/class/Item';

const IconButton = styled(Button)({
    minWidth: 0,
    maxHeight: 35.5,
    padding: '0.5rem 10px',
    ' svg': {
        fontSize: '1.28rem',
    },
});

const ListItem = ({ data, store, width }) => {
    const { id, name, image, price } = data;
    const { carrito, addItem, removeItem, editItem } = store;
    let mobile = width < 555;

    const agregarItem = () => {
        addItem(new Item(id, name, price, 1, 5, image));
    };

    const exist = carrito.find((value) => value.id === id);

    return (
        <Box
            sx={{
                marginBottom: 1,
                boxShadow: '0 1px 2px rgb(51 51 51 / 7%)',
                border: '1px solid rgba(81,88,94,.12)',
                borderRadius: '.35rem',
                ':hover': {
                    boxShadow: '0 3px 10px rgb(51 51 51 / 10%)',
                    transition: '.2s',
                },
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={mobile ? 12 : 8}>
                    <Box display="flex" flexDirection={`${mobile ? 'column' : 'row'}`}>
                        <Image
                            style={{}}
                            width={mobile ? '100%' : '70%'}
                            height={mobile ? '100%' : '100%'}
                            alt={name}
                            //errorIcon={<CategoryIcon />}
                            fit="cover"
                            errorIcon={true}
                            src={image}
                        />
                        <Box p={2} display="flex" flexDirection=" column">
                            <UriName uri={`/producto?id=${id}`}>{name}</UriName>
                            <Typography variant="subtitle2">
                                Take it as demo specs, ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum dolor sit amet...
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={mobile ? 12 : 4}>
                    <Grid
                        component="aside"
                        sx={{
                            height: '100%',
                            padding: '1.25rem 1.25rem',
                            borderLeft: '1px solid #dee2e6',
                        }}
                    >
                        <Box display="flex" justifyContent="flex-end">
                            <Typography variant="h5">C$ {price} </Typography>
                            <Typography component="del" variant="subtitle1" ml={0.5}>
                                C$ 198
                            </Typography>
                        </Box>
                        <br />
                        {exist != null ? (
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    id="outlined-number"
                                    value={exist.quantity}
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
                                        editItem(exist.id, value);
                                        console.log(value);
                                    }}
                                />

                                <IconButton onClick={() => removeItem(exist.id)} variant="outlined" color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        ) : (
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                                <Button variant="outlined" fullWidth={true} startIcon={<LocalMallIcon />} onClick={() => agregarItem()}>
                                    Comprar
                                </Button>

                                <IconButton color="secondary" variant="outlined">
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ListItem;
