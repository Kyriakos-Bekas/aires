import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="container flex items-center justify-start gap-4 py-4 lg:gap-6">
        <Link href="/" className="mr-auto">
          <Image src="/aires.svg" alt="AirES" width={40} height={40} priority />
        </Link>

        <div className="flex items-center justify-start gap-4 lg:gap-6">
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <button className="btn">Log in</button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
