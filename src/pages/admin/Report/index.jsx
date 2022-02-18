import React from 'react';
import PageCard from '_@/common/PageCard';

import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

//Icon
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SummarizeIcon from '@mui/icons-material/SummarizeTwoTone';

//owned
import reports from './data';
import { show } from '@ebay/nice-modal-react';
import ReportViewer from '_@/common/ReportViewer';

const ReportBox = styled(Box)({
    display: "block",
    paddingTop: "1rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingBottom: "1.5rem",
    height: "100%",
    backgroundColor: "#f9f8fc",
    borderRadius: ".3rem",
    '&:hover': {
        transform: "translate(0, -6px)",
        transition: "all .2s ease-out",
        boxShadow: "0 0.25rem 0.25rem rgb(0 0 0 / 10%) !important",
    }
})

const Reporte = () => {


    return (
        <PageCard
            headerProps={{
                title: "Reportes",
                subheader: "Lista de Reportes disponibles",
                avatar: <SummarizeIcon />
            }}
        >
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                {reports.map(({ title, subtitle, link }, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} p={2}>
                        <ReportBox component="article">
                            <h5>{title}</h5>
                            <p style={{ minHeight: '3rem' }}>
                                {subtitle}
                            </p>
                            <p>
                                <Button onClick={() => show(ReportViewer, { title, link })}
                                    endIcon={<NavigateNextIcon />}
                                    variant="outlined"
                                >
                                    Ver
                                </Button>
                            </p>
                        </ReportBox>
                    </Grid>
                ))}
            </Grid>
        </PageCard>
    );
}

export default Reporte;
