import Layout from './components/Layout';
import Inbox from '../src/pages/inbox';
import Calender from '../src/pages/calender';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Layout>
                <Router>
                    <Route path="/inbox" component={Inbox} />
                    <Route path="/calender" component={Calender} />
                    {/* <Route path="/project" component={Project}></Route> */}
                </Router>
            </Layout>
        </div>
    );
};

export default App;
