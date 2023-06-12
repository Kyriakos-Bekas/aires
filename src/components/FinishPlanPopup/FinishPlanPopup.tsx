import Button from "../Button/Button";
import { AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/router";

type FinishPlanPopupProps = {
  showing: boolean;
  onClose: () => void;
};

const FinishPlanPopup = ({ showing, onClose }: FinishPlanPopupProps) => {
  const router = useRouter();

  if (!showing) return null;

  const handleSaveAsDraft = () => {
    void router.push("/plans");
  };

  return (
    <div className="fixed left-0 top-0 z-[60] flex h-full w-full items-center justify-center">
      <div className="absolute left-0 top-0 z-[-1] h-full w-full bg-gray-800 opacity-20"></div>
      <div className="pointer-events-auto max-w-sm p-6 lg:max-w-md">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="bg-white p-6">
            <h3 className="text-2xl font-semibold">Finishing your plan</h3>

            <div className="mt-5 grid grid-cols-1 gap-3">
              <p>Congratulations! Your plan is ready</p>
              <p>
                You can choose to proceed to checkout now, or save it as a draft
                and pay later
              </p>
            </div>

            <div>
              <div className="mt-6 rounded-md border border-orange-400 bg-orange-100 p-3 text-slate-700">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="text-orange-400" />
                  <p className="text-lg font-medium">Warning!</p>
                </div>

                <p>
                  Due to changes in flight scheduling and booking, plans you
                  choose to save as draft are subject to changes and may not be
                  available as is in the future
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <Button
                className="w-full"
                variant="outline"
                onClick={handleSaveAsDraft}
              >
                Save as draft
              </Button>
              <Button className="w-full">Finish now</Button>
            </div>

            <Button
              className="absolute right-2 top-2 p-2"
              variant="ghost"
              onClick={() => onClose()}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishPlanPopup;
