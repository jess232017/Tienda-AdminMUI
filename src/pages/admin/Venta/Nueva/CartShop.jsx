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

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

//own
import NewNote from './NewNote';
import SelectUser from './SelectUser';
import SelectedItem from './SelectedItem';
import NoData from '_@/pages/error/NoData';
import useCarrito from '_@/services/context/carrito';
import FormPayment from '_@/components/forms/FormPayment';
import { cancelData } from './data';

const fnActions = ({ id }) => {
    const { removeItem } = useCarrito();
    return [
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => { removeItem(id) }}
        />,
    ];
}

const columns = [
    { field: 'nombre', headerName: 'Producto', flex: 1, renderCell: SelectedItem },
    {
        field: 'cantidad', headerName: 'Cantidad', width: 100, editable: true, type: 'number',
        preProcessEditCellProps: (params) => ({ ...params.props, error: parseInt(params.props.value) < 1 }),
    },
    { field: 'acciones', type: 'actions', headerName: 'Acciones', width: 100, getActions: fnActions },
];

const Selecionado = ({ vendorId }) => {
    const confirm = useConfirm();
    const [client, setClient] = useState({});
    const [note, setNote] = useState({ note: "" });
    const { carrito, editItem, nukeItems } = useCarrito();

    let total = 0;
    Object.values(carrito).forEach(value => total += value.precio * value.cantidad);

    //restructure data in order to make a request
    const structData = () => {
        return {
            id: new Date().getTime(),
            clientId: client.value,
            vendorId,
            addressId: 1,
            paymentMethodId: 2,
            total,
            paidWith: 0,
            ...note,
            status: "En espera",
            details: carrito.map(({ key, cantidad }) => {
                return { productId: key, quantity: cantidad, discount: 0 }
            }),
        }
    }

    //show Payment Dialog
    const handlePayment = () => {
        if (Object.values(carrito).length < 1) {
            alert("Debe haber al menos un producto")
            return;
        }

        const data = structData();
        show(FormPayment, { data })
    };

    //handle with edit quantity of item
    const handleEdit = ({ value, id }) => {
        editItem(id, value);
    }

    //delete all selected item
    const handleCancel = () => {
        confirm(cancelData).then(() => {
            nukeItems();
        })
    }

    //add order in waiting list
    const handleWait = () => {
        alert(JSON.stringify(structData()));
    }

    return (
        <Box height="100%">
            <CardHeader
                sx={{ py: 2.66 }}
                title="Ticket {0}"
                action={
                    <Box display="flex" >
                        <IconButton aria-label="wait" onClick={handleWait} >
                            <HourglassTopIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleCancel} >
                            <HighlightOffIcon />
                        </IconButton>
                    </Box>
                }
            />
            <Divider />

            <div style={{ display: 'flex', height: '50%', padding: '7px' }}>
                <div style={{ flexGrow: 1 }} >
                    <DataGrid
                        onCellEditCommit={handleEdit}
                        getRowId={row => row.key}
                        columns={columns}
                        rows={carrito}
                        hideFooter
                        components={{
                            NoRowsOverlay: NoData
                        }}
                    />
                </div>
            </div>

            <Divider />
            <CardContent sx={{ padding: '12px' }}>
                <Box component='dl' sx={{margin: 0, display: 'flex', justifyContent: 'space-between'}}>
                    <dt><Typography variant="subtitle1">Impuesto:</Typography></dt>
                    <dd className=''><Typography variant="subtitle2">5%</Typography></dd>
                </Box>
                <Box component='dl' sx={{margin: 0, display: 'flex', justifyContent: 'space-between'}}>
                    <dt><Typography variant="subtitle1">Descuento:</Typography></dt>
                    <dd className=''><Typography variant="subtitle2">0%</Typography></dd>
                </Box>
                <Box component='dl' sx={{margin: 0, display: 'flex', justifyContent: 'space-between'}}>
                    <dt><Typography variant="subtitle1">Subtotal:</Typography></dt>
                    <dd className=''><Typography variant="subtitle2">C$ {total.toFixed(2)}</Typography></dd>
                </Box>
                <Box component='dl' sx={{margin: 0, display: 'flex', justifyContent: 'space-between'}}>
                    <dt><Typography variant="subtitle1">Total:</Typography></dt>
                    <dd className=''><Typography variant="subtitle2">C$ {(total + (total * .5)).toFixed(2)}</Typography></dd>
                </Box>
            </CardContent>

            <CardActions>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4} >
                            <Button
                                size="small"
                                fullWidth
                                variant="outlined"
                                endIcon={<HighlightOffIcon />}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <Button
                                fullWidth
                                size="small"
                                variant="outlined"
                                onClick={handleWait}
                                endIcon={<HourglassTopIcon />}
                            >
                                Esperar
                            </Button>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
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
                        <Grid item xs={2} sm={4} md={4} >
                            <SelectUser
                                value={client}
                                set={setClient}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <NewNote
                                value={note}
                                set={setNote}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </CardActions>
        </Box>
    );
}

export default Selecionado;
