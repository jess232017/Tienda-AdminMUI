import React from 'react';

import { Button } from 'devextreme-react/button';
import { NumberBox } from 'devextreme-react/number-box';
import DataGrid, { Column, Scrolling, Button as GrdButton, Editing } from 'devextreme-react/data-grid';

import useCarrito from 'src/services/context/carrito';

const Selecionado = () => {
    const {carrito, editItem, removeItem} = useCarrito();

    let suma = 0;
    Object.values(carrito).forEach(value => {
        suma += value.precio * value.cantidad;
    });

    const cellRender = ({data}) => (
        <NumberBox
            min = {0}
            max = {12}
            defaultValue={20.5}
            showSpinButtons={true}
            showClearButton={false}
            value = {data.cantidad}
            onValueChange={(e) => editItem(data.key, e)}
        />
    );

    return ( 
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">
                    Venta Actual: 
                </div>
                <div className="card-body">
                    <DataGrid
                        height={264}
                        dataSource={carrito}
                        showBorders
                        allowColumnResizing
                        allowColumnReordering
                    >
                        <Editing
                            allowUpdating={false}
                            allowDeleting={true}
                            useIcons={true}
                        />
                        <Scrolling mode="virtual" />

                        <Column dataField="nombre"
                            allowEditing={false} 
                            caption="Producto"
                        />
                        <Column 
                            dataField="cantidad"
                            caption="Cant"
                            cellRender={cellRender}
                        />
                        <Column dataField="precio" 
                            allowEditing={false}/>
                        <Column caption="Acción" type="buttons"> 
                            <GrdButton name="save" icon="save" />
                            <GrdButton name="delete" onClick={e => removeItem(null, e.row.data.key)} />
                        </Column>
                    </DataGrid>
                </div>

                <hr/>

                <div className="card-body">
                    <dl className="m-0 d-flex justify-content-between">
                        <dt>Impuesto: </dt>
                        <dd className="text-right">15%</dd>
                    </dl>
                    <dl className="m-0 d-flex justify-content-between">
                        <dt>Descuento:</dt>
                        <dd className="text-right"><a href="/...">0%</a></dd>
                    </dl>
                    <dl className="m-0 d-flex justify-content-between">
                        <dt><span className="text-sm">Sub Total:</span></dt>
                        <dd className="text-right">C$ {suma.toFixed(2)}</dd>
                    </dl>
                    <dl className="m-0 d-flex justify-content-between">
                        <dt>Total: </dt>
                        <dd className="text-right h4 b">C$ {(suma + (suma * .15)).toFixed(2)}</dd>
                    </dl>
                    
                </div>

                <div className="card-footer d-flex" style={{gap: ".5rem"}}>
                    <Button width="100%" 
                        text="Cancelar"
                        icon="pi pi-times" 
                        iconPos="right"
                    />
                    <Button width="100%" 
                        text="Cobrar" 
                        type="default"
                        icon="pi pi-ticket" 
                        iconPos="right"
                    />
                </div>
            </div>
        </div>
    );
}
 
export default Selecionado;