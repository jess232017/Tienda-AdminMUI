import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const navigate = useNavigate();
    const signIn = useSignIn();

    const handleLogin = ({ token, estado: authState }) => {
        const { exp } = JSON.parse(atob(token.split('.')[1]));

        //calculate minutes left for token due
        const today = new Date();
        const expire = new Date(exp * 1000);
        const diffMs = expire - today;
        const diffDays = Math.floor(diffMs / 86400000) * 24 * 60;
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000) * 60;
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

        const expiresIn = diffDays + diffHrs + diffMins;
        const signInConfig = { token, expiresIn, authState, tokenType: 'Bearer' };

        if (signIn(signInConfig)) {
            navigate('/');
        } else {
            alert('usuario verificado pero no se pudo realizar el registro interno');
        }
    };

    return { handleLogin };
};

export default useLogin;
