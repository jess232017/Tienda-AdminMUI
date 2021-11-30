import React, { useEffect, useState } from 'react';

//Control
import { useModal } from '@ebay/nice-modal-react';
import { Scrollbars } from 'rc-scrollbars';

import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CardHeader from '@mui/material/CardHeader';

//Icon
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import thememain from 'src/services/themes/themes';


const FormDialog = ({title, callback, children, footerControl = true, processing = false}) => {
    const theme = useTheme();
    const modal = useModal();
    const phoneScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [fullScreen, setFullScreen] = useState(phoneScreen)

    useEffect(() => setFullScreen(phoneScreen), [phoneScreen])

    return ( 
        <>
            <CssBaseline />
            <ThemeProvider theme={thememain(false)}>
                <form onSubmit = {callback}>
                <Dialog 
                    open = {modal.visible} 
                    onClose= {modal.hide}
                    onExited = {modal.remove}
                    maxWidth="md"
                    fullWidth={true}
                    fullScreen={fullScreen}
                    sx={{' .MuiPaper-root': {borderRadius: {xs: 0, md: 3}}}}
                >
                        <DialogTitle sx={{p: 0}}>
                            {phoneScreen?
                                <AppBar sx={{ position: 'relative', display: {md: "none", xs: "block"}}}>
                                    <Toolbar>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={modal.hide}
                                            aria-label="close"
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                            {title}
                                        </Typography>
                                        <Button autoFocus color="inherit" onClick={modal.hide} type="submit">
                                            Guardar
                                        </Button>
                                    </Toolbar>
                                </AppBar>
                            :
                                <CardHeader sx={{ display: {md: "flex", xs: "none"}}}
                                    title={title}
                                    action={
                                        <Stack direction="row" spacing={1}>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={() => setFullScreen(!fullScreen)}
                                                aria-label="maximize"
                                            >
                                                {fullScreen ? <FullscreenExitIcon/>: <FullscreenIcon/>}
                                            </IconButton>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={modal.hide}
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Stack>
                                    }
                                />
                            }
                        </DialogTitle>

                        <DialogContent dividers={true} sx={{pt: 5, pb: 5}}>
                            {children}
                        </DialogContent>
                        
                        {footerControl &&
                            <DialogActions sx={{padding: '1rem'}}>
                                <LoadingButton
                                    variant="contained"
                                    sx={{boxShadow: "none",}}
                                    startIcon={<SaveIcon/>}
                                    type="submit"
                                    onClick={callback}
                                    loading={processing}
                                >
                                    Guardar
                                </LoadingButton>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={modal.hide}
                                    startIcon={<CloseIcon/>}
                                >
                                    Cancelar
                                </Button>
                            </DialogActions>
                        }
                </Dialog>
                </form>
            </ThemeProvider>
        </>
    );
}
 
export default FormDialog;
