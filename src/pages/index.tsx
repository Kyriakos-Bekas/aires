import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { Navigation } from "~/components";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>AirES</title>
        <meta name="description" content="AirES" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid min-h-screen grid-rows-layout-3">
        <Navigation />
        <main className="container flex items-center">
          <div className="grow text-center">
            <h2 className="text-xl">
              <SignedIn>
                Hello <span className="font-semibold">{user?.fullName}</span>!
              </SignedIn>
              <SignedOut>
                Hello <span className="font-semibold">Guest</span>!
              </SignedOut>
            </h2>
          </div>
        </main>
        <div></div>
      </div>
    </>
  );
};

export default Home;
