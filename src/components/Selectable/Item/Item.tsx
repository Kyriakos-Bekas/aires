import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";

type SelectableItemProps = {
  children: React.ReactNode;
  onSelected: () => void;
  selected?: boolean;
};

const SelectableItem = ({
  children,
  onSelected,
  selected = false,
}: SelectableItemProps) => {
  return (
    <div
      className={clsx(
        "my-4 rounded-lg border-2 px-6 py-4 text-left transition-colors",
        {
          "border-green-600": selected,
          "border-slate-200 md:hover:border-blue-400": !selected,
        }
      )}
    >
      <button
        onClick={() => onSelected()}
        className="flex w-full items-center gap-6"
      >
        <div className="grow">{children}</div>
        <div className="basis-auto">
          <CheckCircle2
            className={clsx("transition-opacity", {
              "text-slate-300": !selected,
              "text-green-600": selected,
            })}
            size={24}
            aria-label={selected ? "Selected flight" : "Select flight"}
          />
        </div>
      </button>
    </div>
  );
};

export default SelectableItem;
