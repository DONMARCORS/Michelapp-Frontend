import { useRouter } from 'next/router';

const Producto = () => {
    const router = useRouter();
    const { id } = router.query;
    
    return (
        <div>
        <h1>Producto: {id}</h1>
        </div>
    );
    }
