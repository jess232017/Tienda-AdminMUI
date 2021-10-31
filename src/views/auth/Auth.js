import React, { Suspense } from 'react'
import { Redirect, Route, Switch} from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Loader from 'src/components/Loader';

const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));

const Auth = ({isExpired = false}) => {

    return (
        <div className="auth-bg">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 px-lg-4">
                        <Suspense fallback={Loader}>
                            <Switch>
                                <Route path="/login">
                                    <Login isExpired={isExpired}/>
                                </Route>
                                <Route path="/sign-up">
                                    <Register/>
                                </Route>
                                <Redirect from="/" to="/login" />
                            </Switch>
                        </Suspense>
                    </div>
                    <div className="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center d-flex flex-column justify-content-center align-items-center">
                        <img className="main-logo img-fluid mb-4" width="300" src="https://therichpost.com/wp-content/uploads/2021/06/login_page_image.png" alt="..." />
                        <Typography variant="h1">
                            Distribuidora San José
                        </Typography>
                        <Typography variant="subtitle2">
                            Donde encuentras lo que buscas.
                        </Typography>
                        <Typography variant="subtitle1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                        </Typography>
                    </div>
                </div>    
            </div>
        </div>
    )
}
 
export default Auth;