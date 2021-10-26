import {useAuthHeader, useIsAuthenticated} from 'react-auth-kit'

const useHeaderJwt = () => {
    const isAuthenticated = useIsAuthenticated();
    const authHeader = useAuthHeader();
    let decodedJwtJsonData = {
        isAuthenticated : false
    };

    if(isAuthenticated()){
        decodedJwtJsonData = JSON.parse(window.atob(authHeader().split('.')[1]));
        decodedJwtJsonData.isAuthenticated = true;
    }
    
    return decodedJwtJsonData;
}
 
export default useHeaderJwt;