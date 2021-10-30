import React from 'react';

import useCarrito from 'src/services/context/carrito';

import Selecionado from './Selecionado';
import ViewItem from 'src/common/global/ViewItem';
import { Splitter, SplitterPanel } from 'primereact/splitter';



const TomarVenta = () => {
    const carritoStore = useCarrito();
    
    return ( 
        <div className="row">
            <div className="col-md-8">
                {/*Carrito*/}
                <ViewItem
                    carritoStore = {carritoStore}
                />
            </div>
            <Selecionado/>
        </div>
    );

    return ( 
        <Splitter >
        <SplitterPanel
            size={68}
        >
                <ViewItem
                    carritoStore = {carritoStore}
                />
        </SplitterPanel>
        <SplitterPanel
            size={32}
        >
            <Selecionado/>
        </SplitterPanel>
    </Splitter>
    );
}
 
export default TomarVenta;