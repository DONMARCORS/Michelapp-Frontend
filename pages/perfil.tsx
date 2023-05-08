import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LayoutAuthenticated from "../components/layout/layoutAuthenticated"
import FastAPIClient from "@/client/client"
import IUser from "@/types/IUser"
import Head from "next/head"

export default function User() {
  const [profile, setProfile] = useState<IUser>()
  const client = new FastAPIClient({})
  const router = useRouter()
  useEffect(() => {
    fetchContent()
  }, [])


  async function fetchContent() {
    try {

      const user = await client.fetchUser()

      console.log(user)
      if (user) {
        setProfile(user)
      }

    }
    catch (error) {
      router.push("/login")
      console.log(error)

    }

  }

  return (
    <>
      <Head>
        <title>Perfil</title>
        <meta name="description" content="Michelapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutAuthenticated>
        <div className="flex flex-col items-center justify-center w-screen h-screen">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Welcome {profile?.first_name}</h1>
          </div>
        </div>
      </LayoutAuthenticated>
    </>
  )
}