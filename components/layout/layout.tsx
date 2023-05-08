
import Footer from "./footer/footer";
import { Navbar } from "./navbar/navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <Navbar />
            <main className="h-screen "
            >{children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;