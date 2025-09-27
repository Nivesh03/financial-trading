import { Link, useLocation } from "@tanstack/react-router";
import MaxWidthWrapper from "./max-width-wrapper";
import { Button, buttonVariants } from "./ui/button";
import IsLoggedIn from "./is-logged-in";
import IsLoggedOut from "./is-logged-out";
import { useLogOut } from "@/hooks/use-user";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();
  const isProductPage = pathname.includes("products");
  const signOut = useLogOut();
  const handleSignOut = () => {
    signOut.mutate();
  };
  return (
    <nav className="sticky z-100 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link to="/" className="flex z-40 font-semibold">
            <span className="text-green-600">Financial</span>Trading
          </Link>
          <div className="h-full flex items-center space-x-4">
            <IsLoggedIn>
              <Button
                onClick={handleSignOut}
                size={"sm"}
                variant={"ghost"}
                className="cursor-pointer"
              >
                Sign Out
              </Button>

              <Button className="cursor-pointer" size={"sm"} variant={"ghost"}>
                <Link to="/">Dashboard</Link>
              </Button>
            </IsLoggedIn>
            <IsLoggedOut>
              <Button variant="ghost" className="cursor-pointer">
                <Link to="/sign-up">Get Started</Link>
              </Button>
              <Button variant="ghost" className="cursor-pointer">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </IsLoggedOut>
            {!isProductPage && (
              <Link
                to="/products"
                className={buttonVariants({
                  size: "sm",
                  className: "hidden sm:flex items-center gap-1",
                })}
              >
                Products <ArrowRight className="size-5 ml-1.5" />
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
