import React,{useHistory} from 'react-router-dom';
import { authenticationService } from '../services/auth.service';


function ProtectedRoute({component:Component,...rest}) {
    const history = useHistory();
    let accessToken = authenticationService.accessToken;

    if (accessToken === '' || accessToken === null ) {
        history.push('/sign-in');
    }
    return(
      <Component {...rest} />
    );
}

export default ProtectedRoute
