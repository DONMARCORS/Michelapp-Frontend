import { useRouter } from 'next/router';
 
export default function Vendedor() {
  const router = useRouter();
  return <p>Vendedor: {router.query.id}</p>;
}