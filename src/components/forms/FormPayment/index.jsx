import React, { useState } from 'react'

import { toast } from 'react-toastify';
import NiceModal from '@ebay/nice-modal-react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
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
import TabPanel from './TabPanel';
import PanelCash from './PanelCash';
import PanelCredit from './PanelCredit';
import FormDialog from '_@/common/FormDialog';
import api from '_@/services/api/tasks/ApiOrder';
import useCarrito from '_@/services/context/carrito';
import { Tabs, Tab } from './Tab';

const FormPayment = NiceModal.create(({ data }) => {
    const [paid, setPaid] = useState(0)
    const [index, setIndex] = useState(0);
    const { nukeItems } = useCarrito();

    const total = data.total || 0;
    const qty = data.details.length || 0;
    const title = "C$" + total + " = $" + (total / 35).toFixed(2);

    const { isLoading, mutateAsync } = api.addAll();

    const onSubmit = () => {
        //data.status = "Pagado";
        data.status = 1;
        data.paidWith = paid;
        console.log(data);

        toast.promise(mutateAsync(data), {
            pending: 'Guardando los cambios...',
            success: {
                render() {
                    nukeItems();
                    return "Guardado correctamente";
                }
            },
            error: {
                render({ data }) {
                    console.log(JSON.stringify(data.response));
                    const error = data?.response?.data?.error;
                    return error?.message || data?.message;
                }
            }
        });
    };

    const handleChange = (_, newValue) => {
        setIndex(newValue);
    }

    return (
        <FormDialog
            title="Realizar pago"
            callback={onSubmit}
            footerControl={false}
            processing={isLoading}
        >
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={1} sm={1} md={2}>
                    <Typography variant="h2" align="center">{title}</Typography>
                    <Box mt={2} sx={{ width: '100%', bgcolor: 'background.paper', border: "2px solid #eee" }}>
                        <Tabs
                            centered
                            value={index}
                            variant="fullWidth"
                            onChange={handleChange}
                            aria-label="Metodos de pago"
                        >
                            <Tab label="Efectivo" icon={<PaymentsIcon />} iconPosition="start" />
                            <Tab label="Tarjeta" icon={<CreditCardIcon />} iconPosition="start" />
                            <Tab label="Gift Card" icon={<CardGiftcardIcon />} disabled iconPosition="start" />
                            <Tab label="Paypal" icon={<SavingsIcon />} disabled iconPosition="start" />
                        </Tabs>
                        <Divider />
                        <TabPanel value={index} index={0}>
                            <PanelCash total={total} set={setPaid} />
                        </TabPanel>
                        <TabPanel value={index} index={1}>
                            <PanelCredit total={total} />
                        </TabPanel>
                        <TabPanel value={index} index={2}>
                            <Stack spacing={2} p={4} sx={{ margin: '0 auto', maxWidth: '320px' }}>
                                <div className='input-style'>
                                    <label htmlFor="paid-width">Efectivo</label>
                                    <input type="number" placeholder="Efectivo" />
                                </div>
                                <div className='input-style'>
                                    <label htmlFor="paid-width">Dolares</label>
                                    <input type="number" placeholder="Dolares" />
                                </div>
                                <Divider />
                                <div className='input-style'>
                                    <label htmlFor="paid-width">Restante</label>
                                    <input type="number" placeholder="Restante" />
                                </div>
                            </Stack>
                        </TabPanel>
                    </Box>
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                    <Stack spacing={2} mt={2}>
                        <Button variant="contained" shadow={false} fullWidth
                            endIcon={<PrintIcon />}
                            onClick={onSubmit}
                        >
                            Cobrar e imprimir
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth
                            endIcon={<CreditCardIcon />}
                            onClick={onSubmit}
                        >
                            Solo Cobrar
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth
                            endIcon={<CommentIcon />}
                        >
                            Agregar Nota
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth
                            endIcon={<CancelIcon />}
                        >
                            Cancelar
                        </Button>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Typography variant="h5">Total de Articulos</Typography>
                            <Typography variant="h6">{qty}</Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </FormDialog>
    )
});

export default FormPayment;