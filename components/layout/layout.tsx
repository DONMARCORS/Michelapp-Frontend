
import Footer from "./footer/footer";
import { Navbar } from "./navbar/navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <Navbar className = "sticky top-0 z-10"/>
            <main className="w-screen"
            >{children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;