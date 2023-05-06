"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "../ui/button"


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                <Link href="/">
                    Logo
                </Link>
                </div>
                <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/docs">
                    Menu
                    </Link>
                    <Link href="/blog">
                    Blog
                    </Link>
                    <Link href="/about">
                    Sobre nosotros
                    </Link>
                </div>
                </div>
            </div>
            <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                
                <div className="ml-3 relative">
                    <Link href="/login">
                    <Button variant="default">Iniciar sesión</Button>
                    </Link>
                </div>

                <div className="ml-3 relative">
                    <Link href="/signup">
                    <Button variant="secondary">Registrarse</Button>
                    </Link>
                </div>


                </div>
            </div>
            
            </div>
        </div>
    </nav>


   
  )
}
