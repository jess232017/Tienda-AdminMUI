//[DEPRECATED FOR React-RouterV6]

import React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';


import Loader from '_@/components/Loader';
import CssBaseline from '@mui/material/CssBaseline';

import RequireAuth from '_@/services/auth/RequireAuth';
import RequireRole from '_@/services/auth/RequireRole';
import { ROLES } from '_@/services/auth/permission-maps';


//Pages
const Layout = React.lazy(() => import('./components/layout/container/Layout'));
const Auth = React.lazy(() => import('./pages/auth/Auth'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/register/Register'));
const Ventas = React.lazy(() => import('_@/pages/admin/Venta'));
const DetalleVenta = React.lazy(() => import('_@/pages/admin/Venta/Detalle'));
const VentaNueva = React.lazy(() => import('_@/pages/admin/Venta/Nueva'));
const Movimiento = React.lazy(() => import('_@/pages/admin/Movimiento'));
const Inventario = React.lazy(() => import('_@/pages/admin/Inventario'));
const Supplier = React.lazy(() => import('_@/pages/admin/Supplier'));
const Dashboard = React.lazy(() => import('_@/pages/admin/Dashboard'));
const Employee = React.lazy(() => import('_@/pages/admin/Employee'));
const Product = React.lazy(() => import('_@/pages/admin/Product'));
const Registro = React.lazy(() => import('_@/pages/admin/Registro'));
const Category = React.lazy(() => import('_@/pages/admin/Category'));
const Brand = React.lazy(() => import('_@/pages/admin/Brand'));
const Client = React.lazy(() => import('_@/pages/admin/Client'));
const Reporte = React.lazy(() => import('_@/pages/admin/Report'));
const ReportViewer = React.lazy(() => import('_@/pages/admin/Report/ReportViewer'));
const Setting = React.lazy(() => import('_@/pages/admin/Setting'));
const NoFound = React.lazy(() => import('_@/pages/error/NoFound'));

const index = () => {
    return (
        <HashRouter>
            <CssBaseline />
            <NiceModal.Provider />
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
                                    children={<VentaNueva />}
                                />
                            }
                        />

                        <Route path="categoria"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.vendedor]}
                                    children={<Category />}
                                />
                            }
                        />

                        <Route path="marca"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.vendedor]}
                                    children={<Brand />}
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
                                    children={<Product />}
                                />
                            }
                        />

                        <Route path="cliente"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.cajero, ROLES.vendedor]}
                                    children={<Client />}
                                />
                            }
                        />

                        <Route path="proveedor"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador, ROLES.cajero, ROLES.vendedor]}
                                    children={<Supplier />}
                                />
                            }
                        />

                        <Route path="empleado"
                            element={
                                <RequireRole
                                    roles={[ROLES.administrador]}
                                    children={<Employee />}
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
