import React from 'react';

import Card from '@mui/material/Card';
import Splitter from '@devbookhq/splitter';
import { useAuthUser } from 'react-auth-kit';
import useMediaQuery from '@mui/material/useMediaQuery';

//icon
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

//own
import CartShop from './CartShop';
import ViewItem from '@/common/global/ViewItem';

const cancelData = {
    title: 'Acción permanente ⚠️',
    description: '¿Seguro que quiere eliminar los productos agregados al carrito?',
    cancellationText: 'No, Cancelar',
    confirmationText: 'Eliminar Todo',
    confirmationButtonProps: {
        color: 'error',
        startIcon: <HighlightOffIcon />,
    },
};

const TomarVenta = () => {
    //Get vendor id
    const vendorId = useAuthUser()().userCode;
    const matches = useMediaQuery('(min-width:880px)');

    if (matches) {
        return (
            <Splitter minWidths={[330, 330]} initialSizes={[66, 34]}>
                <ViewItem />
                <CartShop vendorId={vendorId} />
            </Splitter>
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
