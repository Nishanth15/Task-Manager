import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

function PId() {
    const [project, setProject] = useState([]);
    const router = useRouter();
    const { pid } = router.query;
    const url = 'http://localhost:5000/api/project/' + pid;
    const getProjects = () => {
        if (pid !== undefined) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => setProject(data));
        }
    };

    useEffect(() => {
        getProjects();
    }, [pid]);

    const { name, parentId } = project;
    return (
        <div className="project">
            <Head>
                <title>{name}</title>
            </Head>
            <div>
                <h1 className="text-5xl">Project</h1>
                <h5>Name: {name}</h5>
                <p>ParentId: {parentId}</p>
            </div>
        </div>
    );
}

export default PId;
