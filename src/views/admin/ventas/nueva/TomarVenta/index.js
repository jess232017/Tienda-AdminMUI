import React from 'react';

import { Splitter, SplitterPanel } from 'primereact/splitter';
import useMediaQuery from '@mui/material/useMediaQuery';

import Selecionado from 'src/views/admin/ventas/nueva/TomarVenta/Selecionado';
import useCarrito from 'src/services/context/carrito';
import ViewItem from 'src/common/global/ViewItem';



const TomarVenta = () => {
    const matches = useMediaQuery('(min-width:600px)');
    const carritoStore = useCarrito();
    

    if(matches){
        return ( 
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
        );
    }

    return ( 
        <div className="row">
            <div className="col-md-8">
                <ViewItem
                    carritoStore = {carritoStore}
                />
            </div>
            <div className="col-md-4">
                <Selecionado/>
            </div>
        </div>
    );
}
 
export default TomarVenta;