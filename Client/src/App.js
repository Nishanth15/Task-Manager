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
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <ProtectedRoute component={Layout}>
                        {routes.map((route, index) => (
                            <Switch key={index}>
                                <Redirect path="/" to="/inbox" />
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
