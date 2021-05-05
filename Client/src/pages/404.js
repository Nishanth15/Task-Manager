import React from 'react'
import { useEffect } from 'react/cjs/react.development'
import NotFound from '../pages/not-found';
import { useRouter } from "next/router";

function Custom404() {
    const router = useRouter();

    useEffect(() => {
        router.prefetch('/not-found', undefined, { shallow: true });
      }, [])
      return (<NotFound />);
}

export default Custom404
