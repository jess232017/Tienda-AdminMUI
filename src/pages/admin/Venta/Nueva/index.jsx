import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Splitter from '@devbookhq/splitter';
import { useAuthUser } from 'react-auth-kit';
import useMediaQuery from '@mui/material/useMediaQuery';

//own
import CartShop from './CartShop';
import ViewItem from '@/common/global/ViewItem';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setShowBar } from '@/store/features/appSlice';

const TomarVenta = () => {
    //Get vendor id
    const vendorId = useAuthUser()().userCode;
    const matches = useMediaQuery('(min-width:880px)');

    //redux
    const dispatch = useDispatch();
    const drawerOpen = useSelector((state) => state.app.setting.showBar);
    const initialSize = drawerOpen ? [66, 34] : [72, 28];

    useEffect(() => {
        dispatch(setShowBar(false));
    }, []);

    if (matches) {
        return (
            <Box sx={{ backgroundColor: 'background.paper' }}>
                <Splitter minWidths={[330, 330]} initialSizes={initialSize}>
                    <ViewItem />
                    <CartShop vendorId={vendorId} />
                </Splitter>
            </Box>
        );
    }

    return (
        <Card>
            <ViewItem />
            <CartShop vendorId={vendorId} />
        </Card>
    );
};

export default TomarVenta;
