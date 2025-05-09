import { useState, useMemo } from 'react';
import BrewOptions from '../brew-options/brew-options';
import RecipeInfo from '../recipe-info/recipe-info';
import Timer from '../timer/timer';
import calculateBrew, {
  BrewSize,
  Balance,
  Strength,
} from '@/utils/calculate-brew';

const Brew = () => {
  const [brewSize, setBrewSize] = useState<BrewSize>(BrewSize.MEDIUM);
  const [balance, setBalance] = useState<Balance>(Balance.EVEN);
  const [strength, setStrength] = useState<Strength>(Strength.MEDIUM);
  const [startBrewing, setStartBrewing] = useState(false);

  const brewDetails = useMemo(
    () => calculateBrew(brewSize, balance, strength),
    [brewSize, balance, strength]
  );

  return (
    <div className="p-4">
      <BrewOptions
        brewSize={brewSize}
        setBrewSize={setBrewSize}
        balance={balance}
        setBalance={setBalance}
        strength={strength}
        setStrength={setStrength}
      />
      <RecipeInfo
        coffeeAmount={brewDetails.coffeeAmount}
        waterAmount={brewDetails.waterAmount}
        pours={brewDetails.pours}
      />
      {!startBrewing && (
        <button
          onClick={() => setStartBrewing(true)}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Start Brew
        </button>
      )}
      {startBrewing && (
        <Timer
          pours={brewDetails.pours}
          onComplete={() => alert('Brew Complete!')}
        />
      )}
    </div>
  );
};

export default Brew;
