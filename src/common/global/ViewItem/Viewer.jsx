import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

import { useElementSize } from 'usehooks-ts';

import GridItem from '@/common/global/GridItem';
import ListItem from '@/common/global/ListItem';

const Viewer = ({ view, data, page, total, handleChange }) => {
    const [squareRef, { width }] = useElementSize();

    return (
        <Box display="flex" flexDirection="column">
            <Box sx={{ flexGrow: 1 }} ref={squareRef}>
                {view === 'grid' ? (
                    <div className="shopping-list">
                        {data?.data?.map((data) => (
                            <GridItem data={data} width={width} key={data.id} />
                        ))}
                    </div>
                ) : (
                    <>
                        {data?.data?.map((data) => (
                            <ListItem data={data} width={width} key={data.id} />
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
