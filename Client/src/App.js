import Layout from './components/Layout/Layout';
import Inbox from '../src/pages/inbox/index';
import Calender from '../src/pages/calender/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
    return (
        <div>
            <Layout >
                <Router>
                    <Route path='/inbox' component={Inbox} />
                    <Route path='/calender' component={Calender} />
                </Router>
            </Layout>
        </div>
    );
}

export default App;
