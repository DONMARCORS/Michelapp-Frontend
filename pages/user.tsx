import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LayoutAuthenticated from "../components/LayoutAuthenticated"
import FastAPIClient from "@/client/client"
import IUser from "@/types/IUser"

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
    <LayoutAuthenticated>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">Welcome {profile?.first_name}</h1>
        </div>
      </div>
    </LayoutAuthenticated>
  )
}