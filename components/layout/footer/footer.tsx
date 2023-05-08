import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-4 mt-auto bottom-0 w-full">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          <div className="px-5 py-2 text-base text-white hover:text-gray-100">
            <Link href="/" passHref>
              Inicio
            </Link>
          </div>
          <div className="px-5 py-2  text-base text-white hover:text-gray-100">
            <Link href="/shop" passHref>
              Comprar ahora
            </Link>
          </div>
          <div className="px-5 py-2  text-base text-white hover:text-gray-100">
            <Link href="/about" passHref>
              Sobre nosotros
            </Link>
          </div>
          <div className="px-5 py-2  text-base text-white hover:text-gray-100">
            <Link href="/blog" passHref>
              Blog
            </Link>
          </div>
          <div className="px-5 py-2  text-base text-white hover:text-gray-100">
            <Link href="/contact" passHref>
              Contáctanos
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center">
          <p className="text-base text-gray-300">&copy; 2023 Michelapp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
