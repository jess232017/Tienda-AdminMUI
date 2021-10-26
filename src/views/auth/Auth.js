import React, { Suspense } from 'react'
import { Redirect, Route, Switch} from 'react-router-dom'

const Login = React.lazy(() => import('./Login'));
const Register = React.lazy(() => import('./Register'));

const loading = (
    <div className="spinner-center">
        <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>
    </div>
)

const Auth = () => {

    return (
        <div className="auth-bg">
            <div className="container">
                <div className="grid-columns-2">
                    <Suspense fallback={loading}>
                        <Switch>
                            <Route 
                                path="/login"
                                render = {props =>(
                                    <Login {...props} />
                                )}/>
                            
                            <Route 
                                path="/sign-up"
                                render = {props =>(
                                    <Register {...props} />
                                )}/>
                            
                            <Redirect from="/" to="/login" />
                        </Switch>
                    </Suspense>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img className="main-logo img-fluid mb-4" width="300" src="https://therichpost.com/wp-content/uploads/2021/06/login_page_image.png" alt="..." />
                        <h1 className="">
                            Distribuidora San José<br className="d-none d-lg-inline" />
                        </h1>
                        <p className="text-sm mb-4">
                            Donde encuentras lo que buscas.
                        </p>
                        <p className="lead text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                        </p>
                    </div>
                </div>    
            </div>
        </div>
    )
}
 
export default Auth;