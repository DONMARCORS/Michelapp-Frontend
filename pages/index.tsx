import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Layout>
        
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center">
            Bienvenido a Michelapp
          </h1>
          <p className="text-center">
            Ordena tus micheladas con un solo click
          </p>
        </div>
      </Layout>


      
    </main>
  )
}
