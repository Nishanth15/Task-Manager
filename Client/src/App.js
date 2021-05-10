import Layout from './components/Layout';
import Inbox from '../src/pages/Inbox/index';
import Calender from '../src/pages/Calender/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
