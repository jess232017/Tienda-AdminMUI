import React from 'react';

import { Splitter, SplitterPanel } from 'primereact/splitter';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card'

import Selecionado from 'src/views/admin/ventas/nueva/TomarVenta/Selecionado';
import useCarrito from 'src/services/context/carrito';
import ViewItem from 'src/common/global/ViewItem';

const TomarVenta = () => {
    const matches = useMediaQuery('(min-width:600px)');
    const carritoStore = useCarrito();
    
    return matches ? 
        <Splitter >
            <SplitterPanel
                size={68}
            >
                <ViewItem carritoStore = {carritoStore}/>
            </SplitterPanel>
            <SplitterPanel
                size={32}
            >
                <Selecionado/>
            </SplitterPanel>
        </Splitter>
    :
        <div className="row">
            <div className="col-md-8">
                <Card>
                    <ViewItem
                        carritoStore = {carritoStore}
                    />
                </Card>
            </div>
            <div className="col-md-4">
                <Card>
                    <Selecionado/>
                </Card>
            </div>
        </div>
}
 
export default TomarVenta;