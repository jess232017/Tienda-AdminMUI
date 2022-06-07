import React, { useState } from 'react';

//controls
import { show } from '@ebay/nice-modal-react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useConfirm } from 'material-ui-confirm';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

//icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';

//own
import NewNote from './NewNote';
import SelectUser from './SelectUser';
import SelectedItem from './SelectedItem';
import NoData from '@/pages/error/NoData';
import useCarrito from '@/services/context/carrito';
import FormPayment from '@/components/forms/FormPayment';
import { cancelData } from './data';

const fnActions = ({ id }) => {
    const { removeItem } = useCarrito();
    return [
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
                removeItem(id);
            }}
        />,
    ];
};

const columns = [
    { field: 'name', headerName: 'Producto', flex: 1, renderCell: SelectedItem },
    {
        field: 'quantity',
        headerName: 'Cantidad',
        width: 100,
        editable: true,
        type: 'number',
        preProcessEditCellProps: (params) => ({ ...params.props, error: parseInt(params.props.value) < 1 }),
    },
    { field: 'acciones', type: 'actions', headerName: 'Acciones', width: 100, getActions: fnActions },
];

const Selecionado = ({ vendorId }) => {
    const confirm = useConfirm();
    const [client, setClient] = useState({});
    const [note, setNote] = useState({ note: '' });
    const { carrito, editItem, nukeItems } = useCarrito();

    const total = carrito.reduce((prev, current) => prev + current.price * current.quantity, 0);

    //show Payment Dialog
    const handlePayment = async () => {
        if (Object.values(carrito).length < 1) {
            alert('Debe haber al menos un producto');
            return;
        }

        show(FormPayment, {
            clientId: client.value,
            vendorId,
            ...note,
            total,
            totalItems: carrito?.length || 0,
        });
    };

    //handle with edit quantity of item
    const handleEdit = ({ value, id }) => {
        editItem(id, value);
    };

    //delete all selected item
    const handleCancel = () => {
        confirm(cancelData).then(() => {
            nukeItems();
        });
    };

    //add order in waiting list
    const handleWait = () => {
        //alert(JSON.stringify(structData()));
    };

    return (
        <Box height="100%">
            <CardHeader
                sx={{ py: 2.66 }}
                title="Ticket {0}"
                action={
                    <Box display="flex">
                        <IconButton aria-label="wait" onClick={handleWait}>
                            <HourglassTopIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleCancel}>
                            <HighlightOffIcon />
                        </IconButton>
                    </Box>
                }
            />
            <Divider />

            <div style={{ display: 'flex', height: '310px', padding: '7px' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        onCellEditCommit={handleEdit}
                        getRowId={(row) => row.id}
                        columns={columns}
                        rows={carrito}
                        hideFooter
                        components={{
                            NoRowsOverlay: NoData,
                        }}
                    />
                </div>
            </div>

            <Divider />
            <CardContent sx={{ padding: '12px' }}>
                <Box component="dl" sx={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                    <dt>
                        <Typography variant="subtitle1">Impuesto:</Typography>
                    </dt>
                    <dd className="">
                        <Typography variant="subtitle2">5%</Typography>
                    </dd>
                </Box>
                <Box component="dl" sx={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                    <dt>
                        <Typography variant="subtitle1">Descuento:</Typography>
                    </dt>
                    <dd className="">
                        <Typography variant="subtitle2">0%</Typography>
                    </dd>
                </Box>
                <Box component="dl" sx={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                    <dt>
                        <Typography variant="subtitle1">Subtotal:</Typography>
                    </dt>
                    <dd className="">
                        <Typography variant="subtitle2">C$ {total.toFixed(2)}</Typography>
                    </dd>
                </Box>
                <Box component="dl" sx={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                    <dt>
                        <Typography variant="subtitle1">Total:</Typography>
                    </dt>
                    <dd className="">
                        <Typography variant="subtitle2">C$ {(total + total * 0.5).toFixed(2)}</Typography>
                    </dd>
                </Box>
            </CardContent>

            <CardActions>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4}>
                            <Button size="small" fullWidth variant="outlined" endIcon={<HighlightOffIcon />} onClick={handleCancel}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Button fullWidth size="small" variant="outlined" onClick={handleWait} endIcon={<HourglassTopIcon />}>
                                Esperar
                            </Button>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Button
                                fullWidth
                                size="small"
                                variant="outlined"
                                onClick={handlePayment}
                                endIcon={<AccountBalanceWalletIcon />}
                            >
                                Cobrar
                            </Button>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <SelectUser value={client} set={setClient} />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <NewNote value={note} set={setNote} />
                        </Grid>
                    </Grid>
                </Box>
            </CardActions>
        </Box>
    );
};

export default Selecionado;
