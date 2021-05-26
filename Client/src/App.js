import Layout from './components/Layout';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import routes from './router/';
import SignUp from './pages/Onboard/sign-up';
import SignIn from './pages/Onboard/sign-in';
import PageNotFound from './pages/404NotFound';
import ProtectedRoute from './helpers/ProtectedRoute';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/notfound" component={PageNotFound} />
                    <ProtectedRoute component={Layout}>
                        {routes.map((route, index) => (
                            <Switch key={index}>
                                <Redirect exact path="/" to="/inbox" />
                                <Route
                                    exact
                                    path={route.path}
                                    component={route.component}
                                />
                            </Switch>
                        ))}
                    </ProtectedRoute>
                    <Redirect path="*" to="/notfound" />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
