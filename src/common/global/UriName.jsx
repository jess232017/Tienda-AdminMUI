import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@mui/styles/styled';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const TitleOverFlow = styled('p')({
    textOverflow: "ellipsis",
    overflow: "hidden", 
    width: 160, 
    whiteSpace: "nowrap",
    marginBottom:0,
    color: "#1b212c",
})

const UriLink = styled('a')({
    fontFamily: "Roboto, sans-serif",
    textDecoration: "none",
    fontWeight: 600,
    color: "#1b212c",
})

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