import { Navigation } from "~/components";

type DashboardPartnerLayoutProps = {
  children: React.ReactNode;
};

const DashboardPartnerLayout = ({ children }: DashboardPartnerLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-rows-layout-3">
      <Navigation
        navLinks={[{ label: "Your Events", href: "/dashboard/events" }]}
      />
      {children}
      <footer className="px-4 pb-6 pt-10 text-center">
        <p className="text-sm text-slate-500">
          Thank you for choosing to work with us! &#128293;
        </p>

        <p className="mt-6 text-xs text-slate-400">
          &copy; AirES 2023 - All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default DashboardPartnerLayout;
