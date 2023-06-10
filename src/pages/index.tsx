import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { BasicLayout } from "~/layouts";
import { api } from "~/utils/api";
import { ImageSlider } from "~/components/ImageSlider/ImageSlider";
import { type EmblaOptionsType } from "embla-carousel-react";
import React from "react";
import ReactDOM from "react-dom/client";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

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
        <div className="overflow-hidden lg:max-h-full">
          <ImageSlider slides={SLIDES} options={OPTIONS} />
        </div>
      </main>
    </BasicLayout>
  );
};

export default Home;
