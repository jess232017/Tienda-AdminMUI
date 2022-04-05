import React from 'react';

//control
import TinySlider from "tiny-slider-react";

//mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

//owned
import TopItem from '_@/common/global/TopItem';

const Recommend = ({ apiCall, urlParams }) => {
    const { data: item, isLoading: isILoading, isError: isIError } = apiCall(urlParams);
    const { data: products } = item || {};

    return (
        <>
            {isILoading ?
                <Stack direction="row" spacing={2}>
                    {Array.from(Array(4)).map((_, index) => (
                        <Skeleton key={index} width="20rem" height="17rem"></Skeleton>
                    ))}
                </Stack>
                : isIError ?
                    <p>Error al cargar</p>
                    :
                    <TinySlider settings={{ items: 4, gutter: 16, autoplay: true, controlsText: ["chevron_left", "navigate_next"], autoplayButtonOutput: false }}>
                        {products.map(product => (
                            <TopItem {...product} />
                        ))}
                    </TinySlider>
            }
        </>
    );
}

export default Recommend;