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

    const section = [
        {
            name: 'Section1',
            task: ['task1', 'task2'],
        },
        {
            name: 'Section2',
            task: ['task3', 'task4'],
        },
        {
            name: 'Section3',
            task: ['task5', 'task6'],
        },
    ];

    const { name, parentId } = project;
    return (
        <div className="project">
            <Head>
                <title>{name}</title>
            </Head>

            <div>
                <h1 className="project_title">{name}</h1>
            </div>

            <ul className="section_list">
                <div className="section_item">
                    <div className="section_name">Todo</div>
                    <div className="task">Lorem ipsum dolor sit</div>
                    <div className="task">
                        As amet consectetur adipisicing elit.
                    </div>
                    <div className="task">Facilis, asperiores ullam?</div>
                </div>
                <div className="section_item">
                    <div className="section_name">On going</div>
                    <div className="task">Minima magnam quas ab adipisci</div>
                    <div className="task">
                        Quisquam cumque repellat nulla exercitationem.
                    </div>
                </div>
                <div className="section_item">
                    <div className="section_name">Done</div>
                    <div className="task">Doloribus tempore eum.</div>
                </div>
                <div className="section_item">
                    <div className="section_name">Additional</div>
                    <div className="task"></div>
                </div>
            </ul>
        </div>
    );
}

export default PId;
