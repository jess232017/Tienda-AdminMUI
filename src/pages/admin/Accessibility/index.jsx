import React from 'react';

import Select from 'react-select';

import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

//Icon
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SummarizeIcon from '@mui/icons-material/AccessibilityNewTwoTone';

//owned
import PageCard from '@/common/PageCard';
import useStore from '@/services/context/sidebar';

const ReportBox = styled(Stack)({
    paddingTop: '1rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingBottom: '1.5rem',
    height: '100%',
    backgroundColor: '#f9f8fc',
    borderRadius: '.3rem',
    '&:hover': {
        transition: 'all .2s ease-out',
        transform: 'translate(0, -6px)',
        boxShadow: '0 0.25rem 0.25rem rgb(0 0 0 / 10%) !important',
    },
});

const Accessibility = () => {
    const { show, setLocale, setFont, setDarkMode, setDyslexic } = useStore();

    return (
        <PageCard
            headerProps={{
                title: 'Accessibilidad',
                subheader: '',
                avatar: <SummarizeIcon />,
            }}
        >
            <Grid container>
                <Grid item xs={12} sm={6} md={4} p={2}>
                    <ReportBox component="article" spacing={2} justifyContent="space-between">
                        <Typography component="span" variant="h5">
                            Dislexia amigable
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            Brinda una experencia de lectura más fluida y facil, tolerable para personas con dislexia.
                        </Typography>
                        <Button fullWidth={false} onClick={setDyslexic} endIcon={<NavigateNextIcon />} variant="outlined">
                            {show?.dyslexic ? 'Desactivar' : 'Activar'}
                        </Button>
                    </ReportBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4} p={2}>
                    <ReportBox component="article" spacing={2} justifyContent="space-between">
                        <Typography component="span" variant="h5">
                            Modo Oscuro
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            Reduce la fatiga visual ocasionada por observar por mucho tiempo la pantalla.
                        </Typography>
                        <Button fullWidth={false} onClick={setDarkMode} endIcon={<NavigateNextIcon />} variant="outlined">
                            {show?.darkMode ? 'Desactivar' : 'Activar'}
                        </Button>
                    </ReportBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4} p={2}>
                    <ReportBox component="article" spacing={2} justifyContent="space-between">
                        <Typography component="span" variant="h5">
                            Idioma
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            Seleccione el idioma de su preferencia.
                        </Typography>
                        <Select placeholder="Seleccionar" />
                    </ReportBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4} p={2}>
                    <ReportBox component="article" spacing={2} justifyContent="space-between">
                        <Typography component="span" variant="h5">
                            Escalar fuente
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            Aumenta o reduce el tamaño de los textos mostrados en pantalla
                        </Typography>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Slider
                                aria-label="font-size"
                                value={show.fontSize}
                                onChange={(event) => {
                                    setFont(event.target.value);
                                }}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                max={10}
                                min={-10}
                            />
                        </Stack>
                    </ReportBox>
                </Grid>
            </Grid>
        </PageCard>
    );
};

export default Accessibility;
