import React from 'react';

import { Route, Routes } from 'react-router-dom';

import RequireRole from '@/services/auth/RequireRole';
import { ROLES } from '@/services/auth/permission-maps';
import Loader from '@/components/LoaderPage';
//import Loader from '@/components/Loader';

import clsx from 'clsx';

import { styled } from '@mui/system';
import { makeStyles, useTheme } from '@mui/styles';
import { useMediaQuery, Box, Toolbar } from '@mui/material';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { drawerWidth } from '@/services/constant';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setShowBar } from '@/store/features/appSlice';

import useSocket from '@/services/hooks/useSocket';

const Chat = React.lazy(() => import('@/pages/admin/Chat'));
const Ventas = React.lazy(() => import('@/pages/admin/Venta'));
const Accountant = React.lazy(() => import('@/pages/admin/Accountant'));
const Session = React.lazy(() => import('@/pages/admin/Session'));
const Accessibility = React.lazy(() => import('@/pages/admin/Accessibility'));
const DetalleVenta = React.lazy(() => import('@/pages/admin/Venta/Detalle'));
const VentaNueva = React.lazy(() => import('@/pages/admin/Venta/Nueva'));
const Inventory = React.lazy(() => import('@/pages/admin/Inventory'));
const Lote = React.lazy(() => import('@/pages/admin/Lote'));
const Supplier = React.lazy(() => import('@/pages/admin/Supplier'));
const Dashboard = React.lazy(() => import('@/pages/admin/Dashboard'));
const Employee = React.lazy(() => import('@/pages/admin/Employee'));
const Product = React.lazy(() => import('@/pages/admin/Product'));
const Category = React.lazy(() => import('@/pages/admin/Category'));
const Brand = React.lazy(() => import('@/pages/admin/Brand'));
const Client = React.lazy(() => import('@/pages/admin/Client'));
const Guide = React.lazy(() => import('@/pages/admin/Guide'));
const Reporte = React.lazy(() => import('@/pages/admin/Report'));
const ReportViewer = React.lazy(() => import('@/pages/admin/Report/ReportViewer'));
const Setting = React.lazy(() => import('@/pages/admin/Setting'));
const NoFound = React.lazy(() => import('@/pages/error/NoFound'));

const Main = styled('div')(({ theme }) => ({
    padding: theme.spacing(2.5),
    height: 'calc(100% - 3.6rem)',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const Div = styled('div')(({ theme }) => ({
    width: '100%',
    minHeight: '100vh',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
        marginLeft: -drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    },
}));

const useStyles = makeStyles((theme) => ({
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const MainLayout = () => {
    const theme = useTheme();
    const classes = useStyles();
    const { chatSocket, dashSocket } = useSocket();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    //redux
    const dispatch = useDispatch();
    const drawerOpen = useSelector((state) => state.app.setting.showBar);

    const handleDrawerToggle = () => {
        dispatch(setShowBar(!drawerOpen));
    };

    React.useEffect(() => {
        dispatch(setShowBar(matchUpMd));
    }, [matchUpMd]);

    return (
        <Box display="flex" sx={{ backgroundColor: 'background.default' }}>
            <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
            <Div className={clsx({ [classes.contentShift]: drawerOpen })}>
                <Toolbar>
                    <Header drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
                </Toolbar>
                <Main>
                    <React.Suspense fallback={<Loader />}>
                        <Routes>
                            <Route index element={<RequireRole roles={[ROLES.administrador]} children={<Dashboard />} />} />

                            <Route
                                path="venta"
                                element={<RequireRole roles={[ROLES.administrador, ROLES.vendedor, ROLES.cajero]} children={<Ventas />} />}
                            />

                            <Route
                                path="venta/:invoiceId"
                                element={
                                    <RequireRole
                                        roles={[ROLES.administrador, ROLES.vendedor, , ROLES.cajero]}
                                        children={<DetalleVenta />}
                                    />
                                }
                            />

                            <Route
                                path="venta/nueva"
                                element={<RequireRole roles={[ROLES.administrador, ROLES.vendedor]} children={<VentaNueva />} />}
                            />

                            <Route
                                path="Accountant"
                                element={
                                    <RequireRole roles={[ROLES.administrador, ROLES.vendedor, ROLES.bodeguero]} children={<Accountant />} />
                                }
                            />

                            <Route
                                path="categoria"
                                element={<RequireRole roles={[ROLES.administrador, ROLES.bodeguero]} children={<Category />} />}
                            />

                            <Route
                                path="marca"
                                element={<RequireRole roles={[ROLES.administrador, ROLES.bodeguero]} children={<Brand />} />}
                            />

                            <Route
                                path="Inventario"
                                element={
                                    <RequireRole roles={[ROLES.administrador, ROLES.bodeguero, , ROLES.cajero]} children={<Inventory />} />
                                }
                            />

                            <Route
                                path="Lote"
                                element={<RequireRole roles={[ROLES.administrador, ROLES.bodeguero]} children={<Lote />} />}
                            />

                            <Route
                                path="producto"
                                element={
                                    <RequireRole roles={[ROLES.administrador, ROLES.vendedor, ROLES.bodeguero]} children={<Product />} />
                                }
                            />

                            <Route
                                path="cliente"
                                element={<RequireRole roles={[ROLES.administrador, ROLES.cajero, ROLES.vendedor]} children={<Client />} />}
                            />

                            <Route path="empleado" element={<RequireRole roles={[ROLES.administrador]} children={<Employee />} />} />

                            <Route
                                path="proveedor"
                                element={
                                    <RequireRole roles={[ROLES.administrador, ROLES.bodeguero, ROLES.cajero]} children={<Supplier />} />
                                }
                            />

                            <Route path="sesion" element={<Session />} />

                            <Route path="ayuda" element={<Guide />} />

                            <Route path="reporte" element={<RequireRole roles={[ROLES.administrador]} children={<Reporte />} />} />

                            <Route path="reporte/ver" element={<RequireRole roles={[ROLES.administrador]} children={<ReportViewer />} />} />

                            <Route path="setting" element={<Setting />} />

                            <Route path="accessibilidad" element={<Accessibility />} />

                            <Route path="chat" element={<Chat chatSocket={chatSocket} />} />
                            <Route path="load" element={<Loader />} />

                            <Route path="*" element={<NoFound />} />
                        </Routes>
                    </React.Suspense>
                </Main>
            </Div>
        </Box>
    );
};

export default MainLayout;
