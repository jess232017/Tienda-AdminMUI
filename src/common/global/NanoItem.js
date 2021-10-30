import React from 'react';

import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import Avatar from '@mui/material/Avatar';
import Producto from 'src/services/context/class/Item';
import UriName from 'src/common/global/UriName';

const NanoItem = ({productoId, descripcion, imagen, precioVenta}, carritoStore) => {
    const {carrito ,addItem, removeItem, editItem}  = carritoStore;

    const agregarItem = () =>{
        addItem(new Producto(productoId, descripcion, precioVenta, 1, 5, imagen));
    }

    const exist = carrito.find(value => value.key === productoId);

    return ( 
        <div className="p-col-4 p-sm-1 p-md-2 p-lg-3">
            <article className="d-flex">
                <Avatar 
                    variant="rounded"
                    alt={descripcion}
                    src={`data:image/jpeg;charset=utf-8;base64,${imagen}`}
                    sx={{ width: 90, height: 90 }}
                />
                <div className="ml-2">
                    <UriName
                        uri={`./${productoId}`}
                    >
                        {descripcion}
                    </UriName>

                    <div className="price mb-2">C${precioVenta}</div> 
                    <div>
                        {(exist != null) ?
                            <>
                                <InputNumber 
                                    inputId="minmax" 
                                    value={exist.cantidad}
                                    style = {{height: "40px", width: "110px"}}
                                    onValueChange={(e) => editItem(exist.key, e.value)}
                                    mode="decimal"
                                    showButtons
                                    min={1} 
                                    max={10} 
                                />
                                <Button className="ml-2 p-button-danger p-button-outlined fix-padding"
                                    icon="pi pi-trash"
                                    onClick={(e) => removeItem(e, exist.key)}
                                />
                            </>
                        :
                            <>
                                <Button className="btn-light p-button-secondary"
                                    label="Comprar"
                                    icon="pi pi-shopping-cart m-1"
                                    onClick={() => agregarItem()}
                                />
                                    
                                <Button className="ml-2 p-button-secondary p-button-outlined fix-padding"
                                    icon="pi pi-heart m-1"
                                />
                            </>
                        }
                            
                    </div>
                </div> 
            </article>
        </div>
    );
}
 
export default NanoItem;