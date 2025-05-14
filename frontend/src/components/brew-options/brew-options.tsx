import { useEffect, useState } from 'react';
import { Beaker, Scale, Gauge, Coffee } from 'lucide-react';
import { BrewSize, Balance, Strength } from '@/utils/calculate-brew';
import Dropdown from '../dropdown/Dropdown';
import { getStoredCoffees, addCoffee } from '@/utils/storage';
import { CoffeeBean } from '@/types/coffee';
import { v4 as uuidv4 } from 'uuid';

type BrewOptionsProps = {
  brewSize: BrewSize;
  setBrewSize: (size: BrewSize) => void;
  balance: Balance;
  setBalance: (balance: Balance) => void;
  strength: Strength;
  setStrength: (strength: Strength) => void;
  selectedBeanId: string | null;
  setSelectedBeanId: (id: string) => void;
};

const BrewOptions = ({
  brewSize,
  setBrewSize,
  balance,
  setBalance,
  strength,
  setStrength,
  selectedBeanId,
  setSelectedBeanId,
}: BrewOptionsProps) => {
  const [beans, setBeans] = useState<CoffeeBean[]>([]);
  const [addingNew, setAddingNew] = useState(false);

  // Inline form state
  const [name, setName] = useState('');
  const [roaster, setRoaster] = useState('');
  const [origin, setOrigin] = useState('');
  const [roastDate, setRoastDate] = useState('');
  const [weight, setWeight] = useState(250);

  useEffect(() => {
    setBeans(getStoredCoffees());
  }, []);

  useEffect(() => {
    setAddingNew(selectedBeanId === '__add_new');
  }, [selectedBeanId]);

  const handleAddNewBean = () => {
    const newBean: CoffeeBean = {
      id: uuidv4(),
      name,
      roaster,
      origin,
      roastDate,
      weight,
      gramsRemaining: weight,
      isFinished: false,
      addedDate: new Date().toISOString(),
    };

    addCoffee(newBean);
    const updatedBeans = [newBean, ...beans];
    setBeans(updatedBeans);
    setSelectedBeanId(newBean.id);
    setAddingNew(false);

    setName('');
    setRoaster('');
    setOrigin('');
    setRoastDate('');
    setWeight(250);
  };

  const coffeeOptions = [
    { label: 'Select a bean', value: '' },
    ...beans.map((b) => ({
      label: `${b.name} · ${b.roaster}`,
      value: b.id,
    })),
    { label: '➕ Add new bean', value: '__add_new' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        label="Coffee"
        icon={Coffee}
        value={selectedBeanId ?? ''}
        options={coffeeOptions.map((o) => o.value)}
        displayMap={Object.fromEntries(
          coffeeOptions.map((o) => [o.value, o.label])
        )}
        onChange={setSelectedBeanId}
      />

      {addingNew && (
        <div className="border rounded-xl p-4 bg-zinc-900 space-y-3 text-white">
          <p className="font-semibold">Add New Coffee</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
          <input
            type="text"
            placeholder="Roaster"
            value={roaster}
            onChange={(e) => setRoaster(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
          <input
            type="date"
            value={roastDate}
            onChange={(e) => setRoastDate(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
          <input
            type="number"
            placeholder="Weight (g)"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
          <button
            onClick={handleAddNewBean}
            className="w-full py-2 rounded bg-green-600 text-white font-semibold"
          >
            Save Bean
          </button>
        </div>
      )}

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
