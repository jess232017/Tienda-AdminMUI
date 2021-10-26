import React, {useState} from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import Form from 'src/components/forms/FormCaja';
import api from 'src/services/api/tasks/ApiFactura';
import PageTable, { itemDialog, itemTool } from 'src/components/tables/PageTable';

import DetalleTable from 'src/components/tables/DetalleTable';
import { Badge } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Ventas = () => {
    const { data, isLoading, isError} = api.obtener();
    const [selected, setSelected] = useState({})
    let history = useHistory();

    const btnTomar = () => {
        history.push("/admin/venta/nueva");
    }

    const btnDetalle = () => {
        history.push("/admin/venta/detalle?facturaId=" + selected?.facturaId);
    }

    const tools = [
        itemTool('Tomar Venta', 'plus', btnTomar),
        itemTool('Ver Venta', 'info', btnDetalle),
        itemTool('En Espera', 'clock', btnTomar),
        itemTool('Refrescar', 'refresh', btnTomar),
    ]

    return (
        <PageCard
            icon="pi-shopping-cart"
            titulo = "Gestión de Ventas"
            subTitulo = "Listado de Ventas"
            isLoading={isLoading}
            isError={isError}
        >
            <PageTable
                data={data}
                tools={tools}
                isLoading={isLoading}
                setSelect={setSelected}
            >
                <Column dataField="facturaId" key="facturaId" width={75} caption="Id Recibo"/>,
                <Column caption="Responsables" key="Responsables">
                    <Column dataField="vendedor" key="vendedor" caption="Vendedor" width={130} />,
                    <Column dataField="cliente" key="cliente" caption="Cliente" width={130}/>,
                </Column>,
                <Column caption="Contabilidad" key="Contabilidad">
                    <Column dataField="fechaVenta" key="fechaVenta" dataType="date" />,
                    <Column dataField="formaPago" key="formaPago" caption="Tipo Pago" width={100} />,
                    <Column dataField="subTotal" key="subTotal" format="currency" />,
                    <Column dataField="pagoCon" key="pagoCon" format="currency" />,
                    <Column dataField="estado" key="estado" cellRender ={cellRender}/>,
                </Column>,
                <Column dataField="comentario" key="comentario" format="currency" />,
                <MasterDetail
                    key = "detalles"
                    enabled={true}
                    component={DetalleTable}
                />
            </PageTable>
        </PageCard>
    );
}
 
export default Ventas;

function cellRender({value}) {
    const severity = (value === "PAGADO") ? "success" : "warning";
    return <Badge value={value} severity ={severity}></Badge>
}
