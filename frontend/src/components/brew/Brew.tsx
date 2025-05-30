import { useState, useMemo, useRef } from 'react';
import BrewOptions from '../brew-options/brew-options';
import RecipeInfo from '../recipe-info/recipe-info';
import Timer from '../timer/timer';
import calculateBrew, {
  BrewSize,
  Balance,
  Strength,
} from '@/utils/calculate-brew';
import { createBrew, updateCoffee, fetchCoffees } from '@/utils/api';

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

  const handleCompleteBrew = async () => {
    if (brewCompletedRef.current) return;
    brewCompletedRef.current = true;

    const newBrew = {
      userId: 'user-1', // TODO: update this once auth is setup!
      brewSize,
      balance,
      strength,
      coffeeAmount: brewDetails.coffeeAmount,
      waterAmount: brewDetails.waterAmount,
      pours: brewDetails.pours,
      coffeeBeanId:
        selectedBeanId && selectedBeanId !== '__add_new'
          ? selectedBeanId
          : undefined,
      notes: '',
    };

    try {
      await createBrew(newBrew);

      // update coffee inventory if a bean was selected
      if (selectedBeanId && selectedBeanId !== '__add_new') {
        const beans = await fetchCoffees();
        const bean = beans.find((b) => b.id === selectedBeanId);
        if (bean) {
          console.log('Updating coffee bean', bean);
          const updatedGrams = Math.max(
            bean.gramsRemaining - brewDetails.coffeeAmount,
            0
          );

          await updateCoffee(bean.id, {
            gramsRemaining: updatedGrams,
            lastBrewDate: new Date().toISOString(),
          });
        }
      }

      setScreen('complete');
    } catch (err) {
      console.error('Failed to complete brew:', err);
      alert('Something went wrong saving your brew');
    }
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
