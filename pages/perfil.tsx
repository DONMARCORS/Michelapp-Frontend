// El usuario puede ver info de su perfil y editarla/borrarla

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LayoutAuthenticated from "../components/layout/layoutAuthenticated"
import FastAPIClient from "@/client/client"
import IUser from "@/types/IUser"
import Head from "next/head"
import { Icons } from "@/components/icons"

export default function User() {


  const [profile, setProfile] = useState<IUser>()
  const [loading, setLoading] = useState<boolean>(true)


  const client = new FastAPIClient({})
  const router = useRouter()
  useEffect(() => {
    fetchProfile()
  }, [])


  async function fetchProfile() {
    try {

      const user = await client.fetchUser()

      console.log(user)
      if (user) {
        setProfile(user)
        setLoading(false)
      }

    }
    catch (error) {
      router.push("/login")
      console.log(error)
    }
  }

  return (
    <>

      <LayoutAuthenticated title="Perfil">
        <div className="flex flex-col items-center justify-center w-screen h-screen">
          {loading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />

          )}
          {!loading && profile && (
             <div className="flex flex-col items-center justify-center">
             <h1 className="text-4xl font-bold">Bienvenido {profile?.first_name}</h1>
           </div>
           )}
        </div>
      </LayoutAuthenticated>
    </>
  )
}