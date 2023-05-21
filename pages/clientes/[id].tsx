import { useRouter } from "next/router";

const Cliente = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Cliente: {id}</h1>
        </div>
    );
}
