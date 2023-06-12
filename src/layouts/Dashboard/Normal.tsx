import { Footer, Navigation } from "~/components";
import { useRouter } from "next/router";

type DashboardNormalLayoutProps = {
  children: React.ReactNode;
};

const DashboardNormalLayout = ({ children }: DashboardNormalLayoutProps) => {
  const router = useRouter();

  return (
    <div className="grid min-h-screen grid-rows-layout-3">
      <Navigation
        navLinks={[
          { href: "/", label: "Home" },
          { href: "/events", label: "Events" },
          { href: "/about", label: "About" },
          { label: "Your Plans", href: "/plans" },
        ]}
      />
      {children}
      {router.asPath === "/plans" ? (
        <footer className="px-4 pb-6 pt-10 text-center">
          <p className="text-sm text-slate-500">
            Thank you for choosing to use our platform! &#128293;
          </p>

          <p className="mt-6 text-xs text-slate-400">
            &copy; AirES 2023 - All rights reserved
          </p>
        </footer>
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default DashboardNormalLayout;
