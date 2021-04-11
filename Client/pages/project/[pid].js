import { useRouter } from 'next/router';

function PId() {
    const router = useRouter();
    const { pid } = router.query;

    return <p>Project: {pid}</p>;
}

export default PId;
