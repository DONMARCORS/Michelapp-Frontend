import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Command } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/auth/userLoginForm"

import FastAPIClient from "@/client/client";
import IUser from "@/types/IUser";
import Head from "next/head"


export default function Login() {

  const client = new FastAPIClient({});
  const router = useRouter();
  const [content, showContent] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(() => {
    fetchUser();
  }, []);


  const fetchUser = async () => {

    try {
      const user = await client.fetchUser() as IUser;
      if (user) {
        router.push("/perfil");
        setRedirecting(true);
      }

    }
    catch (error) {
      console.log(error);
    }
    finally {
      showContent(true);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Michelapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content && !redirecting ? (
        <>

          <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 w-screen">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "absolute right-4 top-4 md:right-8 md:top-8"
              )}
            >
              Registrarse
            </Link>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
              <div className="absolute inset-0">
                {/* Update the style property */}
                <Image
                  src="/photoLogin.jpg"
                  alt="background image"
                  layout="fill"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="relative z-20 flex items-center text-lg font-medium">
                <Link href="/">
                  <Command className="mr-2 h-6 w-6" /> Michelapp
                </Link>
              </div>
              <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                  <p className="text-lg">
                    &ldquo;Las mejores bebidas preparadas que he probado!&rdquo;
                  </p>
                  <footer className="text-sm">Sofia Perez</footer>
                </blockquote>
              </div>
            </div>
            <div className="lg:p-6">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center  mt-10">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Bienvenido a Michelapp
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Ingresa tu correo y contraseña para continuar
                  </p>
                </div>
                <UserAuthForm />

              </div>
            </div>
          </div>

        </>
      ) : (null)}
    </>
  )
}