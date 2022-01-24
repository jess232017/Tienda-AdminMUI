//[DEPRECATED FOR React-RouterV6]

import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';


import Loader from '_@/components/Loader';

import RequireAuth from '_@/services/auth/RequireAuth';
import RequireRole from '_@/services/auth/RequireRole';
import { ROLES } from '_@/services/auth/permission-maps';


//Pages
const Layout = React.lazy(() => import('./components/layout/container/Layout'));
const Auth = React.lazy(() => import('./pages/auth/Auth'));
const Login = React.lazy(() => import('./pages/auth/login/Login'));
const Register = React.lazy(() => import('./pages/auth/register/Register'));
const Ventas = React.lazy(() => import('_@/pages/admin/Venta'));
const DetalleVenta = React.lazy(() => import('_@/pages/admin/Venta/Detalle'));
const TomarVenta = React.lazy(() => import('_@/pages/admin/Venta/Nueva'));
const Movimiento = React.lazy(() => import('_@/pages/admin/Movimiento'));
const Inventario = React.lazy(() => import('_@/pages/admin/Inventario'));
const Proveedor = React.lazy(() => import('_@/pages/admin/Proveedor'));
const Dashboard = React.lazy(() => import('_@/pages/admin/Dashboard'));
const Empleado = React.lazy(() => import('_@/pages/admin/Empleado'));
const Producto = React.lazy(() => import('_@/pages/admin/Producto'));
const Registro = React.lazy(() => import('_@/pages/admin/Registro'));
const Categoria = React.lazy(() => import('_@/pages/admin/Categoria'));
const Cliente = React.lazy(() => import('_@/pages/admin/Cliente'));
const Caja = React.lazy(() => import('_@/pages/admin/Caja'));
const Reporte = React.lazy(() => import('_@/pages/admin/Report'));
const ReportViewer = React.lazy(() => import('_@/pages/admin/Report/ReportViewer'));
const Setting = React.lazy(() => import('_@/pages/admin/Setting'));
const NoFound = React.lazy(() => import('_@/pages/error/NoFound'));

const index = () => {
    return (
        <HashRouter>
            <React.Suspense fallback={<Loader />}>
                <Routes>
                    <Route index
                        element={
                            <RequireAuth
                                redirect="auth"
                                children={<Navigate to="admin" />}
                            />
                        } />

                    <Route path="auth"
                        element={
                            <RequireAuth
                                redirect="/"
                                require={false}
                                children={<Auth />}
                            />
                        }
                    >
                        <Route index element={<Login />} />
                        <Route path="sign-up" element={<Register />} />
                        <Route path="*" element={<NoFound />} />
                    </Route>

                    <Route path="admin"
                        element={
                            <RequireAuth
                                redirect="/"
                                children={<Layout />}
                            />
                        }
                    >
                        <Route index
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador]}
                                    children={<Dashboard />}
                                />
                            }
                        />

                        <Route path="venta"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.vendedor]}
                                    children={<Ventas />}
                                />
                            }
                        />

                        <Route path="venta/:invoiceId"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.vendedor]}
                                    children={<DetalleVenta />}
                                />
                            }
                        />

                        <Route path="venta/nueva"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.vendedor]}
                                    children={<TomarVenta />}
                                />
                            }
                        />

                        <Route path="categoria"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.vendedor]}
                                    children={<Categoria />}
                                />
                            }
                        />

                        <Route path="movimiento"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador]}
                                    children={<Movimiento />}
                                />
                            }
                        />

                        <Route path="inventario"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.bodeguero]}
                                    children={<Inventario />}
                                />
                            }
                        />

                        <Route path="bitacoras"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador]}
                                    children={<Registro />}
                                />
                            }
                        />

                        <Route path="producto"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.bodeguero]}
                                    children={<Producto />}
                                />
                            }
                        />

                        <Route path="caja"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.cajero]}
                                    children={<Caja />}
                                />
                            }
                        />

                        <Route path="cliente"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.cajero, ROLES.vendedor]}
                                    children={<Cliente />}
                                />
                            }
                        />

                        <Route path="proveedor"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.cajero, ROLES.vendedor]}
                                    children={<Proveedor />}
                                />
                            }
                        />

                        <Route path="empleado"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador]}
                                    children={<Empleado />}
                                />
                            }
                        />

                        <Route path="reporte"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador]}
                                    children={<Reporte />}
                                />
                            }
                        />

                        <Route path="reporte/ver"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador]}
                                    children={<ReportViewer />}
                                />
                            }
                        />

                        <Route path="setting"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador]}
                                    children={
                                        <React.Suspense fallback={<Loader />}>
                                            <Setting />
                                        </React.Suspense>
                                    }
                                />
                            }
                        />

                        <Route path="*" element={<NoFound />} />
                    </Route>
                    <Route path="*" element={<NoFound />} />
                </Routes>
            </React.Suspense>
        </HashRouter>

    );
}

export default index;
