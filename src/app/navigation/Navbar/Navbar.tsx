import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div>
      {/* top bar */}
      <nav className="bg-gray-50 border-b border-gray-200 py-2">
        <div className="container mx-auto flex items-center">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link href="/">
              <Image
                src={"/bar_logo.svg"}
                alt="rebooted.biz logo"
                width={300}
                height={75}
                className=""
              />
            </Link>
          </div>

          {/* Top Navigation Links */}
          <ul className="flex text-sm space-x-6">
            <li>
              <Link
                href="/"
                className="border p-2 rounded-lg border-gray-900  hover:scale-105 transition-transform"
              >
                Trade-In
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:underline">
                Help
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* bottom bar */}
      <nav className="bg-gray-100 py-4 shadow-sm ">
        <div className="container mx-auto flex items-center justify-center">
          <ul className="flex space-x-8 text-base">
            <li>
              <Link
                href="/components"
                className="hover:underline hover:text-blue-500"
              >
                PC Components
              </Link>
            </li>
            <li>
              <Link
                href="/systems"
                className="hover:underline hover:text-blue-500"
              >
                Systems
              </Link>
            </li>
            <li>
              <Link
                href="/accessories"
                className="hover:underline hover:text-blue-500"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
