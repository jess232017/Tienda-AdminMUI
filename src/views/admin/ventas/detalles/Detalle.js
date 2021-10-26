import { Avatar } from 'primereact/avatar';
import React from 'react';

import {useLocation} from "react-router-dom";
import { Button } from 'devextreme-react/button';

import PageCard from 'src/common/PageCard';
import AuxTr from 'src/components/AuxTr';
import api from 'src/services/api/tasks/ApiFactura';

const Detalle = () => {
    const urlParams = new URLSearchParams(useLocation().search);
    const facturaId = urlParams.get('facturaId');

    const {data} = api.obtenerDetalle("?facturaId=" + facturaId);

    return ( 
        <PageCard
        >
            <div className="card-body">
                <div className="row mb-5 order-info-wrap">
                    <div className="col-md-4">
                        <article className="d-flex align-items-start">
                            <Avatar
                                icon="pi pi-user"
                            />
                            <div className="text ml-4">
                                <h6 className="mb-1">Cliente</h6> 
                                <p className="mb-1">
                                    John Alexander <br /> alguien@ejemplo.com <br /> +505 2212-3456
                                </p>
                                <a href="#">Ver Perfil</a>
                            </div>
                        </article> 
                    </div> {/* col// */}
                    <div className="col-md-4">
                        <article className="d-flex align-items-start">
                            <Avatar
                                icon="pi pi-shopping-cart"
                            />
                            <div className="text ml-4">
                                <h6 className="mb-1">Venta</h6> 
                                <p className="mb-1">
                                    Total: C$582 <br /> Pago con: C$ 600 <br /> Estado: Pagado
                                </p>
                                <a href="#">Descargar reporte</a>
                            </div>
                        </article> 
                    </div> {/* col// */}
                    <div className="col-md-4">
                        <article className="d-flex align-items-start">
                            <Avatar
                                icon="pi pi-wallet"
                            />
                            <div className="text ml-4">
                                <h6 className="mb-1">Metodo de pago</h6> 
                                <p className="mb-1">
                                    Metodo: Efectivo
                                </p>
                                <a href="#">Ver Metofos</a>
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
                                {data?.data.map(value => (
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
                            <Button
                                text="Guardar Nota"
                                type="default"
                            />
                        </div>
                    </div> {/* col// */}
                </div>
            </div>
        </PageCard>
    );
}
 
export default Detalle;