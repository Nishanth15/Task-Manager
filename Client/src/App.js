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
import ProtectedRoute from './helpers/ProtectedRoute';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <ProtectedRoute component={Layout}>
                        <Redirect path="/" to="/inbox" />
                        {routes.map((route, index) => (
                            <Switch key={index}>
                                <Route path="/">
                                    <Redirect to="/inbox"></Redirect>
                                </Route>
                                <Route
                                    path={route.path}
                                    component={route.component}
                                    exact
                                />
                            </Switch>
                        ))}
                    </ProtectedRoute>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
