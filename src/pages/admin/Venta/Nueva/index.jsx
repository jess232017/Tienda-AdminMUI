import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Splitter from '@devbookhq/splitter';
import { useAuthUser } from 'react-auth-kit';
import useMediaQuery from '@mui/material/useMediaQuery';

//icon
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

//own
import CartShop from './CartShop';
import ViewItem from '@/common/global/ViewItem';

const TomarVenta = () => {
    //Get vendor id
    const vendorId = useAuthUser()().userCode;
    const matches = useMediaQuery('(min-width:880px)');

    if (matches) {
        return (
            <Box sx={{ backgroundColor: 'background.paper' }}>
                <Splitter minWidths={[330, 330]} initialSizes={[66, 14]}>
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
