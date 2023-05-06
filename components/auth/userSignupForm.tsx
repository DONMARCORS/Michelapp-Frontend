"use client"

import * as React from "react"

import { useRouter } from "next/router"

import FastAPIClient from "@/client/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

interface UserSignupFormProps extends React.HTMLAttributes<HTMLDivElement> { }
interface UserSignupFormState {
  nombre: string
  email: string
  birthday: string
  password: string
}

export function UserSignupForm({ className, ...props }: UserSignupFormProps) {
  const router = useRouter()
  const client = new FastAPIClient({})

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [state, setState] = React.useState<UserSignupFormState>({
    nombre: "",
    email: "",
    birthday: "",
    password: "",
  })
  const [error, setError] = React.useState<string | null>(null)



  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const res = await client.register(state.nombre, state.email, state.password, state.birthday)
      if (res) {
        setIsLoading(false)
        router.push("/login")

      }
    } catch (error) {
      setIsLoading(false)
      setError("Invalid email or password")
    }

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Nombre
              </Label>
              <Input
                id="nombre"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoComplete="text"
                autoCorrect="off"
                disabled={isLoading}
                required
                value={state.nombre}
                onChange={(event) => setState({ ...state, nombre: event.target.value })}
              />
            </div>
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
              onChange={(event) => setState({ ...state, email: event.target.value })}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Fecha de Nacimiento
            </Label>
            <Input
              id="birthday"
              placeholder="dd/mm/aaaa"
              type="date"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
              value={state.birthday}
              onChange={(event) => setState({ ...state, birthday: event.target.value })}

            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Contraseña
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
              onChange={(event) => setState({ ...state, password: event.target.value })}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrarse
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
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