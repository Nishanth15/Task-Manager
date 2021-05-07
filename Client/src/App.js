import Layout from './components/Layout';
import Inbox from '../src/pages/Inbox/index';
import Calender from '../src/pages/Calender/index';
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
