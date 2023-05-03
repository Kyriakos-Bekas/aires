import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { isSignedIn, user } = useUser();

  return (
    <>
      <Head>
        <title>AirES</title>
        <meta name="description" content="AirES" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="text-white">
          {isSignedIn ? (
            <div>
              <h2>Hello {user.fullName}!</h2>
              <div className="mt-4">
                <SignOutButton />
              </div>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
