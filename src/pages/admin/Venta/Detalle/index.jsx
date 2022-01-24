import React from 'react';
import { useParams } from "react-router-dom";

//Controls
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Inject, Sort } from '@syncfusion/ej2-react-grids';


//Icon
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

//own
import PageCard from '_@/common/PageCard';
import api from '_@/services/api/tasks/ApiFactura';

const Detalle = () => {
    const facturaId = useParams().invoiceId;

    const { data: dataDetalle } = api.obtenerDetalle("/" + facturaId);
    const { data: dataFactura } = api.obtenerFactura("/" + facturaId);
    const reportURL = import.meta.env.VITE_API_URL + "/Reporte/factura?Id=" + facturaId;

    const { data: detalle } = dataDetalle || {};
    const { data: factura } = dataFactura || {};

    const calculateTotal = (_, data) => {
        const { precio, cantidad } = data || 0;
        return (precio * cantidad).toFixed(2);
    }

    return (
        <PageCard
            titulo={factura?.fechaVenta}
            subTitulo={"Id Factura:" + facturaId}
        >
            <div className="row mb-5 order-info-wrap">
                <div className="col-md-4">
                    <article className="d-flex align-items-start">
                        <Avatar variant="circular" sx={{ backgroundColor: "rgba(49,103,235,.2)", height: 48, width: 48 }}>
                            <PermIdentityIcon sx={{ color: "#3167eb" }} />
                        </Avatar>
                        <div className="text ms-4">
                            <Typography variant='h6' className="mb-1">Cliente</Typography>
                            <p className="mb-1">
                                John Alexander <br /> alguien@ejemplo.com <br /> +505 2212-3456
                            </p>
                            <a href="#">Ver Perfil</a>
                        </div>
                    </article>
                </div> {/* col// */}
                <div className="col-md-4">
                    <article className="d-flex align-items-start">
                        <Avatar variant="circular" sx={{ backgroundColor: "rgba(49,103,235,.2)", height: 48, width: 48 }}>
                            <ShoppingCartIcon sx={{ color: "#3167eb" }} />
                        </Avatar>
                        <div className="text ms-4">
                            <Typography variant='h6' className="mb-1">Venta</Typography>
                            <p className="mb-1">
                                Total: C${factura?.total} <br /> Pago con: C$ {factura?.pagoCon} <br /> Estado: {factura?.estado}
                            </p>
                            <a href={reportURL} rel="noreferrer" target="_blank">Descargar Recibo</a>
                        </div>
                    </article>
                </div> {/* col// */}
                <div className="col-md-4">
                    <article className="d-flex align-items-start">
                        <Avatar variant="circular" sx={{ backgroundColor: "rgba(49,103,235,.2)", height: 48, width: 48 }}>
                            <AccountWalletIcon sx={{ color: "#3167eb" }} />
                        </Avatar>
                        <div className="text ms-4">
                            <Typography variant='h6' className="mb-1">Metodo de pago</Typography>
                            <p className="mb-1">
                                Metodo: Efectivo
                            </p>
                            <a href="#">Ver Metodos</a>
                        </div>
                    </article>
                </div> {/* col// */}
            </div> {/* row // */}
            <div className="row">
                <div className="col-lg-8">
                    <GridComponent
                        height='250'
                        dataSource={detalle}
                        enableStickyHeader={true}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field='detalleId' headerText="Codigo" width='100' />
                            <ColumnDirective field='descripcion' headerText="Producto" width='100' />
                            <ColumnDirective field='cantidad' headerText="Cantidad" width='100' />
                            <ColumnDirective field='precio' headerText="Precio Unitario" width='100' />
                            <ColumnDirective field='cantidad' headerText="Total" width='100' valueAccessor={calculateTotal} />
                        </ColumnsDirective>

                        <Inject services={[Sort, Filter, Group]} />
                    </GridComponent>
                </div>  {/* col// */}
                <div className="col-lg-4">
                    <div className="box shadow-sm bg-light p-5 d-none pb-4">
                        <h6>Informacion de Pago</h6>
                        <p>
                            <img src="images/card-brands/2.png" className="border" height={20} /> Master Card **** **** 4768  <br />
                            Business name: Grand Market LLC <br />
                            Phone: +1 (800) 555-154-52
                        </p>
                    </div>
                    <div className="h-25">
                        <div className="mb-3">
                            <label>Notas</label>
                            <textarea className="form-control" name="notas" id="notas" placeholder="Escribe alguna nota" defaultValue={""} />
                        </div>
                        <Button variant="contained">
                            Guardar Nota
                        </Button>
                    </div>
                </div> {/* col// */}
            </div>
        </PageCard>
    );
}

export default Detalle;
