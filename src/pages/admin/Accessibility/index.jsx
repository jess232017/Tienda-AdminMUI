import React, { useState, useEffect } from 'react';

import Select from 'react-select';
import { useTranslation, Trans } from 'react-i18next';

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

const ReportBox = styled(Stack)(({ theme }) => ({
    paddingTop: '1rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingBottom: '1.5rem',
    height: '100%',
    backgroundColor: theme.palette.background.paperSecondary,
    borderRadius: '.3rem',
    '&:hover': {
        transition: 'all .2s ease-out',
        transform: 'translate(0, -6px)',
        boxShadow: '0 0.25rem 0.25rem rgb(0 0 0 / 10%) !important',
    },
}));

const optionLanguage = [
    {
        label: 'Ingles',
        value: 'en',
    },
    {
        label: 'Español',
        value: 'es',
    },
];

const Accessibility = () => {
    const { t, i18n } = useTranslation();
    const { show, setLocale, setFont, setDarkMode, setDyslexic } = useStore();
    const [language, setLanguage] = useState({});

    const changeLanguage = (current) => {
        setLanguage(current);
        setLocale(current.value);
        i18n.changeLanguage(current.value);
    };

    useEffect(() => {
        if (Object.entries(language).length <= 0) {
            const current = optionLanguage.find(({ value }) => value === i18n.language);
            setLanguage(current);
        }
    }, [i18n.language]);

    return (
        <PageCard
            headerProps={{
                title: t('title'),
                subheader: '',
                avatar: <SummarizeIcon />,
            }}
        >
            <Grid container>
                <Grid item xs={12} sm={6} md={4} p={2}>
                    <ReportBox component="article" spacing={2} justifyContent="space-between">
                        <Typography component="span" variant="h5">
                            {t('dyslexia.title')}
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            {t('dyslexia.description')}
                        </Typography>
                        <Button fullWidth={false} onClick={setDyslexic} endIcon={<NavigateNextIcon />} variant="outlined">
                            {show?.dyslexic ? 'Desactivar' : 'Activar'}
                        </Button>
                    </ReportBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4} p={2}>
                    <ReportBox component="article" spacing={2} justifyContent="space-between">
                        <Typography component="span" variant="h5">
                            {t('darkMode.title')}
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            {t('darkMode.description')}
                        </Typography>
                        <Button fullWidth={false} onClick={setDarkMode} endIcon={<NavigateNextIcon />} variant="outlined">
                            {show?.darkMode ? 'Desactivar' : 'Activar'}
                        </Button>
                    </ReportBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4} p={2}>
                    <ReportBox component="article" spacing={2} justifyContent="space-between">
                        <Typography component="span" variant="h5">
                            {t('language.title')}
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            {t('language.description')}
                        </Typography>
                        <Select
                            value={language}
                            defaultValue={{
                                label: 'Español',
                                value: 'es',
                            }}
                            options={optionLanguage}
                            placeholder="Seleccionar"
                            onChange={changeLanguage}
                        />
                    </ReportBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4} p={2}>
                    <ReportBox component="article" spacing={2} justifyContent="space-between">
                        <Typography component="span" variant="h5">
                            {t('scale.title')}
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            {t('scale.description')}
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
