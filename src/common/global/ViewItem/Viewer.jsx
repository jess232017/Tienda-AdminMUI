import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import useResizeObserver from 'use-resize-observer';

import GridItem from '@/common/global/GridItem';
import ListItem from '@/common/global/ListItem';
import useCarrito from '@/services/context/carrito';

const Viewer = ({ view, data, page, total, handleChange }) => {
    const store = useCarrito();
    const { ref, width = 1, height = 1 } = useResizeObserver();

    return (
        <Box display="flex" flexDirection="column">
            <Box sx={{ flexGrow: 1 }} ref={ref}>
                {view === 'grid' ? (
                    <Grid container spacing={3} columns={width < 480 ? 1 : width < 960 ? 3 : 4}>
                        {data?.data?.map((data) => (
                            <GridItem data={data} store={store} width={width} key={data.id} />
                        ))}
                    </Grid>
                ) : (
                    <>
                        {data?.data?.map((data) => (
                            <ListItem data={data} store={store} width={width} key={data.id} />
                        ))}
                    </>
                )}
            </Box>

            <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
                <Pagination page={page} count={total} color="primary" showLastButton showFirstButton onChange={handleChange} />
            </Box>
        </Box>
    );
};

export default Viewer;
