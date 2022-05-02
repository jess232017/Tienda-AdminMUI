import React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';

import Loader from '@/components/Loader';
import CssBaseline from '@mui/material/CssBaseline';

import RequireAuth from '@/services/auth/RequireAuth';

//Pages
const Layout = React.lazy(() => import('@/components/layout/Layout'));
const Auth = React.lazy(() => import('@/pages/auth/Auth'));
const NoFound = React.lazy(() => import('@/pages/error/NoFound'));

const index = () => {
    return (
        <HashRouter>
            <CssBaseline />
            <NiceModal.Provider />
            <React.Suspense fallback={<Loader />}>
                <Routes>
                    <Route index element={<RequireAuth redirect="auth" children={<Navigate to="admin" />} />} />

                    <Route path="auth/*" element={<RequireAuth redirect="/" require={false} children={<Auth />} />} />

                    <Route path="admin/*" element={<RequireAuth redirect="/" children={<Layout />} />} />
                    <Route path="*" element={<NoFound />} />
                </Routes>
            </React.Suspense>
        </HashRouter>
    );
};

export default index;
