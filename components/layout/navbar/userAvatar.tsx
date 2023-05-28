import { useRouter } from "next/router"


import { CreditCard, LogOut, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface UserNavProps {
  username: string
  email: string
  privilege: number
}


export function UserAvatar({ username, email,  privilege}: UserNavProps) {
  const router = useRouter()

  function logout() {
    console.log("logout")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  function perfil() {
    router.push("/perfil")
  }

  function configuracion() {
    console.log("Configuracion")
    if(privilege == 3) {

      router.push("/configuracionCliente")
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full mr-10">
          <Avatar className="h-10 w-10 ">
            {/*<AvatarImage src="/avatars/01.png" alt="@avatar" />*/}
            <AvatarFallback className="bg-gray-300 text-gray-500 ">{username[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={perfil}>
            <User className="mr-2 h-4 w-4" />
            <span >Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Pago</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={configuracion}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span >Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}