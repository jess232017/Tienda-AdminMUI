import withAxios from '../utilities/provider';
import {axiosQuery, axiosMutator} from '../utilities/core';

const apiFactura = {
    obtener: axiosQuery("get", "/factura", "factura"),
    obtenerDetalle: axiosQuery("get", "/detalle", "detalle-only"),
    obtenerFactura :   axiosQuery("get", "/factura", "factura"),
    agregarFactura :   withAxios("post", "/factura"),
    editarFactura :    withAxios("put", "/factura"),
    eliminarFactura :  withAxios("delete", "/factura"),
}

export default apiFactura;