import React, { useEffect, useState } from 'react';

//Control
import { useIsMutating } from 'react-query';
import { FormProvider } from 'react-hook-form';
import { muiDialog, useModal } from '@ebay/nice-modal-react';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Stack, AppBar, Button, Toolbar, IconButton, Typography } from '@mui/material';

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

const FormDialog = ({ title, callback, methods, children, footerControl = true, maxWidth = 'md', modal }) => {
    const isMutating = useIsMutating();

    const theme = useTheme();
    //const modal = useModal();
    const phoneScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [fullScreen, setFullScreen] = useState(phoneScreen);
    useEffect(() => setFullScreen(phoneScreen), [phoneScreen]);

    const handleClose = (event, reason) => {
        if (reason && reason == 'backdropClick') return;
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={callback}>
                <Dialog
                    fullWidth
                    maxWidth={maxWidth}
                    fullScreen={fullScreen}
                    {...muiDialog(modal)}
                    onClose={handleClose}
                    sx={{ ' .MuiPaper-root': { borderRadius: { xs: 0, md: 0 } } }}
                >
                    <DialogTitle sx={{ p: 0 }}>
                        {phoneScreen ? (
                            <AppBar sx={{ position: 'relative', display: { md: 'none', xs: 'block' } }}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={modal.hide} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        {title}
                                    </Typography>
                                    <Button autoFocus color="inherit" onClick={callback} type="submit">
                                        Guardar
                                    </Button>
                                </Toolbar>
                            </AppBar>
                        ) : (
                            <CardHeader
                                sx={{ display: { md: 'flex', xs: 'none' } }}
                                title={title}
                                action={
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={() => setFullScreen(!fullScreen)}
                                            aria-label="maximize"
                                        >
                                            {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                                        </IconButton>
                                        <IconButton edge="start" color="inherit" onClick={modal.hide} aria-label="close">
                                            <CloseIcon />
                                        </IconButton>
                                    </Stack>
                                }
                            />
                        )}
                    </DialogTitle>

                    <DialogContent dividers sx={{ pt: 5, pb: 5 }}>
                        {children}
                    </DialogContent>

                    {footerControl && (
                        <DialogActions sx={{ padding: '1rem' }}>
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                loading={isMutating === 1}
                                onClick={callback}
                                disableElevation
                            >
                                Guardar
                            </LoadingButton>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={modal.hide}
                                startIcon={<CloseIcon />}
                                disabled={isMutating === 1}
                            >
                                Cancelar
                            </Button>
                        </DialogActions>
                    )}
                </Dialog>
            </form>
        </FormProvider>
    );
};

export default FormDialog;
