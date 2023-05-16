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

      <main className="container grid grid-cols-2 items-center py-8">
        <div className="grid h-full w-full grow grid-rows-2 items-center text-center">
          <h1 className="m-4 p-2 text-6xl font-semibold leading-normal">
            <span className="text-red-600">Extreme</span> Sports{" "}
            <span className="italic">
              <span className="text-red-600">extreme</span>ly
            </span>{" "}
            easy!
          </h1>
          <h2 className="text-xl">
            <SignedIn>
              Hello <span className="font-semibold">{user?.fullName}</span>!
            </SignedIn>
            <SignedOut>
              Hello <span className="font-semibold">Guest</span>!
            </SignedOut>
          </h2>
        </div>
        <div className="max-h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
            alt="Ski jump photo"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </main>
    </BasicLayout>
  );
};

export default Home;
