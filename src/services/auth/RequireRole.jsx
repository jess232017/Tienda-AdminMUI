import React from 'react';

import useHeaderJwt from '../hooks/useHeaderJwt';
import Forbidden from '../../pages/error/Forbidden';
import Loader from '_@/components/Loader';

const RequireRole = ({ children, roles }) => {
    const { jwtHeader } = useHeaderJwt();
    const { role: currentRole } = jwtHeader || {};

    const permissionGranted = roles?.some(role => role === currentRole);

    if (permissionGranted || roles === undefined) {
        return (
            <React.Suspense fallback={<Loader />}>
                {children}
            </React.Suspense>
        )
    }

    return <Forbidden />
}

export default RequireRole;
