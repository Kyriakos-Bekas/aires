import { type NextPage } from "next";
import Head from "next/head";
import { OpenPage } from "~/components";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us | AirES</title>
      </Head>

      <OpenPage>
        <main className="container py-8">
          <div className="message">
            <p>
              Since 2023, we are bringing your desire for adventure, fast travel
              planning and comfortable experiences into reality
            </p>
          </div>

          <div className="details">
            <p>
              In this day and age when the desire for getaways and
              out-of-the-world experiences has increased more than ever, a trip
              planner for extreme sport events is the ideal solution. At AirES,
              we are bringing together the most popular airlines, accommodations
              and extreme sport venues to organize your most ideal trip with all
              of your favorite destinations and activities.
            </p>
          </div>

          <div className="photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://sportsfacilities.com/wp-content/uploads/2016/12/shutterstock_482102515-1024x350-1.jpg"
              alt="Skateboard Alley"
            />
          </div>
        </main>
      </OpenPage>
    </>
  );
};

export default About;
