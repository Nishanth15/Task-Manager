import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Preloader from './components/Preloader';
import routes from './router/';
import { withRouter } from 'react-router-dom';
const SignUp = lazy(
    () =>
        new Promise((resolve, reject) =>
            setTimeout(() => resolve(import('./pages/Onboard/sign-up')), 1500)
        )
);
const PageNotFound = lazy(() => import('./pages/404NotFound'));

const SignIn = lazy(
    () =>
        new Promise((resolve, reject) =>
            setTimeout(() => resolve(import('./pages/Onboard/sign-in')), 1500)
        )
);
const ProtectedRoute = lazy(
    () =>
        new Promise((resolve, reject) =>
            setTimeout(() => resolve(import('./helpers/ProtectedRoute')), 1500)
        )
);

const App = () => {
    return (
        <Suspense fallback={<Preloader />}>
            <Router>
                <Switch>
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route
                        exact
                        path="/notfound"
                        component={PageNotFound}
                    ></Route>
                    <Redirect exact path="/" to="/inbox" />
                    <Route>
                        <Layout>
                            <Switch>
                                {routes.map((route, index) => (
                                    <ProtectedRoute
                                        exact
                                        key={index}
                                        path={route.path}
                                        component={route.component}
                                    ></ProtectedRoute>
                                ))}
                                <Redirect to="/notfound" />
                            </Switch>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        </Suspense>
    );
};

export default withRouter(App);
