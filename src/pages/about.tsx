import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { BasicLayout } from "~/layouts";
import { api } from "~/utils/api";

const About: NextPage = () => {
    const { user } = useUser();
  
    return (
        <>
        <head>
            <title>About Us | AirES</title>
        </head>
        
        <body>

                <nav>
                    <a href="https://aires.vercel.app/">AirES</a>
                    <a href="https://aires.vercel.app/">Home</a>
                    <a href="https://aires.vercel.app/events/">Events</a>
                    <a href="https://aires.vercel.app/about/">About</a>
                </nav>

                <div class="message">
                    <p>Since 2023, we are bringing your desire for adventure, fast travel planning and comfortable experiences into reality.</p>
                </div>

                <div class="details">
                    <p>In this day and age when the desire for getaways and out-of-the-world experiences has increased more than ever, a trip planner for extreme sport events is the ideal solution. At AirES, we are bringing together the most popular airlines, accommodations and extreme sport venues to organize your most ideal trip with all of your favorite destinations and activities.</p>
                </div>

                <div class="photo">
                    <img src="https://sportsfacilities.com/wp-content/uploads/2016/12/shutterstock_482102515-1024x350-1.jpg">
                    </></div>

                <div class="row">
                    <div class="column">
                        <h1></h1>
                    </div>
                    <div class="column">
                        <h1></h1>
                    </div>
                </div>
            </body>
            
            </>
    );
  };
  
  export default About;