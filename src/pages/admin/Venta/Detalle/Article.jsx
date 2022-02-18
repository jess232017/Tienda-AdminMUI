import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Article = ({ title, icon, link, linkText, children }) => {
    const Icon = icon;

    return (
        <Grid item xs={4} sm={4} md={4} >
            <Box component="article" display="flex" alignItems="start">
                <Avatar variant="circular" sx={{ backgroundColor: "rgba(49,103,235,.2)", height: 48, width: 48 }}>
                    <Icon sx={{ color: "#3167eb" }} />
                </Avatar>
                <Box ml={3}>
                    <Typography variant='h6' className="mb-1">{title}</Typography>
                    <Typography variant='subtitle2' className="mb-1"> {children}</Typography>
                    <a href={link}><Typography variant='subtitle2'>{linkText}</Typography></a>
                </Box>
            </Box>
        </Grid>
    );
}

export default Article;