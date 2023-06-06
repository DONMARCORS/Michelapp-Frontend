// El usuario puede ver info de su perfil y editarla/borrarla

import { useRouter } from "next/router"
import * as React from "react"
import { useEffect, useState } from "react"
import LayoutAuthenticated from "../components/layout/layoutAuthenticated"
import FastAPIClient from "@/client/client"
import IUser from "@/types/IUser"
import Head from "next/head"
import { Icons } from "@/components/icons"
import {
    Menubar,
    MenubarMenu,
} from "@/components/ui/menubar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface UserUpdateFormState {
    email: string
    address: string
    pass1: string
    pass2: string
}

export default function ConfiguracionCliente() {


    const [profile, setProfile] = useState<IUser>()
    const [loading, setLoading] = useState<boolean>(true)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)

    const [state, setState] = React.useState<UserUpdateFormState>({
        email: "",
        address: "",
        pass1: "",
        pass2: ""
    })

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
            router.push("/perfil")
            console.log(error)
        }
    }

    async function actualizarEmail(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        console.log(state.email)
        try {
            const res = await client.updateClientEmail(profile?.id, state.email)
            if (res) {
                setIsLoading(false)
                router.push("/perfil")
        
            }
        } catch (error) {
            setIsLoading(false)
            setError("Invalid email")
        }
    
    }


    async function actualizarAddress(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        console.log(state.address)
        try {
            const res = await client.updateClientAddress(profile?.id, state.address)
            if (res) {
                setIsLoading(false)
                router.push("/perfil")
        
            }
        } catch (error) {
            setIsLoading(false)
            setError("Invalid address")
        }
    
    }


    async function actualizarContrasena(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const res = await client.updateClientPassword(profile?.id, state.pass1, state.pass2)
            if (res) {
                setIsLoading(false)
                router.push("/perfil")
        
            }
        } catch (error) {
            setIsLoading(false)
            setError("Incorrect password")
        }
    
    }

    async function borrarCuenta(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        console.log(state.pass1)
        console.log(state.pass2)

        try {

            if(state.pass1 == state.pass2) {
                const res = await client.deleteClient(profile?.id, state.pass2)
                if (res) {
                    setIsLoading(false)
                    router.push("/login")
                }

            }else {

                setIsLoading(false)
                setError("Not same passwords")
                
            }

            
        } catch (error) {
            setIsLoading(false)
            setError("Incorrect password")
        }
    
    }


    return (
        <>

        <LayoutAuthenticated title="Configuración de cuenta">
            <Menubar className="barra-config">
                <MenubarMenu>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost">Actualizar Correo</Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Actualizar correo</DialogTitle>
                            <DialogDescription>
                                Actualiza tu correo para poder seguir disfrutando de Michelapp
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Correno nuevo
                                </Label>
                                <Input id="correoNuevo" placeholder="nuevacuenta@correo.com" className="col-span-3"
                                disabled={isLoading}
                                value={state.email}
                                onChange={(event) => setState({ ...state, email: event.target.value })} />
                            </div>
                            </div>
                            <DialogFooter>
                            <Button type="submit" onClick={actualizarEmail}>Actualizar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    
                </MenubarMenu>
                <MenubarMenu>
                <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost">Actualizar Dirección</Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Actualizar dirección</DialogTitle>
                            <DialogDescription>
                                Actualiza tu dirección para poder hacer envíos de Michelapp
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Dirección nueva
                                </Label>
                                <Input id="dirNueva" placeholder="Calle y numero" className="col-span-3" 
                                disabled={isLoading}
                                value={state.address}
                                onChange={(event) => setState({ ...state, address: event.target.value })} />
                            </div>
                            </div>
                            <DialogFooter>
                            <Button type="submit" onClick={actualizarAddress}>Actualizar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </MenubarMenu>
                <MenubarMenu>
                <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost">Actualizar Contraseña</Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Actualizar contraseña</DialogTitle>
                            <DialogDescription>
                                Actualiza tu contraseña para poder seguir disfrutando de Michelapp
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Contraseña anterior
                                </Label>
                                <Input id="contraAnt" type={"password"} className="col-span-3"
                                disabled={isLoading}
                                value={state.pass1}
                                onChange={(event) => setState({ ...state, pass1: event.target.value })} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Contraseña nueva
                                </Label>
                                <Input id="contraNueva" type={"password"} className="col-span-3"
                                disabled={isLoading}
                                value={state.pass2}
                                onChange={(event) => setState({ ...state, pass2: event.target.value })} />
                            </div>
                            </div>
                            <DialogFooter>
                            <Button type="submit" onClick={actualizarContrasena}>Actualizar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </MenubarMenu>
                <MenubarMenu>
                <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Eliminar Cuenta</Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Eliminar cuenta</DialogTitle>
                            <DialogDescription>
                                Eliminar cuenta de Michelapp
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Contraseña
                                </Label>
                                <Input id="contra1"  className="col-span-3" 
                                disabled={isLoading}
                                value={state.pass1}
                                onChange={(event) => setState({ ...state, pass1: event.target.value })} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                Confirmación
                                </Label>
                                <Input id="contra2"  className="col-span-3"
                                disabled={isLoading}
                                value={state.pass2}
                                onChange={(event) => setState({ ...state, pass2: event.target.value })} />
                            </div>
                            </div>
                            <DialogFooter>
                            <Button  variant="destructive" type="submit" onClick={borrarCuenta}>Eliminar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </MenubarMenu>
            </Menubar>

            
            <div className="flex flex-col items-center justify-center w-screen h-screen">
            {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />

            )}
            {!loading && profile && (
                <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Configuiración de tu cuenta</h1>
            </div>
            )}
            </div>
        </LayoutAuthenticated>
        </>
    )


    
}