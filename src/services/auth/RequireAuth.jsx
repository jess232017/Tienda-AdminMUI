import React from 'react'
import { Navigate } from 'react-router-dom'

import useHeaderJwt from '@/services/hooks/useHeaderJwt'

/**
 * This is a simple component that can be used to protect a private route. It controls whether it should allow navigation to a requested route based on given context.
 * @param {string} redirect
 * @returns
 */
const RequireAuth = ({ redirect, children, require = true }) => {
    const { isAuthenticated, isExpired } = useHeaderJwt()
    const isAuthed = !isExpired() && isAuthenticated()
    const isOk = isAuthed === require

    return isOk ? children : <Navigate to={redirect} />
}

export default RequireAuth
