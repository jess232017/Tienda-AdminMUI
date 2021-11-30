import React from 'react'

import { useForm } from "react-hook-form";
import NiceModal from '@ebay/nice-modal-react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

//Icon
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentsIcon from '@mui/icons-material/Payments';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PrintIcon from '@mui/icons-material/Print';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CancelIcon from '@mui/icons-material/Cancel';
import CommentIcon from '@mui/icons-material/Comment';

//Owned
import {Input, Select} from 'src/common/global/control/index';
import FormDialog from 'src/common/FormDialog';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <>
            {children}
          </>
        )}
      </div>
    );
  }
  

const FormPago = NiceModal.create( ({title, method, data: source, queryKey}) =>{
    const { handleSubmit, reset, control } = useForm();
    const [value, setValue] = React.useState(0);

    const onSubmit = (data) => console.log(data);
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <FormDialog
            title= {title}
            data = {source}
            callback= {onSubmit}
            footerControl={false}
        >
            <Grid container spacing={{xs: 1, md: 2}} columns={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={1} sm={1} md={2}>
                    <Typography variant="h2" align="center">C$ 1,280</Typography>
                    <Box mt={2} sx={{ width: '100%', bgcolor: 'background.paper', border: "2px solid #eee" }}>
                        <Tabs value={value} onChange={handleChange}  variant="fullWidth">
                            <Tab sx={{minHeight:55,}} label="Efectivo" icon={<PaymentsIcon/>} iconPosition="start"/>
                            <Tab sx={{minHeight:55,}} label="Dolares" icon={<MonetizationOnIcon/>} iconPosition="start"/>
                            <Tab sx={{minHeight:55,}} label="Mixto" icon={<SavingsIcon/>} iconPosition="start"/>
                        </Tabs>
                        <Divider/>
                        <TabPanel value={value} index={0}>
                            <Stack spacing={2} p={4} sx={{margin: '0 auto', maxWidth: '320px'}}>
                                <Input name="" label="Pago con" control={control} />
                                <Input name="" label="Su cambio" control={control} />
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Stack spacing={2} p={4} sx={{margin: '0 auto', maxWidth: '320px'}}>
                                <Input name="" label="Pago con" control={control} />
                                <Input name="" label="Equivalente a" control={control} />
                                <Input name="" label="Cambio en Peso" control={control} />
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Stack spacing={2} p={4} sx={{margin: '0 auto', maxWidth: '320px'}}>
                                <Input name="" label="Efectivo" control={control} />
                                <Input name="" label="Dolares" control={control} />
                                <Divider/>
                                <Input name="" label="Restante" control={control} />
                            </Stack>
                        </TabPanel>
                    </Box>
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                    <Stack spacing={2} mt={2}>
                        <Button variant="contained" shadow={false} fullWidth
                            endIcon={<PrintIcon/>}
                        >
                            Cobrar e imprimir
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth
                            endIcon={<CreditCardIcon/>}
                        >
                            Solo Cobrar
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth
                            endIcon={<CommentIcon/>}
                        >
                            Agregar Nota
                        </Button>
                        <Button variant="contained" shadow={false} fullWidth
                            endIcon={<CancelIcon/>}
                        >
                            Cancelar
                        </Button>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Typography variant="h5">Total de Articulos</Typography>
                            <Typography variant="h6">12</Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </FormDialog>
    )
});

export default FormPago;
