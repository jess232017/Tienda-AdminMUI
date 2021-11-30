import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit'

const useHeaderJwt = () => {
    const isAuthenticated = useIsAuthenticated();
    const authHeader = useAuthHeader();
    let jwtHeader = {};

    if(isAuthenticated()){
        jwtHeader = JSON.parse(window.atob(authHeader().split('.')[1]))
    }

    const isExpired = () => {
        return isAuthenticated() ? jwtHeader.exp * 1000 < Date.now() : true;
    }
    
    return {jwtHeader, isAuthenticated, isExpired};
}
 
export default useHeaderJwt;