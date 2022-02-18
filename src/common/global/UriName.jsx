import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const TitleOverFlow = styled.p`
    text-overflow: ellipsis;
    overflow: hidden; 
    width: 160px; 
    white-space: nowrap;
    margin-bottom: 0;
    color: #1b212c;
`
const UriLink = styled.a`
    font-family: 'Roboto', sans-serif;
    text-decoration: none;
    color: black;
    font-weight: 600;
    color: #1b212c;
`

const UriName = ({ uri, children }) => {
    return (
        <Typography variant="subtitle1" component={Link} to={uri} sx={{ textDecoration: 'none' }}>
            <Tooltip
                title={children}
            >
                <TitleOverFlow>
                    {children}
                </TitleOverFlow>
            </Tooltip>
        </Typography>
    );
}

export default UriName;