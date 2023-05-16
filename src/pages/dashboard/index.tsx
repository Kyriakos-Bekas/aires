import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { ProtectedPage } from "~/components";

import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const { user } = useUser();

  return (
    <ProtectedPage>
      <Head>
        <title>Partner Dashboard | AirES</title>
        <meta
          name="description"
          content="Manage your event posts through your presonalized dashboard"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container grid grid-cols-2 items-center py-8">
        <div className="grid h-full w-full grow grid-rows-2 items-center text-center">
          <h1 className="text-xl">
            This is your dashboard,{" "}
            <span className="font-semibold">{user?.fullName}</span>!
          </h1>
        </div>
      </main>
    </ProtectedPage>
  );
};

export default Dashboard;
