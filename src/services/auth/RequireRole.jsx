import React, { Suspense } from 'react';

import useHeaderJwt from '_@/services/hooks/useHeaderJwt';
import Forbidden from '../../pages/error/Forbidden';
import Loader from '_@/components/LoaderPage';

const RequireRole = ({ children, roles }) => {
    const { jwtHeader } = useHeaderJwt();
    const { role: currentRole } = jwtHeader || {};

    const permissionGranted = roles?.some((role) => currentRole?.includes(role));

    if (permissionGranted || roles === undefined) {
        return <Suspense fallback={<Loader />}>{children}</Suspense>;
    }

    return <Forbidden />;
};

export default RequireRole;
