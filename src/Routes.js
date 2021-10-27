import React from 'react';
import {ROLES} from './services/auth/permission-maps'

const Ventas = React.lazy(() => import('./views/admin/ventas/Venta'));
const TomarVenta = React.lazy(() => import('./views/admin/ventas/nueva/TomarVenta'));
const DetalleVenta = React.lazy(() => import('./views/admin/ventas/detalles/Detalle'));
const Movimiento = React.lazy(() => import('./views/admin/movimientos/Movimiento'));
const Inventario = React.lazy(() => import('./views/admin/inventario/Inventario'));
const Proveedor = React.lazy(() => import('./views/admin/proveedor/Proveedor'));
const Dashboard = React.lazy(() => import('src/views/Dashboard'));
const Empleado = React.lazy(() => import('./views/admin/empleados/Empleado'));
const Producto = React.lazy(() => import('./views/admin/productos/Producto'));
const Categoria = React.lazy(() => import('./views/admin/categorias/Categoria'));
const Cliente = React.lazy(() => import('./views/admin/clientes/Cliente'));
const Caja = React.lazy(() => import('./views/admin/cajas/Caja'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    {   path: '/admin/dashboard', name: 'Dashboard', component: Dashboard, 
        roles: [ROLES.administrador] 
    },
    {   path: '/admin/venta', exact: true, name: 'Ventas', component: Ventas },
    {   path: '/admin/venta/nueva', name: 'Tomar Venta', component: TomarVenta },
    {   path: '/admin/venta/detalle', name: 'Detalle Venta', component: DetalleVenta },
    {   path: '/admin/producto', name: 'Producto', component: Producto },
    {   path: '/admin/categoria', name: 'Categoria', component: Categoria },
    {   path: '/admin/movimiento', name: 'Movimiento', component: Movimiento },
    {   path: '/admin/inventario', name: 'Inventario', component: Inventario },
    {   path: '/admin/producto', name: 'Producto', component: Producto },
    {   path: '/admin/caja', name: 'Caja', component: Caja },
    {   path: '/admin/cliente', name: 'Cliente', component: Cliente },
    {   path: '/admin/proveedor', name: 'Proveedor', component: Proveedor },
    {   path: '/admin/empleado', name: 'Empleado', component: Empleado,
        roles: [ROLES.administrador]
    },
];

export default routes;