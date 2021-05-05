import React from 'react';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


function ProtectedRoute({component:Component,...rest}) {
    const router = useRouter();
    const [verified, setVerified] = useState(false);

    if (!verified) {
      useEffect(() => {
        router.push('/unauthorized', undefined, { shallow: true });
      }, []);
    }
    return(
      <Component {...rest} />
    );
}

export default ProtectedRoute
