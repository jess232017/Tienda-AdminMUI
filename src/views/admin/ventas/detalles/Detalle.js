import React from 'react';
import {useLocation} from "react-router-dom";

//Mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//Icon
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

import AuxTr from 'src/components/AuxTr';
import PageCard from 'src/common/PageCard';
import api from 'src/services/api/tasks/ApiFactura';

const Detalle = () => {

    const urlParams = new URLSearchParams(useLocation().search);
    const facturaId = urlParams.get('facturaId');
    const {data: dataDetalle} = api.obtenerDetalle("/" + facturaId);
    const {data: dataFactura} = api.obtenerFactura("/" + facturaId);
    const reportURL = process.env.REACT_APP_API_URL + "/Reporte/factura?Id=" + facturaId;

    const { data: detalle } = dataDetalle || {};
    const { data: factura } = dataFactura || {};

    return ( 
        <PageCard
            titulo={factura?.fechaVenta}
            subTitulo={"Id Factura:" + facturaId}
        >
            <div className="row mb-5 order-info-wrap">
                <div className="col-md-4">
                    <article className="d-flex align-items-start">
                        <Avatar variant="circular" sx={{backgroundColor: "rgba(49,103,235,.2)", height: 48, width: 48}}>
                            <PermIdentityIcon sx={{color:"#3167eb"}}/>
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
                        <Avatar variant="circular" sx={{backgroundColor: "rgba(49,103,235,.2)", height: 48, width: 48}}>
                            <ShoppingCartIcon sx={{color:"#3167eb"}}/>
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
                        <Avatar variant="circular" sx={{backgroundColor: "rgba(49,103,235,.2)", height: 48, width: 48}}>
                            <AccountWalletIcon sx={{color:"#3167eb"}}/>
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
                    <div className="table-responsive">
                        <table className="table border table-hover table-lg">
                        <thead>
                            <tr>
                            <th width="40%">Producto</th>
                            <th width="20%">Precio Unitario</th>
                            <th width="20%">Cantidad</th>
                            <th width="20%" className="text-end">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalle?.map(value => (
                                <AuxTr
                                    key={value.detalleId}
                                    imagen={value.imagen}
                                    precio={value.precio}
                                    cantidad={value.cantidad}
                                    descripcion={value.descripcion}
                                />
                            ))}
                        </tbody>
                        </table>
                    </div> {/* table-responsive// */}
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