import { useState, useMemo } from 'react';
import BrewOptions from '../brew-options/brew-options';
import RecipeInfo from '../recipe-info/recipe-info';
import Timer from '../timer/timer';
import calculateBrew, {
  BrewSize,
  Balance,
  Strength,
} from '@/utils/calculate-brew';
import { saveBrew } from '@/utils/storage';
import { v4 as uuidv4 } from 'uuid';

type ScreenState = 'options' | 'timer' | 'complete';

const Brew = () => {
  const [screen, setScreen] = useState<ScreenState>('options');
  const [brewSize, setBrewSize] = useState<BrewSize>(BrewSize.MEDIUM);
  const [balance, setBalance] = useState<Balance>(Balance.EVEN);
  const [strength, setStrength] = useState<Strength>(Strength.MEDIUM);

  const brewDetails = useMemo(
    () => calculateBrew(brewSize, balance, strength),
    [brewSize, balance, strength]
  );

  const handleCompleteBrew = () => {
    const newBrew = {
      id: uuidv4(),
      date: new Date().toISOString(),
      size: brewSize,
      balance,
      strength,
      coffeeGrams: brewDetails.coffeeAmount,
      waterGrams: brewDetails.waterAmount,
      notes: '',
    };

    saveBrew(newBrew);
    setScreen('complete');
  };

  return (
    <div className="p-4 space-y-6">
      {screen === 'options' && (
        <>
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

          <button
            onClick={() => setScreen('timer')}
            className="w-full py-3 rounded bg-green-600 text-white font-semibold"
          >
            Start Brew
          </button>
        </>
      )}

      {screen === 'timer' && (
        <Timer pours={brewDetails.pours} onComplete={handleCompleteBrew} />
      )}

      {screen === 'complete' && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-400">Brew Complete!</h2>
          <p className="text-gray-300 mt-2">
            Enjoy your coffee. Summary view coming soon.
          </p>
        </div>
      )}
    </div>
  );
};

export default Brew;
