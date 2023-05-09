import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { BasicLayout } from "~/layouts";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { user } = useUser();

  return (
    <BasicLayout>
      <Head>
        <title>AirES</title>
        <meta name="description" content="AirES" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid min-h-screen grid-rows-layout-3">
        <Navigation />
        <main className="container grid grid-cols-2 items-center">
          <div className="grid grid-rows-2 items-center grow text-center h-full w-full">
            <h1 className="font-semibold text-6xl p-2 m-4"><a className="text-red-600">Extreme</a> Sports <i><a className="text-red-600">extreme</a>ly</i> easy!</h1>
            <h2 className="text-xl">
              <SignedIn>
                Hello <span className="font-semibold">{user?.fullName}</span>!
              </SignedIn>
              <SignedOut>
                Hello <span className="font-semibold">Guest</span>!
              </SignedOut>
            </h2>
            
          </div>
          <div className="overflow-hidden max-h-full">
            <img src="https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80" alt="Ski jump photo" className="h-full w-full object-cover rounded-xl"/>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
