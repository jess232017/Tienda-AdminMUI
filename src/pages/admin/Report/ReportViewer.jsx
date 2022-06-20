import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SummarizeIcon from '@mui/icons-material/SummarizeTwoTone';

import PageCard from '@/common/PageCard';

const baseUrl = import.meta.env.VITE_API_REPORT_URL;

const ReportViewer = () => {
    const navigate = useNavigate();
    const { state } = useLocation() || {};

    const handleClick = () => {
        navigate('/admin/reporte');
    };

    return (
        <PageCard
            headerProps={{
                title: 'Reportes',
                subheader: state?.subtitle,
                avatar: <SummarizeIcon />,
                action: (
                    <IconButton onClick={handleClick}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                ),
            }}
        >
            <embed src={`${baseUrl}${state?.url}`} style={{ width: '100%', height: '100%', border: '1px solid darkgrey' }} />
        </PageCard>
    );
};

export default ReportViewer;
