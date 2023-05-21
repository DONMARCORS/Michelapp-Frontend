import Link from "next/link"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export function Navbar({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav className={cn("flex items-center justify-between py-4", className)} {...props}>
            <div className="flex items-center space-x-4 lg:space-x-6 m-2 ml-4">
                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                    Home
                </Link>
                <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                    About
                </Link>
                <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                    Contact
                </Link>
            </div>

            <div className="flex items-center space-x-4 lg:space-x-6 ml-auto mr-4">
                <Link href="/signup" className="text-sm font-medium transition-colors hover:text-primary">
                    <Button
                        variant="default"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Registrarse
                    </Button>

                </Link>
                <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                    <Button
                        variant="outline"
                        className="text-sm font-medium transition-colors hover:text-primary"
                    >
                        Login
                    </Button>

                </Link>

            </div>


        </nav>
    )
}