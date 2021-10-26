import React from 'react';

import { Avatar } from 'primereact/avatar';
import { Button } from 'devextreme-react/button';
import { NumberBox } from 'devextreme-react/number-box';

import Truncable from 'src/components/widgets/string_truncate/Truncable';

const NanoItem = ({productoId, descripcion, Cantidad, imagen, precioVenta}, carritoStore) => {
    const {carrito ,addItem, editItem, removeItem}  = carritoStore;

    const agregarItem = () => {
        addItem(productoId, descripcion, precioVenta, 1, 5, imagen);
    }

    const exist = carrito.find(value => value.key === productoId);

    return ( 
        <div className="mt-2">
            <figure className="p-2 d-flex w-100" style={{margin: "0"}}>
                <div>
                    <Avatar className="p-mr-2" 
                        image={`data:image/png;base64, ${imagen}`} 
                        imageAlt="..."  
                        size="xlarge"
                        style={{borderRadious: "1rem"}}
                    />
                </div>
                <figcaption className="d-flex flex-column justify-content-between">
                    <a href={`/${productoId}`}>
                        <Truncable 
                            text= {descripcion}
                            length = {20}
                        />
                    </a>

                    {(exist != null) ?
                        <div className="d-flex">
                            <NumberBox 
                                min = {0}
                                max = {Cantidad}
                                className="w-50 mr-2"
                                defaultValue={0}
                                showSpinButtons={true}
                                showClearButton={false}
                                value = {exist.cantidad}
                                onValueChange={(e) => editItem(exist.key, e)}
                            />
                            <Button 
                                icon="pi pi-times"
                                type="danger" 
                                stylingMode = "outlined"
                                onClick = {() => removeItem(null, exist.key)} />
                        </div>
                    :
                        <Button 
                            text="Incluir"
                            width = "100%"
                            icon="pi pi-shopping-cart" 
                            onClick = {() => agregarItem()} />
                    }
                </figcaption>
            </figure>
        </div>
    );
}
 
export default NanoItem;