import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { BasicLayout } from "~/layouts";
import { api } from "~/utils/api";
import Link from "next/link";

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

      <main className="container grid auto-rows-min grid-cols-1 py-8 lg:grid-cols-2 lg:items-center">
        <div className="grid h-full w-full grow grid-rows-2 items-center text-center">
          <h1 className="m-4 grid grid-rows-2 p-2 text-4xl font-semibold leading-normal md:grid-rows-2 md:text-6xl lg:grid-rows-2 lg:text-6xl">
            <span className="text-red-600">
              Extreme <span className="text-black">Sports</span>
            </span>{" "}
            <span className="italic">
              <span className="text-red-600">
                extreme<span className="text-black">ly easy!</span>
              </span>
            </span>{" "}
          </h1>
          <h2 className="lg:text-xl">
            <SignedIn>
              Hello{" "}
              <span className="font-semibold">
                {user?.fullName} <span className="font-medium">!</span>
              </span>
            </SignedIn>
            <SignedOut>
              Hello{" "}
              <span className="font-semibold">
                Guest <span className="font-medium">!</span>
              </span>
            </SignedOut>
          </h2>
        </div>
        <div className="h- overflow-hidden lg:max-h-full">
          <img
            src="https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
            alt="Ski jump photo"
            className="rounded-xl object-cover lg:h-full lg:w-full"
          />
        </div>
      </main>
    </BasicLayout>
  );
};

export default Home;
