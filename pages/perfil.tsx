// El usuario puede ver info de su perfil y editarla/borrarla

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LayoutAuthenticated from "../components/layout/layoutAuthenticated"
import FastAPIClient from "@/client/client"
import IUser from "@/types/IUser"
import Head from "next/head"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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


              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold">Tu Perfil</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <p className="font-bold">First Name:</p>
                    <p>{profile.first_name}</p>

                    <p className="font-bold">Last Name:</p>
                    <p>{profile.last_name}</p>

                    <p className="font-bold">Email:</p>
                    <p>{profile.email}</p>

                    <p className="font-bold">Birthday:</p>
                    <p>{profile.birthday}</p>

                    <p className="font-bold">Address:</p>
                    <p>{profile.address || "Not provided"}</p>

                    <p className="font-bold">Privilege:</p>
                    <p>{profile.privilege}</p>
                  </div>
                </CardContent>
              </Card>


            </div>
          )}
        </div>
      </LayoutAuthenticated>
    </>
  )
}