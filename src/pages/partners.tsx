import { type NextPage } from "next";
import Head from "next/head";

const Partners: NextPage = () => {
  return (
    <>
      <Head>
        <title>Become a Partner | AirES</title>
        <meta
          name="description"
          content="Instruction on how to join AirES as a partner"
        />
      </Head>
      <div className="grid lg:h-screen lg:grid-cols-2">
        <div className="max-h-80 overflow-hidden lg:max-h-full">
          <img
            src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60"
            alt="A person sitting on a bench"
            className="h-full w-full object-cover"
          />
        </div>

        <main className="flex flex-col justify-center p-6 lg:p-14">
          <div>
            <h1 className="text-3xl font-semibold lg:text-5xl">
              Become a partner
            </h1>
            <p className="mt-6 text-lg text-gray-700 lg:mt-8 lg:text-2xl">
              Partner up with us to post your events on AirEs and reach more
              people!
            </p>
          </div>

          <div>
            <h2 className="mb-3 ml-4 mt-16 text-lg font-medium lg:mb-4 lg:ml-6 lg:text-xl">
              How?
            </h2>

            <div className="rounded-xl border border-slate-200 p-4 lg:px-6 lg:py-5 lg:text-lg">
              <p>
                Just send an email to{" "}
                <a
                  href="mailto:partners@aires.com"
                  className="text-blue-600 hover:underline"
                >
                  partners@aires.com
                </a>{" "}
                with your business’s name, location and facilities.
              </p>

              <p className="mt-5">We&apos;ll get back to you very soon!</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Partners;
