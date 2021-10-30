import React from 'react';
import {Link} from "react-router-dom";
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';

import Item from '../../services/context/class/Item';

const GridItem = ({productoId, descripcion, imagen, precioVenta}, carritoStore) => {
    const {carrito ,addItem, editItem}  = carritoStore;

    const agregarItem = () =>{
        addItem(new Item(productoId, descripcion, precioVenta, 1, 5, imagen));
    }

    const exist = carrito.find(value => value.key === productoId);
    
    return (
        <div key={productoId} className="p-col-12 p-md-4">
            <figure className="card card-product-grid">
                <div className="img-wrap"> 
                    <span className="badge badge-danger"> NUEVO </span>
                    <img src={`data:image/jpeg;charset=utf-8;base64,${imagen}`} alt={descripcion} />
                    <button className="btn-overlay btn">
                        <i className="fa fa-heart"></i> 
                        <span className="text ml-2">Añadir a la lista de deseo</span>
                    </button>
                </div> 
                <figcaption className="info-wrap">
                    <div className="fix-height">
                        <Link to={`/item?productoId=${productoId}`} className="title">{descripcion}</Link>
                        <div className="price-wrap mt-2">
                            <span className="price">C$ {precioVenta}</span>
                            <del className="price-old">C$ 1980</del>
                        </div>
                    </div>
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
                            label="Añadir a la cesta"
                            icon="pi pi-shopping-cart"
                            onClick={() => agregarItem()}/>
                    }
                </figcaption>
            </figure>
        </div> 
    );
}
 
export default GridItem;