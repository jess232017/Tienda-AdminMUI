import React from 'react';
import { Link } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components'

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

const UriName = ({uri, children}) => {
    return ( 
        <UriLink as={Link} to={uri}>
            <Tooltip
                title={children}
            >
                <TitleOverFlow> 
                    {children} 
                </TitleOverFlow>
            </Tooltip>
        </UriLink>
    );
}
 
export default UriName;