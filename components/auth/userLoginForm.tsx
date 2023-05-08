"use client"

import * as React from "react"
import { useRouter } from "next/router"

import FastAPIClient from "@/client/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface UserAuthFormState {
  email: string
  password: string
}


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

  const router = useRouter()
  const client = new FastAPIClient({})

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [state, setState] = React.useState<UserAuthFormState>({
    email: "",
    password: "",
  })

  const [error, setError] = React.useState<string | null>(null)


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const res = await client.login(state.email, state.password)
      if (res) {
        console.log("redirecting...")
        setIsLoading(false)
        router.push("/perfil")

      }
    }
    catch (error) {
      console.log(error)
      setIsLoading(false)
      setError("Invalid email or password")
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
              value={state.email}
              onChange={(event) =>
                setState({ ...state, email: event.target.value })
              }
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
              value={state.password}
              onChange={(event) =>
                setState({ ...state, password: event.target.value })
              }
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Iniciar sesión con correo
          </Button>
        </div>

        {error && (
          <div className="mt-4 text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

      </div>

    </div>
  )
}