import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from 'next/head'
import Image from "next/image"
import { Command, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserSignupForm } from "@/components/auth/userSignupForm"
import FastAPIClient from "@/client/client"
import IUser from "@/types/IUser"

export default function SignUp() {
  const client = new FastAPIClient({});
  const router = useRouter();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [content, showContent] = useState<boolean>(false);

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
        <title>Registro</title>
        <meta name="description" content="Michelapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {content && !redirecting ? (
        <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Iniciar Sesión
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
              <Command className="mr-2 h-6 w-6" /> Michelapp
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
          <div className="lg:p-8 ">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
              <div className="flex flex-col space-y-2 text-center mt-10">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Crea tu cuenta
                </h1>
                <p className="text-sm text-muted-foreground">
                  Ingresa tu correo y contraseña para registrate
                </p>
              </div>
              <UserSignupForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                Al dar click en continuar aceptas nuestros {" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terminos y condiciones
                </Link>{" "}
                y{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      ) : (null)}
    </>
  )
}