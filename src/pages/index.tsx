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
    </BasicLayout>
  );
};

export default Home;
