import React, { useState } from 'react';

//controls
import { show } from '@ebay/nice-modal-react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';

//own
import NewNote from './NewNote';
import SelectUser from './SelectUser';
import SelectedItem from './SelectedItem';
import NoData from '@/pages/error/NoData';
import useCarrito from '@/services/context/carrito';
import FormPayment from '@/components/forms/FormPayment';

const cancelData = {
    title: 'Acción permanente ⚠️',
    description: '¿Seguro que quiere eliminar los productos agregados al carrito?',
    cancellationText: 'No, Cancelar',
    confirmationText: 'Eliminar Todo',
    confirmationButtonProps: {
        color: 'error',
        startIcon: <HighlightOffIcon />,
    },
};

const CustonSpan = styled('span')({
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    display: 'inline-block',
    margin: '0 5px 0 5',
    textAlign: 'center',
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

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
    const [note, setNote] = useState('');
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
            note,
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
            setNote('');
            nukeItems();
            setClient({});
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
                    <Typography component="dt" variant="subtitle1">
                        Impuesto:
                    </Typography>
                    <Typography component="dd" variant="subtitle2">
                        5%
                    </Typography>
                </Box>
                <Box component="dl" sx={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography component="dt" variant="subtitle1">
                        Descuento:
                    </Typography>
                    <Typography component="dd" variant="subtitle2">
                        0%
                    </Typography>
                </Box>
                <Box component="dl" sx={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography component="dt" variant="subtitle1">
                        Subtotal:
                    </Typography>
                    <Typography component="dd" variant="subtitle2">
                        C$ {total.toFixed(2)}
                    </Typography>
                </Box>
                <Box component="dl" sx={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography component="dt" variant="subtitle1">
                        Total:
                    </Typography>
                    <Typography component="dd" variant="subtitle2">
                        C$ {(total + total * 0.5).toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>

            <CardActions>
                <div id="order-button" className="grid">
                    <Button size="small" variant="outlined" endIcon={<HighlightOffIcon />} onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => show(SelectUser, { client, setClient })}
                        endIcon={client?.label != null ? <AssignmentIndIcon /> : <PersonAddAltIcon />}
                    >
                        <CustonSpan>{client?.label || 'Cliente'}</CustonSpan>
                    </Button>
                    <Button size="small" variant="outlined" onClick={handlePayment} endIcon={<AccountBalanceWalletIcon />}>
                        Cobrar
                    </Button>
                    <Button size="small" variant="outlined" onClick={handleWait} endIcon={<HourglassTopIcon />}>
                        Esperar
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => show(NewNote, { note, setNote })}
                        endIcon={<CommentOutlinedIcon />}
                    >
                        Comentario
                    </Button>
                </div>
            </CardActions>
        </Box>
    );
};

export default Selecionado;
