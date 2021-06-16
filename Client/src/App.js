import Layout from './components/Layout';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import routes from './router/';
import ProtectedRoute from './helpers/ProtectedRoute';
import SignUp from './pages/Onboard/sign-up';
import SignIn from './pages/Onboard/sign-in';
import PageNotFound from './pages/404NotFound';

const App = () => {
    return (
        <div>
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
        </div>
    );
};

export default App;
