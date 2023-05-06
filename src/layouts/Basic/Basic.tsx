import { Navigation, Footer } from "~/components";

type BasicLayoutProps = {
  children: React.ReactNode;
};

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-rows-layout-3">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default BasicLayout;
