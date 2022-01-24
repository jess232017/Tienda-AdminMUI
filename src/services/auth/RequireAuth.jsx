import React from 'react';
import { Navigate } from 'react-router-dom';

import useHeaderJwt from '_@/services/hooks/useHeaderJwt';

const RequireAuth = ({ redirect, children, require = true }) => {
    const { isAuthenticated, isExpired } = useHeaderJwt();
    const isAuthed = !isExpired() && isAuthenticated();
    const isOk = isAuthed === require;

    return isOk ? children : <Navigate to={redirect} />;
}

export default RequireAuth;
