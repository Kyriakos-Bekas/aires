import { CheckCircle2, Trash2 } from "lucide-react";
import {
  Button,
  ProtectedPage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import clsx from "clsx";
import { api } from "~/utils/api";
import Head from "next/head";

dayjs.extend(relativeTime);

const UserPlans = () => {
  const { data: getAllPlansData, isLoading } = api.plan.getAll.useQuery();
  const plans = getAllPlansData?.data || [];
  const { mutate: deletePlanMutate } = api.plan.delete.useMutation({
    onSuccess: ({ message }) => {
      void ctx.plan.getAll.invalidate();
      console.log(message);
    },
  });
  const ctx = api.useContext();

  const handlePlanDelete = (id: string) => {
    deletePlanMutate({ id });
  };

  const handlePlanCheckout = (id: string) => {
    console.log("Plan with id: ", id, " is being checked out");
  };

  return (
    <>
      <Head>
        <title>Your plans | AirES</title>
      </Head>

      <ProtectedPage>
        <div className="container py-12">
          <main className="mx-auto">
            <div className="max-w-full">
              <h1 className="text-3xl font-semibold">Your plans</h1>
              {isLoading && <p>Loading...</p>}
              {!isLoading && !!getAllPlansData?.data.length ? (
                <div className="mt-8 max-w-sm overflow-x-scroll md:max-w-full md:overflow-x-hidden">
                  <Table>
                    <TableCaption>
                      <p className="text-left md:text-center">
                        A list of all your plans
                      </p>
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Plan Title</TableHead>
                        <TableHead className="text-center">Price (€)</TableHead>
                        <TableHead className="hidden text-center lg:table-cell">
                          Created
                        </TableHead>
                        <TableHead className="text-center">Booked</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plans.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell className="w-[200px] font-medium">
                            {plan.title}
                          </TableCell>
                          <TableCell className="text-center">
                            {plan.totalPrice}
                          </TableCell>
                          <TableCell className="hidden text-center lg:table-cell">
                            {dayjs(plan.createdAt).fromNow()}
                          </TableCell>
                          <TableCell className="">
                            <div className="flex h-full w-full items-center justify-center">
                              <CheckCircle2
                                className={clsx("h-6 w-6", {
                                  "text-green-500": !plan.draft,
                                  "text-gray-300": plan.draft,
                                })}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-4">
                              {plan.draft && (
                                <Button
                                  onClick={() => handlePlanCheckout(plan.id)}
                                >
                                  Book
                                </Button>
                              )}

                              <Button
                                variant="ghost"
                                onClick={() => handlePlanDelete(plan.id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="mt-8 rounded-lg border border-slate-200 p-8 text-center text-slate-600">
                  <p>You have not created any plans yet</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </ProtectedPage>
    </>
  );
};

export default UserPlans;
