import React, {Suspense} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loader from 'src/common/loader/Loader';
import routes from 'src/Routes';

const Content = () => {
    return ( 
        <Suspense fallback={<Loader />}>
            <Switch>
                {routes.map((route, idx) => {
                    return route.component && (
                        <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => <route.component {...props} />} 
                        />
                    )
                })}
                <Redirect from="/" to="/admin/dashboard" />
                <Redirect from="/admin" to="/admin/dashboard" />
            </Switch>
        </Suspense>
    );
}
 
export default Content;