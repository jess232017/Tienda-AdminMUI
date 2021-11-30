import React from 'react';
import { ROLES } from './services/auth/permission-maps'

const Ventas = React.lazy(() => import('src/views/admin/ventas/Venta'));
const TomarVenta = React.lazy(() => import('src/views/admin/ventas/nueva/TomarVenta'));
const DetalleVenta = React.lazy(() => import('src/views/admin/ventas/detalles/Detalle'));
const Movimiento = React.lazy(() => import('src/views/admin/movimientos/Movimiento'));
const Inventario = React.lazy(() => import('src/views/admin/inventario/Inventario'));
const Proveedor = React.lazy(() => import('src/views/admin/proveedor/Proveedor'));
const Dashboard = React.lazy(() => import('src/views/Dashboard'));
const Empleado = React.lazy(() => import('src/views/admin/empleados/Empleado'));
const Producto = React.lazy(() => import('src/views/admin/productos/Producto'));
const Registro = React.lazy(() => import('src/views/admin/registros/Registro'));
const Categoria = React.lazy(() => import('src/views/admin/categorias/Categoria'));
const Cliente = React.lazy(() => import('src/views/admin/clientes/Cliente'));
const Caja = React.lazy(() => import('src/views/admin/cajas/Caja'));
const Reporte = React.lazy(() => import('src/views/admin/reportes/Reporte'));
const ReportViewer = React.lazy(() => import('src/views/admin/reportes/ReportViewer'));
const noFound = React.lazy(() => import('src/views/error/NoFound'));

const routes = [
    { path: '/', exact: true, name: 'Inicio', component: Dashboard },
    {
        path: '/admin/dashboard', name: 'Dashboard', component: Dashboard,
        roles: [ROLES.administrador]
    },
    { path: '/admin/venta', exact: true, name: 'Ventas', component: Ventas },
    { path: '/admin/venta/nueva', name: 'Tomar Venta', component: TomarVenta },
    { path: '/admin/venta/detalle', name: 'Detalle Venta', component: DetalleVenta },
    { path: '/admin/producto', name: 'Producto', component: Producto },
    { path: '/admin/categoria', name: 'Categoria', component: Categoria },
    {
        path: '/admin/movimiento', name: 'Movimiento', component: Movimiento,
        roles: [ROLES.administrador]
    },
    {
        path: '/admin/inventario', name: 'Inventario', component: Inventario,
        roles: [ROLES.administrador, ROLES.bodeguero]
    },
    {
        path: '/admin/bitacoras', name: 'Registros', component: Registro,
        roles: [ROLES.administrador],
    },
    { path: '/admin/producto', name: 'Producto', component: Producto },
    { path: '/admin/caja', name: 'Caja', component: Caja },
    { path: '/admin/cliente', name: 'Cliente', component: Cliente },
    { path: '/admin/proveedor', name: 'Proveedor', component: Proveedor },
    {
        path: '/admin/empleado', name: 'Empleado', component: Empleado,
        roles: [ROLES.administrador]
    },
    { path: '/admin/reporte', exact: true, name: 'Reporte', component: Reporte },
    { path: '/admin/reporte/ver', name: 'Reporte', component: ReportViewer },
    { name: 'No encontrado', component: noFound }
];

export default routes;