import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import { Poppins } from "next/font/google";
import type { AppType } from "next/app";
import { fontFamily } from "tailwindcss/defaultTheme";

import { api } from "~/utils/api";

import "~/styles/globals.css";

/* Global Font Configuration */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <style>{`:root { --font-poppins: ${
          poppins.variable
        }, ${fontFamily.sans.join(", ")} }`}</style>
      </Head>
      <ClerkProvider
        {...pageProps}
        appearance={{
          variables: {
            colorPrimary: "#be2134",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          },
        }}
      >
        <div className={`${poppins.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
