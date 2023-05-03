import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        variables: {
          colorPrimary: "#be2134",
        },
      }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
