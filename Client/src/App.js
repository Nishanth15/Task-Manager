import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './router/';
import SignUp from './pages/Onboard/sign-up';
import SignIn from './pages/Onboard/sign-in';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                <Route path='/sign-in' component={SignIn} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/' component={Layout}>
                <Layout>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                component={route.component}
                                exact
                            />
                        ))}
                    </Switch>
                </Layout>
                </Route>
                </Switch>
              
            </Router>
        </div>
    );
};

export default App;
