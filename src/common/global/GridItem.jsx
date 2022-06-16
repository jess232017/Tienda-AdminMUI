import React from 'react';

import styled from '@mui/system/styled';

//mui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//icon
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';

//owned
import UriName from '@/common/global/UriName';
import Item from '../../services/context/class/Item';

const IconButton = styled(Button)({
    minWidth: 0,
    maxWidth: 35,
    maxHeight: 34.11,
    padding: '0.5rem 10px',
    ' svg': {
        fontSize: '1.28rem',
    },
});

const GridItem = ({ data, store }) => {
    const { id, name, image, price } = data;
    const { carrito, addItem, removeItem, editItem } = store;

    const agregarItem = () => {
        addItem(new Item(id, name, price, 1, 5, image));
    };

    const exist = carrito.find((value) => value.id === id);

    return (
        <Box
            component="article"
            display="flex"
            sx={{
                padding: '.8rem',
                borderRadius: '.35rem',
                border: '1px solid #dee2e6',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                }}
            >
                <Avatar variant="rounded" alt={name} src={image} sx={{ width: '70px', height: '70px', border: '1px solid #dee2e6' }}>
                    <ImageTwoToneIcon />
                </Avatar>
                <Box ml={1} width="100%" display="flex" flexDirection="column">
                    <UriName uri={`/producto?id=${id}`}>{name}</UriName>
                    <Typography variant="subtitle" mb={1}>
                        C$ {price}
                    </Typography>

                    {exist != null ? (
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="outlined-number"
                                value={exist.quantity}
                                label="Cantidad"
                                type="number"
                                pattern="[0-9]*"
                                fullWidth
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ inputProps: { min: 0, max: 10 } }}
                                onChange={(e) => {
                                    var value = parseInt(e.target.value, 10);
                                    editItem(exist.id, value);
                                }}
                            />

                            <IconButton onClick={() => removeItem(exist.id)} variant="outlined" color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button size="small" fullWidth variant="outlined" onClick={() => agregarItem()}>
                                Comprar
                            </Button>

                            <IconButton size="small" color="secondary" variant="outlined" disabled={true}>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Stack>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default GridItem;
