import React from 'react';

import useHeaderJwt from '../hooks/useHeaderJwt';
import Forbidden from '../../views/error/Forbidden';

const RequireRole = ({children, roles}) => {
    const { jwtHeader } = useHeaderJwt();
    const { role: currentRole } = jwtHeader || {};

    const permissionGranted = roles?.some( role => role === currentRole);

    if(permissionGranted || roles === undefined){
        return <>{children}</>
    }

    return <Forbidden/>
}

export default RequireRole;