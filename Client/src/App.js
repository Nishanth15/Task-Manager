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

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Layout>
                        <Route path="/">
                            <Redirect to="/inbox"></Redirect>
                        </Route>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                component={route.component}
                                exact
                            />
                        ))}
                    </Layout>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
