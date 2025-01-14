import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link href="/">BrandLogo</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:underline">
              Components
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              Systems
            </Link>
          </li>
          <li>
            <Link href="/products" className="hover:underline">
              Accessories
            </Link>
          </li>
          <li>
            <Link href="/contact" className="border p-2 rounded-lg">
              Sell to Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
