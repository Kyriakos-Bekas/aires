import { useEffect, useState } from "react";
import { Button } from "~/components";
import ToEventFlightStepForm from "./Forms/ToEventFlightStepForm";
import FromEventFlightStepForm from "./Forms/FromEventFlightStepForm";
import { usePlanStore } from "~/utils/state";
import { api } from "~/utils/api";
import { type PublicPost } from "~/server/api/routers/post";
import Head from "next/head";
import { Calendar, Check, ChevronDown, Globe2 } from "lucide-react";
import mapCodeToLocation from "~/utils/mapCodeToLocation";
import { type LocationCode } from "~/data/locations";
import clsx from "clsx";
import HotelStepForm from "./Forms/HotelStepForm";
import { FinishPlanPopup } from "../FinishPlanPopup";

type StepsConfig = Record<
  1 | 2 | 3,
  {
    heading: string;
    description: string;
    explanation: string;
  }
>;

const stepsConfig: StepsConfig = {
  1: {
    heading: "Choose your arrival flight",
    description:
      "This is the flight that will take you to the event's location",
    explanation:
      "Pick a date and location for your flight, and we'll show you the best options",
  },
  2: {
    heading: "Choose your hotel",
    description: "This is the hotel where you'll be staying during the event",
    explanation:
      "Pick the dates for your stay and we'll search for the most suitable hotels",
  },
  3: {
    heading: "Choose your departure flight",
    description:
      "This is the flight that will take you back home after the event",
    explanation:
      "Pick a date and location for your flight, and we'll show you the best options",
  },
};

const StepList = ({ activeStep }: { activeStep: keyof StepsConfig }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 p-4">
      {([1, 2, 3] as const).map((step) => {
        return (
          <div className="flex items-center gap-2" key={step}>
            {step >= activeStep ? (
              <div className="flex h-4 w-4 items-center justify-center">
                <div
                  className={clsx("mr-[0.75px] h-2 w-2 rounded-full", {
                    "bg-slate-600": step === activeStep,
                    "bg-slate-300": step > activeStep,
                  })}
                ></div>
              </div>
            ) : (
              <Check className="h-4 w-4 text-green-600" />
            )}
            <div
              className={clsx("text-sm", {
                "font-medium text-slate-600": step <= activeStep,
                "font-normal text-slate-300": step > activeStep,
              })}
            >
              {stepsConfig[step].heading}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PostHeader = ({ post }: { post: PublicPost }) => {
  const [showHeader, setShowHeader] = useState(true);

  return (
    <>
      <Button
        variant="outline"
        className="mb-4 flex items-center gap-2 lg:hidden"
        onClick={() => setShowHeader((prev) => !prev)}
      >
        <span>{showHeader ? "Hide Event Details" : "Show Events Details"}</span>
        <ChevronDown
          size={16}
          className={showHeader ? "rotate-180 transform" : ""}
        />
      </Button>

      <div className={clsx({ "hidden lg:block": !showHeader })}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full rounded-none rounded-b-none rounded-r-md rounded-t-md object-cover"
        />
        <section className="col-span-2 rounded-none rounded-b-md rounded-l-md rounded-t-none border border-slate-200 p-4">
          <div>
            <div>
              <h2 className="text-lg font-medium">{post.title}</h2>
              <div className="my-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <Globe2 className="h-4 w-4" />
                  <span>
                    {mapCodeToLocation(post.location as LocationCode)}
                  </span>
                  <span className="mx-1 h-1 w-1 rounded-full bg-slate-600"></span>
                  <Calendar className="h-4 w-4" />
                  <span>{post.date.toDateString()}</span>
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm">{post.description}</p>
          </div>
        </section>
      </div>
    </>
  );
};

type Step = keyof StepsConfig;

const Steps = () => {
  const [activeStep, setActiveStep] = useState<Step>(1);
  const toEventFlight = usePlanStore((state) => state.toFlight);
  const accommodationId = usePlanStore((state) => state.accommodation);
  const fromEventFlight = usePlanStore((state) => state.fromFlight);
  const eventId = usePlanStore((state) => state.eventId);
  const { data: post } = api.post.getOne.useQuery({ id: eventId });
  const [error, setError] = useState({
    hasError: false,
    show: false,
    message: "",
  });
  const { mutate, isSuccess: isSavedAsDraftSuccessful } =
    api.plan.create.useMutation({
      onError: (error) => {
        setError({
          hasError: true,
          show: true,
          message: error.message,
        });
      },
    });
  const [showFinishPopup, setShowFinishPopup] = useState(
    isSavedAsDraftSuccessful
  );

  useEffect(() => {
    setShowFinishPopup(isSavedAsDraftSuccessful);
  }, [isSavedAsDraftSuccessful]);

  useEffect(() => {
    if (error.show) {
      const timer = setTimeout(() => {
        setError((prev) => ({ ...prev, show: false }));
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error.show]);

  let displaySubmitButton = false;
  switch (activeStep) {
    case 1:
      displaySubmitButton = !!toEventFlight;
      break;
    case 2:
      displaySubmitButton = !!accommodationId;
      break;
    case 3:
      displaySubmitButton = !!fromEventFlight;
      break;
  }

  const handlePreviousButtonClick = () => {
    if (activeStep === 1) return;
    setActiveStep((prevStep) => (prevStep - 1) as Step);
  };

  const handleNextButtonClick = () => {
    if (activeStep === 3) return;
    setActiveStep((prevStep) => (prevStep + 1) as Step);
  };

  const handleFormSubmit = () => {
    setError({ hasError: false, show: false, message: "" });
    if (!fromEventFlight || !toEventFlight || !accommodationId) {
      setError({
        hasError: true,
        show: true,
        message: "Please fill out all the fields",
      });
      return;
    }

    if (!post) {
      setError({
        hasError: true,
        show: true,
        message: "Something went wrong. Please try again later",
      });
      return;
    }

    mutate({
      title: `Plan for ${post.title}`,
      draft: true,
      price: post.price,
      fromFlight: fromEventFlight,
      toFlight: toEventFlight,
      accommodation: accommodationId,
      eventId,
    });
  };

  return (
    <>
      <Head>
        <title>Create a plan for {post?.title} | AirES</title>
      </Head>

      {error.hasError && error.show && (
        <div
          className="fixed right-1/2 top-8 z-50 min-w-[22rem] translate-x-1/2 rounded border border-red-400 bg-red-50 px-4 py-3 text-red-700 lg:right-6 lg:top-6 lg:max-w-sm lg:translate-x-0"
          role="alert"
        >
          <strong className="font-semibold">
            You cannot save your plan yet!
          </strong>
          <span className="mt-2 block text-sm">{error.message}</span>
          <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
            <svg
              className="h-6 w-6 fill-current text-red-500"
              role="button"
              onClick={() => setError((prev) => ({ ...prev, show: false }))}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z"></path>
            </svg>
          </span>
        </div>
      )}

      <div>
        <section className="relative grid grid-cols-1 gap-8 lg:grid-cols-3">
          {!!post && (
            <div className="h-full lg:col-span-1">
              <div className="top-12 lg:sticky">
                <div className="mb-7">
                  <h1 className="mb-3 text-2xl font-semibold">
                    Create a plan in 3 steps!
                  </h1>
                  <p className="">
                    <span className="font-semibold">Step:</span>
                    {` ${activeStep}`}
                    /3
                  </p>
                </div>
                <PostHeader post={post} />
                <div>
                  <StepList activeStep={activeStep} />
                </div>
              </div>
            </div>
          )}

          <main className="lg:col-span-2">
            <header className="mt-12">
              <h2 className="mb-4 text-xl font-semibold">
                {stepsConfig[activeStep].heading}
              </h2>
              <p className="mb-2">{stepsConfig[activeStep].description}</p>
              <p>{stepsConfig[activeStep].explanation}</p>
            </header>

            <div>
              {activeStep === 1 && <ToEventFlightStepForm />}
              {activeStep === 2 && <HotelStepForm />}
              {activeStep === 3 && <FromEventFlightStepForm />}
            </div>

            <div className="fixed bottom-0 left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-center gap-4 border-t border-t-slate-200 bg-white p-2 lg:p-4">
              {activeStep !== 1 && (
                <Button variant="ghost" onClick={handlePreviousButtonClick}>
                  Previous
                </Button>
              )}
              {displaySubmitButton ? (
                activeStep !== 3 ? (
                  <Button onClick={handleNextButtonClick}>Next</Button>
                ) : (
                  <Button onClick={handleFormSubmit}>Finish Plan</Button>
                )
              ) : null}
            </div>
          </main>
        </section>
      </div>

      <FinishPlanPopup
        showing={showFinishPopup}
        onClose={() => setShowFinishPopup(false)}
      />
    </>
  );
};

export default Steps;
