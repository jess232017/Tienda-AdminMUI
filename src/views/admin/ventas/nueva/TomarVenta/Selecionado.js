import React from 'react';

import Button from '@material-ui/core/Button';
import { NumberBox } from 'devextreme-react/number-box';
import DataGrid, { Column, Scrolling, Button as GrdButton, Editing } from 'devextreme-react/data-grid';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@mui/styles';

import useCarrito from 'src/services/context/carrito';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    
    content: {
        display: "flex",
        flex: 1
    }
});


const Selecionado = () => {
    const classes = useStyles();
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
        <Card className={classes.root}>
            <div>
                <CardHeader
                    title="Listado de este pedido"
                />
                <Divider/>
                <Divider/>
            </div>

            <CardContent className={classes.content}>
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
                </DataGrid>
            </CardContent>

            <div>
                <Divider/>
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
                    >
                        Cobrar
                    </Button>
                </CardActions>
            </div>
        </Card>
    );
}
 
export default Selecionado;