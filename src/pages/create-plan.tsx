import { useRouter } from "next/router";
import { ProtectedPage } from "~/components";
import Steps from "~/components/Steps/Steps";
import { usePlanStore } from "~/utils/state";

const CreatePlan = () => {
  const router = useRouter();
  const eventId = !!router.query.eventId
    ? (router.query.eventId as string)
    : "";
  const setEventId = usePlanStore((state) => state.setEventId);

  // Store the id for the event the plan is for
  setEventId(eventId);

  return (
    <>
      <ProtectedPage>
        <div className="container py-12">
          <main className="mx-auto">
            <div className="max-w-full">
              <Steps />
            </div>
          </main>
        </div>
      </ProtectedPage>
    </>
  );
};

export default CreatePlan;
