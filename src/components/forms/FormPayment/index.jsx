import React, { useState } from 'react';

import NiceModal, { useModal } from '@ebay/nice-modal-react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

//Icon
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/PaymentsTwoTone';
import CreditCardIcon from '@mui/icons-material/CreditCardTwoTone';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcardTwoTone';
import PrintIcon from '@mui/icons-material/Print';
import CancelIcon from '@mui/icons-material/Cancel';
import CommentIcon from '@mui/icons-material/Comment';

//Owned
import { Tabs, Tab } from './Tab';
import TabPanel from './TabPanel';
import PanelCash from './PanelCash';
import PanelCredit from './PanelCredit';
import Dialog from '@/common/Dialog';
import usePaymethod from '@/services/hooks/usePaymethod';

const FormPayment = NiceModal.create(({ clientId, vendorId, note, total, totalItems }) => {
    //modal handle
    const modal = useModal();
    const [index, setIndex] = useState(0);
    const { createInvoice } = usePaymethod();
    const [paidWith, setPaidWith] = useState(0);

    const title = `C$ ${total} = $ ${(total / 35).toFixed(2)}`;

    const onSubmit = async () => {
        await createInvoice('contado', paidWith, clientId, vendorId, null);
        modal.hide();
    };

    const handleChange = (_, newValue) => {
        setIndex(newValue);
    };

    return (
        <Dialog title="Realizar pago" maxWidth="md" modal={modal} fullWidth>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={1} sm={1} md={2}>
                    <Typography variant="h2" align="center">
                        {title}
                    </Typography>
                    <Box mt={2} sx={{ width: '100%', bgcolor: 'background.paper', border: '2px solid #eee' }}>
                        <Tabs centered value={index} variant="fullWidth" onChange={handleChange} aria-label="Metodos de pago">
                            <Tab label="Efectivo" icon={<PaymentsIcon />} iconPosition="start" />
                            <Tab label="Tarjeta" icon={<CreditCardIcon />} iconPosition="start" />
                            <Tab label="Gift Card" icon={<CardGiftcardIcon />} disabled iconPosition="start" />
                            <Tab label="Paypal" icon={<SavingsIcon />} disabled iconPosition="start" />
                        </Tabs>
                        <Divider />
                        <TabPanel value={index} index={0}>
                            <PanelCash total={total} set={setPaidWith} />
                        </TabPanel>
                        <TabPanel value={index} index={1}>
                            <PanelCredit total={total} />
                        </TabPanel>
                    </Box>
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                    <Stack spacing={2} mt={2}>
                        <Button variant="contained" shadow={false} fullWidth endIcon={<PrintIcon />} onClick={onSubmit}>
                            Cobrar e imprimir
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth endIcon={<CreditCardIcon />} onClick={onSubmit}>
                            Solo Cobrar
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth endIcon={<CommentIcon />}>
                            Agregar Nota
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth endIcon={<CancelIcon />}>
                            Cancelar
                        </Button>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Typography variant="h5">Total de Articulos</Typography>
                            <Typography variant="h6">{totalItems}</Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Dialog>
    );
});

export default FormPayment;
