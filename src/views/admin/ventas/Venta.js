import React, { useState, useEffect } from 'react';

import { Column, MasterDetail } from 'devextreme-react/data-grid';

import PageCard from 'src/common/PageCard';
import api from 'src/services/api/tasks/ApiFactura';
import MyToolbar, { item } from 'src/components/Toolbar'
import DetalleTable from 'src/components/tables/DetalleTable';
import PageTable from 'src/components/tables/PageTable';

//
import TimerIcon from '@mui/icons-material/Timer';
import UpdateIcon from '@mui/icons-material/Update';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Chip from '@mui/material/Chip';
import { useHistory } from 'react-router';

const Ventas = () => {
    let history = useHistory();
    const [selected, setSelected] = useState({})
    const { data, isLoading, isError } = api.obtener();

    const onClickTomar = () => history.push("/admin/venta/nueva");
    const onClickDetail = () => history.push("/admin/venta/detalle?facturaId=" + selected?.facturaId);

    const myTools = [
        item("add", "Tomar Venta", 'item', <ShoppingCartIcon />, onClickTomar),
        item("detail", "Ver Venta", 'item', <ReceiptIcon />, onClickDetail),
        item("waiting", "En Espera", 'item', <TimerIcon />, null),
        item("update", "Refrescar", 'item', <UpdateIcon />, null),
    ]

    return (
        <PageCard
            icon="pi-shopping-cart"
            titulo="Gestión de Ventas"
            subTitulo="Listado de Ventas"
            isLoading={isLoading}
            isError={isError}
        >
            <MyToolbar
                items={myTools}
            />

            <PageTable
                data={data}
                isLoading={isLoading}
                setSelect={setSelected}
            >
                <Column dataField="facturaId" key="facturaId" width={75} caption="Id Recibo" />,
                <Column caption="Responsables" key="Responsables">
                    <Column dataField="vendedor" key="vendedor" caption="Vendedor" width={130} />,
                    <Column dataField="cliente" key="cliente" caption="Cliente" width={130} />,
                </Column>,
                <Column caption="Contabilidad" key="Contabilidad">
                    <Column dataField="fechaVenta" key="fechaVenta" dataType="date" />,
                    <Column dataField="formaPago" key="formaPago" caption="Tipo Pago" width={100} />,
                    <Column dataField="subTotal" key="subTotal" format="currency" />,
                    <Column dataField="pagoCon" key="pagoCon" format="currency" />,
                    <Column dataField="estado" key="estado" cellRender={cellRender} />,
                </Column>,
                <Column dataField="comentario" key="comentario" format="currency" />,
                <MasterDetail
                    key="detalles"
                    enabled={true}
                    component={DetalleTable}
                />
            </PageTable>
        </PageCard>
    );
}

export default Ventas;

function cellRender({ value }) {
    const severity = (value === "PAGADO") ? "primary" : "secondary";
    return <Chip color={severity} label={value} size="small" />
}
