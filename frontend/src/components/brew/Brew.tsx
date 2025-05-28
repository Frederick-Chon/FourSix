import { useState, useMemo, useRef } from 'react';
import BrewOptions from '../brew-options/brew-options';
import RecipeInfo from '../recipe-info/recipe-info';
import Timer from '../timer/timer';
import calculateBrew, {
  BrewSize,
  Balance,
  Strength,
} from '@/utils/calculate-brew';
import { saveBrew, getStoredCoffees, updateCoffee } from '@/utils/storage';
import { v4 as uuidv4 } from 'uuid';

type ScreenState = 'options' | 'timer' | 'complete';

const Brew = () => {
  const [screen, setScreen] = useState<ScreenState>('options');
  const [brewSize, setBrewSize] = useState<BrewSize>(BrewSize.MEDIUM);
  const [balance, setBalance] = useState<Balance>(Balance.EVEN);
  const [strength, setStrength] = useState<Strength>(Strength.MEDIUM);
  const [selectedBeanId, setSelectedBeanId] = useState<string>('');
  const brewCompletedRef = useRef(false);

  const brewDetails = useMemo(
    () => calculateBrew(brewSize, balance, strength),
    [brewSize, balance, strength]
  );

  const handleCompleteBrew = () => {
    if (brewCompletedRef.current) return;
    brewCompletedRef.current = true;

    const newBrew = {
      id: uuidv4(),
      date: new Date().toISOString(),
      size: brewSize,
      balance,
      strength,
      coffeeGrams: brewDetails.coffeeAmount,
      waterGrams: brewDetails.waterAmount,
      notes: '',
      beanId: selectedBeanId,
    };

    saveBrew(newBrew);

    // Subtract grams from selected bean
    if (selectedBeanId) {
      const beans = getStoredCoffees();
      const bean = beans.find((b) => b.id === selectedBeanId);

      if (bean) {
        const updatedBean = {
          ...bean,
          gramsRemaining: Math.max(
            bean.gramsRemaining - brewDetails.coffeeAmount,
            0
          ),
        };

        updateCoffee(updatedBean);
        console.log(
          `Subtracted ${brewDetails.coffeeAmount}g from ${bean.name}. Remaining: ${updatedBean.gramsRemaining}g`
        );
      }
    }

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
            selectedBeanId={selectedBeanId}
            setSelectedBeanId={setSelectedBeanId}
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
