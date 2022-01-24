import React from 'react';

import useHeaderJwt from '../hooks/useHeaderJwt';
import { PERMISSIONS } from './permission-maps';

const hasPermission = ({ permissions, scopes }) =>{
    const scopesMap = {};
    scopes.forEach( scope => {
        scopesMap[scope] = true;
    });

    return permissions.some((permissions) => scopesMap[permissions]);
}

const RequireRole = ({children, scopes= []}) => {
    const {role} = useHeaderJwt();
    const permissions = PERMISSIONS[role];
    console.log(permissions);

    const permissionGranted = hasPermission({ permissions, scopes});

    if(permissionGranted) return <></>
    
    return <>{children}</>;
}
 
export default RequireRole;