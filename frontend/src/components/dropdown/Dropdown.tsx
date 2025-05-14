import { ChevronsUpDown } from 'lucide-react';

type DropdownProps<T extends string> = {
  label: string;
  icon: React.ElementType;
  value: T;
  options: T[];
  onChange: (value: T) => void;
  displayMap?: Record<string, string>;
};

const Dropdown = <T extends string>({
  label,
  icon: Icon,
  value,
  options,
  onChange,
  displayMap,
}: DropdownProps<T>) => {
  return (
    <div className="flex items-center bg-gray-800 p-4 rounded-lg">
      <Icon className="w-6 h-6 text-yellow-500 mr-3 shrink-0" />

      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col flex-grow">
          <span className="uppercase text-xs text-left font-bold text-gray-400">
            {label}
          </span>

          <div className="relative w-full">
            <select
              className="w-full bg-transparent text-white text-lg font-medium border-none focus:outline-none appearance-none cursor-pointer"
              value={value}
              onChange={(e) => onChange(e.target.value as T)}
            >
              {options.map((option) => (
                <option key={option} value={option} className="text-black">
                  {displayMap?.[option] ?? option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ChevronsUpDown className="w-5 h-5 text-gray-400 shrink-0 cursor-pointer" />
      </div>
    </div>
  );
};

export default Dropdown;
