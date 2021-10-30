import React from 'react';
import {Link} from "react-router-dom";

import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Button } from 'primereact/button';

import { InputNumber } from 'primereact/inputnumber';

import UriName from 'src/common/global/UriName';
import Item from '../../services/context/class/Item'

const ListItem = ({productoId, descripcion, imagen, precioVenta}, carritoStore) => {
    const {carrito ,addItem, editItem}  = carritoStore;

    const agregarItem = () =>{
        addItem(new Item(productoId, descripcion, precioVenta, 1, 5, imagen));
    }

    const exist = carrito.find(value => value.key === productoId);

    return ( 
        <article key={productoId} className="card card-product-list">
            <div className="row no-gutters">
                <aside className="col-md-3">
                    <Avatar 
                        variant="rounded"
                        alt={descripcion}
                        src={`data:image/jpeg;charset=utf-8;base64,${imagen}`}
                        sx={{ width: 120, height: 120 }}
                    />    
                </aside>
                <div className="col-md-6">
                    <div className="info-main">
                        <UriName uri={`/item?productoId=${productoId}`}>
                            {descripcion}
                        </UriName>

                        <Link to={`/item?productoId=${productoId}`} className="h5 title d-none">{descripcion}</Link>
                        <p> Take it as demo specs, ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Ut wisi enim ad minim veniam </p>
                    </div>
                </div> 
                <aside className="col-sm-3">
                    <div className="info-aside">
                        <div className="price-wrap">
                            <span className="price h5">C$ {precioVenta} </span>  
                            <del className="price-old">C$ 198</del>
                        </div>
                        <br />
                        <p>
                            {(exist != null) ?
                                <InputNumber 
                                    className="w-100"
                                    style = {{height: "40px", width: "105px"}}
                                    inputId="minmax" 
                                    value={exist.cantidad}
                                    onValueChange={(e) => editItem(exist.key, e.value)}
                                    mode="decimal"
                                    showButtons
                                    min={1} 
                                    max={10} />
                            :
                                <Button className="btn btn-primary mr-1 w-100"
                                    label="Comprar"
                                    icon="pi pi-shopping-cart"
                                    onClick={() => agregarItem()}/>
                            }
                            <Button className="btn btn-light mr-1 w-100"
                                label="Guardar"
                                icon="pi pi-heart"
                                onClick={() => agregarItem()}/>
                        </p>
                    </div> 
                </aside> 
            </div> 
        </article> 
    );
}
 
export default ListItem;