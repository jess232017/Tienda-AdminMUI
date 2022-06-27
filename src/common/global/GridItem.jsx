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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderTwoTone';

//owned
import UriName from '@/common/global/UriName';
import useItem from '@/services/hooks/useItem';

const IconButton = styled(Button)({
    minWidth: 0,
    maxWidth: 35,
    maxHeight: 34.11,
    padding: '0.5rem 10px',
    ' svg': {
        fontSize: '1.28rem',
    },
});

const GridItem = ({ data }) => {
    const { id, name, image, price } = data;
    const { cart, isFavorite, actions } = useItem(data);
    const { handleAdd, handleEdit, handleRemove, handleFav } = actions;

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

                    {cart ? (
                        <Stack direction="row" spacing={2}>
                            <TextField
                                id="outlined-number"
                                value={cart.quantity}
                                label="Cantidad"
                                type="number"
                                pattern="[0-9]*"
                                fullWidth
                                size="small"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ inputProps: { min: 0, max: 10 } }}
                                onChange={handleEdit}
                            />

                            <IconButton onClick={handleRemove} variant="outlined" color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button size="small" fullWidth variant="outlined" onClick={handleAdd}>
                                Comprar
                            </Button>

                            <IconButton size="small" color="secondary" variant="outlined" onClick={handleFav}>
                                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Stack>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default GridItem;
