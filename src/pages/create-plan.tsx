import { useRouter } from "next/router";
import { ProtectedPage } from "~/components";
import { api } from "~/utils/api";

const CreatePlan = () => {
  const router = useRouter();
  const eventId = !!router.query.eventId
    ? (router.query.eventId as string)
    : "";

  const { data: post } = api.post.getOne.useQuery({ id: eventId });
  //const { data } = api.flight.test.useQuery({ flight_iata: "A3711" });
  const { data: hotel } = api.hotel.test.useQuery({ checkIn: "2023-09-27" }); //check this later

  if (!post) return null;

  return (
    <ProtectedPage>
      <main className="flex min-h-screen items-center p-8">
        <div className="max-w-full">
          <h1 className="text-center text-lg font-semibold lg:text-left">
            You will soon be able to create a plan for this post
          </h1>
          <div className="my-4 rounded-md border border-slate-300 p-2">
            <pre className="overflow-x-scroll rounded-md bg-slate-800 p-2 text-slate-100">
              {JSON.stringify(post, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </ProtectedPage>
  );
};

export default CreatePlan;
