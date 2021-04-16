import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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
        <div>
            <h5>Project Name: {name}</h5>
            <p>ParentId: {parentId}</p>
        </div>
    );
}

export default PId;
