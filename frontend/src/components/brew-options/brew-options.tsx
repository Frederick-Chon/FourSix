import { Beaker, Scale, Gauge } from 'lucide-react';
import { BrewSize, Balance, Strength } from '@/utils/calculate-brew';
import Dropdown from '../dropdown/Dropdown';

type BrewOptionsProps = {
  brewSize: BrewSize;
  setBrewSize: (size: BrewSize) => void;
  balance: Balance;
  setBalance: (balance: Balance) => void;
  strength: Strength;
  setStrength: (strength: Strength) => void;
};

const BrewOptions = ({
  brewSize,
  setBrewSize,
  balance,
  setBalance,
  strength,
  setStrength,
}: BrewOptionsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        label="Size"
        icon={Beaker}
        value={brewSize}
        options={Object.values(BrewSize)}
        onChange={setBrewSize}
      />
      <Dropdown
        label="Balance"
        icon={Scale}
        value={balance}
        options={Object.values(Balance)}
        onChange={setBalance}
      />
      <Dropdown
        label="Strength"
        icon={Gauge}
        value={strength}
        options={Object.values(Strength)}
        onChange={setStrength}
      />
    </div>
  );
};

export default BrewOptions;
