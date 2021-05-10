import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './router/';

const App = () => {
    return (
        <div>
            <Router>
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
            </Router>
        </div>
    );
};

export default App;
