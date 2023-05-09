import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

type NavLinkProps = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: NavLinkProps) => (
  <li role="none" className="flex items-stretch">
    <Link
      role="menuitem"
      aria-current={href === "/" ? "page" : "false"}
      aria-haspopup="false"
      tabIndex={0}
      className="flex grow items-center gap-2 rounded-sm px-4 py-2 font-normal text-black transition-colors duration-300 hover:text-rose-600 focus:bg-rose-50 focus:outline-none focus-visible:outline-none lg:rounded-sm lg:px-4 lg:py-2"
      href={href}
    >
      <span className="block text-base">{label}</span>
    </Link>
  </li>
);

/* Demo Nav Links */
// TODO: Find a better way to set the site links
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

const Navigation = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  return (
    <header className="relative z-20 w-full border-b border-slate-200 bg-white/90 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
      <div className="container relative">
        <nav
          aria-label="main navigation"
          className="flex items-stretch justify-start py-4 text-slate-700"
          role="navigation"
        >
          {/* Brand Logo */}
          <Link
            id="AirES"
            aria-label="AirES logo"
            aria-current="page"
            className="flex items-center gap-2 whitespace-nowrap text-lg focus:outline-none "
            href="/"
          >
            <Image
              src="/aires.svg"
              alt="AirES"
              width={50.89}
              height={32}
              priority
            />
            <span className="ml-2 text-xl font-bold text-black transition-colors hover:text-rose-600">
              AirES
            </span>
          </Link>
          {/* Mobile trigger */}
          <button
            className={ clsx(
              "relative order-10 block h-10 w-10 self-center lg:hidden",
              {
                "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 ":
                  isToggleOpen,
              }
            )}
            onClick={() => setIsToggleOpen((prev) => !prev)}
            aria-expanded={isToggleOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
            </div>
          </button>
          {/* Navigation links */}
          <ul
            role="menubar"
            aria-label="Select page"
            className={ clsx(
              "absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-4 pb-12 pt-20 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:ml-24 lg:mr-auto lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100",
              {
                "visible opacity-100 backdrop-blur-sm": isToggleOpen,
                "invisible opacity-0": !isToggleOpen,
              }
            )}
          >
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </ul>
          <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-red-700 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-rose-200 transition duration-300 hover:bg-rose-600 hover:shadow-sm hover:shadow-rose-200 focus:bg-rose-700 focus:shadow-sm focus:shadow-rose-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-rose-300 disabled:bg-rose-300 disabled:shadow-none rounded-3xl">
                  <span>Log in</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Navigation);
export { Navigation as NavigationNotMemoized };
