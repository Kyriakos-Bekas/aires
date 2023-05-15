import { CheckboxInternal } from "./CheckboxInternal";

type CheckboxProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
  return (
    <div className="my-2 flex items-center space-x-2">
      <CheckboxInternal
        value={value}
        onClick={() => onChange(value)}
        id={`id-${value}`}
      />
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        htmlFor={`id-${value}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
