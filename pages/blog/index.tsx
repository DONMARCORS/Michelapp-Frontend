import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image"

import Layout from '@/components/layout/layout'
import FastAPIClient from "@/client/client";
import IUser from "@/types/IUser";
import { Icons } from '@/components/icons';
import { Main } from 'next/document';


// Page content, accessible to all users. We wrap in layout component to add navbar and footer
export default function Blog() {
  const client = new FastAPIClient({});
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false); // new state

  useEffect(() => {
    fetchUser()
  }, []);

  const fetchUser = async () => { // We will redirect user to /perfil if user is logged in
    try {
      const user = await client.fetchUser() as IUser;
      if (user) {
        await router.push("/perfil");
        setShowContent(false)

      }
    }
    catch (error) {
      console.log(error);
      setShowContent(true); // set showContent to true after loading is complete and no user is found

    }
    finally {
      setLoading(false);
    }
  }

  return (
    
    <div>
      <Head>
        <title>Michelapp</title>
        <meta name="description" content="Michelapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && ( // While loading (fetching user) we show a loading spinner
        <div className="flex justify-center items-center h-screen  bg-gray-200 w-screen">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          
        </div>
      )}

      {showContent && !loading && ( // When loading is complete and no user is found, we show the page content
        <Layout>
          <h1 className="mb-5 text-center text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-orange-600 xl:inline">Blog Michelapp</span>
          </h1>
          <section className='blog-content-main'>
            <div className='blog-content-1'>
              
              <div className='blog-img'>
                  <img src='./micheladas_blog_bkg.webp'/>
              </div>
              <div className="blog-content">
                  <h2 className='text-center text-2xl font-semibold tracking-tight'>
                      Aqui encontrarás toda la información acerca de nuestras micheladas, novedades
                      y más!
                  </h2>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur perferendis modi in aut 
                      olorem nobis dolore velit vero fugit rem corporis, impedit ipsam molestias quo ad quod quae 
                      quia alias ullam ex optio distinctio, facilis soluta dolorum. Soluta nesciunt, explicabo 
                      labore a culpa numquam impedit molestias. Quibusdam, voluptatem. Lorem ipsum dolor sit amet 
                      consectetur adipisicing elit. Debitis quasi ex, doloribus commodi ducimus delectus eos voluptatibus 
                      soluta. Consequatur quas sapiente consectetur cumque numquam commodi adipisci aperiam ipsam velit.
                  </p>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur perferendis modi in aut 
                      olorem nobis dolore velit vero fugit rem corporis, impedit ipsam molestias quo ad quod quae 
                      quia alias ullam ex optio distinctio, facilis soluta dolorum. Soluta nesciunt, explicabo 
                      labore a culpa numquam impedit molestias. Quibusdam, voluptatem. Lorem ipsum dolor sit amet 
                      consectetur adipisicing elit. Debitis quasi ex, doloribus commodi ducimus delectus eos voluptatibus 
                      soluta. Consequatur quas sapiente consectetur cumque numquam commodi adipisci aperiam ipsam velit.
                  </p>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur perferendis modi in aut 
                      olorem nobis dolore velit vero fugit rem corporis, impedit ipsam molestias quo ad quod quae 
                      quia alias ullam ex optio distinctio, facilis soluta dolorum. Soluta nesciunt, explicabo 
                      labore a culpa numquam impedit molestias. Quibusdam, voluptatem. Lorem ipsum dolor sit amet 
                      consectetur adipisicing elit. Debitis quasi ex, doloribus commodi ducimus delectus eos voluptatibus 
                      soluta. Consequatur quas sapiente consectetur cumque numquam commodi adipisci aperiam ipsam velit.
                  </p>
              </div>
            </div>

            <div className='blog-content-2'>
              <div className='page-1'>
                <div className='blog-img'>
                    <img src='./blogPage1.jpg'/>
                </div>
                <div className='blog-page'>
                  <h2 className='text-center'>Licuachelas, la nueva michelada</h2>
                  <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id eos voluptates explicabo iste 
                    odit sit! Incidunt ipsum dolores exercitationem, aliquid beatae modi deserunt optio. 
                    Recusandae quo repellendus est pariatur culpa.</p>
                  <Link href="/blog" passHref className='blog-page-link'>
                    Saber más
                  </Link>
                </div>
              </div>
              <div className='page-2'>
                <div className='blog-img'>
                    <img src='./blogPage2.jpeg'/>
                </div>
                <div className='blog-page'>
                  <h2 className='text-center'>¿Cuántos tipos de cerveza existen?</h2>
                  <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id eos voluptates explicabo iste 
                    odit sit! Incidunt ipsum dolores exercitationem, aliquid beatae modi deserunt optio. 
                    Recusandae quo repellendus est pariatur culpa, incidunt ipsum dolores exercitationem, 
                    aliquid beatae modi deserunt optio. 
                    Recusandae quo repellendus est pariatur culpa.</p>
                  <Link href="/blog" passHref className='blog-page-link'>
                    Saber más
                  </Link>
                </div>
              </div>
              <div className='page-3'>
                <div className='blog-img'>
                    <img src='./blogPage3.jpg'/>
                </div>
                <div className='blog-page'>
                  <h2 className='text-center'>¿Cuántas marcas de cerveza existen actualmente en el país?</h2>
                  <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id eos voluptates explicabo iste 
                    odit sit! Incidunt ipsum dolores exercitationem, aliquid beatae modi deserunt optio. 
                    Recusandae quo repellendus est pariatur culpa.</p>
                  <Link href="/blog" passHref className='blog-page-link'>
                    Saber más
                  </Link>
                </div>
              </div>
            </div>
            
          </section>
        </Layout>
    )}
    </div>
  )
}
