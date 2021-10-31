import React from 'react';
import {Link} from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import { Button } from 'primereact/button';

import { InputNumber } from 'primereact/inputnumber';

import UriName from 'src/common/global/UriName';
import Item from '../../services/context/class/Item'

const ListItem = ({productoId, descripcion, imagen, precioVenta}, carritoStore) => {
    const {carrito ,addItem, removeItem, editItem}  = carritoStore;

    const agregarItem = () =>{
        addItem(new Item(productoId, descripcion, precioVenta, 1, 5, imagen));
    }

    const exist = carrito.find(value => value.key === productoId);

    return ( 
        <article key={productoId} className="card card-product-list mb-2">
            <div className="row no-gutters">
                <aside className="col-md-2">
                    <Avatar 
                        variant="rounded"
                        alt={descripcion}
                        src={`data:image/jpeg;charset=utf-8;base64,${imagen}`}
                        sx={{ width: 120, height: 120 }}
                    />    
                </aside>
                <div className="col-md-7">
                    <div className="pt-2 pl-2">
                        <UriName uri={`/item?productoId=${productoId}`}>
                            {descripcion}
                        </UriName>

                        <Link to={`/item?productoId=${productoId}`} className="h5 title d-none">{descripcion}</Link>
                        <p> Take it as demo specs, ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum dolor sit amet...</p>
                    </div>
                </div> 
                <aside className="col-sm-3">
                    <div className="pt-3">
                        <div className="price-wrap">
                            <span className="price h5">C$ {precioVenta} </span>  
                            <del className="price-old">C$ 198</del>
                        </div>
                        <br />
                        <p>
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
                        </p>
                    </div> 
                </aside> 
            </div> 
        </article> 
    );
}
 
export default ListItem;