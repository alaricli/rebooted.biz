import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, UserRound, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="border-b">
      {/* top bar */}
      <nav className="bg-white py-3">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={"/bar_logo.svg"}
                alt="rebooted.biz logo"
                width={300}
                height={75}
                className="w-auto h-12"
              />
            </Link>
          </div>

          {/* Search Bar - now using shadcn Input */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-4 pr-10"
              />
              <Button
                variant="ghost"
                className="absolute right-0 top-0 h-full aspect-square p-0"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Account and Cart buttons in a flex container */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center">
              <UserRound className="w-5 h-5 mr-2" />
              <Link href="/account">Account</Link>
            </Button>

            <Button
              variant="default"
              className="flex items-center text-white hover:opacity-90"
              style={{ backgroundColor: "#228b22" }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              <Link href="/cart">Cart</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* bottom bar */}
      <nav className="bg-gray-50 py-3 shadow-sm">
        <div className="container mx-auto">
          <ul className="flex items-center justify-center text-base font-medium">
            <li>
              <Button variant="link">
                <Link
                  href={{
                    pathname: "/products",
                    query: { category: "components" },
                  }}
                  className="hover:underline hover:text-blue-500 py-1 px-2"
                >
                  Components
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link">
                <Link
                  href={{
                    pathname: "/products",
                    query: { category: "systems" },
                  }}
                  className="hover:underline hover:text-blue-500 py-1 px-2"
                >
                  Systems
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link">
                <Link
                  href={{
                    pathname: "/products",
                    query: { category: "accessories" },
                  }}
                  className="hover:underline hover:text-blue-500 py-1 px-2"
                >
                  Accessories
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
