import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiFactura = {
    obtener: axiosQuery("get", "/factura", "factura"),
    obtenerFactura: axiosQuery("get", "/factura", "factura-only"),
    obtenerDetalle: axiosQuery("get", "/detalle/factura", "detalle-only"),
    agregarFactura :   withAxios("post", "/factura"),
    editarFactura :    withAxios("put", "/factura"),
    eliminarFactura :  withAxios("delete", "/factura"),
}

export default apiFactura;