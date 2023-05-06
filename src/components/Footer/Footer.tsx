import Link from "next/link";
import Image from "next/image";
import React from "react";

type FooterColumn = {
  title: string;
  links: FooterColumnLink[];
};

type FooterColumnLink = {
  href: string;
  label: string;
};

const FooterColumnLink = ({ href, label }: FooterColumnLink) => {
  return (
    <li className="mb-2 leading-6">
      <Link
        href={href}
        className="transition-colors duration-300 hover:text-rose-500 focus:text-rose-600"
      >
        {label}
      </Link>
    </li>
  );
};

const FooterColumn = ({ title, links }: FooterColumn) => {
  return (
    <nav
      className="col-span-2 md:col-span-4 lg:col-span-2"
      aria-labelledby="footer-product-5-logo"
    >
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-medium tracking-wider text-black">
          {title}
        </h3>
        <ul className="space-y-2">
          {links.map((link) => (
            <FooterColumnLink key={link.href} {...link} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

/* Demo Footer Columns */
// TODO: Find a better way to set the site footer columns
const footerColumns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      {
        href: "/events",
        label: "Events",
      },
      {
        href: "/about",
        label: "About Us",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        href: "/partners",
        label: "Become a Partner",
      },
      {
        href: "/contact",
        label: "Contact Us",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="text-slate-500">
      <div className="border-t border-slate-200 bg-[#fcfcfc] pb-12 pt-16 text-sm">
        <div className="container">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div
              className="col-span-4 md:col-span-8"
              aria-labelledby="footer-header"
            >
              <Link
                id="AirES"
                aria-label="AirES logo"
                aria-current="page"
                className="inline-flex items-center gap-2 whitespace-nowrap text-lg focus:outline-none"
                href="/"
              >
                <Image
                  src="/aires.svg"
                  alt="AirES"
                  width={50.89}
                  height={32}
                  priority
                />
              </Link>
              <p className="mt-4 max-w-xs">
                AirES specializes in making extreme sports tourism easy and fun
              </p>
            </div>
            {footerColumns.map((column) => (
              <FooterColumn key={column.title} {...column} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
export { Footer as FooterNotMemoized };
