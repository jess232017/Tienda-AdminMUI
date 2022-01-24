import React from 'react';

import Button from '@mui/material/Button';

import { styled } from '@mui/system';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';

import { show } from '@ebay/nice-modal-react';
import useCarrito from '_@/services/context/carrito';
import FormPago from '_@/components/forms/FormPago';

const Card = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
});

const CustomContent = styled(CardContent)({
    display: "flex",
    flex: 1
});


const Selecionado = () => {
    const { carrito, editItem, removeItem } = useCarrito();
    const onClick = () => show(FormPago, { title: "Metodo de Pago" });

    let suma = 0;
    Object.values(carrito).forEach(value => suma += value.precio * value.cantidad);

    return (
        <Card>
            <div>
                <CardHeader
                    title="Listado de este pedido"
                />
                <Divider />
            </div>

            <CustomContent>
                {/*
                    <DataGrid
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
                </DataGrid>*/
                }
            </CustomContent>

            <div>
                <Divider />
                <CardContent>
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
                </CardContent>

                <CardActions>
                    <Button
                        fullWidth
                        variant="outlined"
                    >
                        Cancelar
                    </Button>
                    <Button
                        fullWidth
                        color="primary"
                        variant="outlined"
                        onClick={onClick}
                    >
                        Cobrar
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
}

export default Selecionado;
