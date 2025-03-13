import { Droplet } from 'lucide-react';
import { Icon } from 'lucide-react';
import { coffeeBean } from '@lucide/lab';

type RecipeInfoProps = {
  coffeeAmount: number;
  waterAmount: number;
  pours: { pourNumber: number; amount: number }[];
};

const RecipeInfo = ({ coffeeAmount, waterAmount, pours }: RecipeInfoProps) => {
  return (
    <div className="mt-14 p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recipe Summary</h2>

      <div className="flex justify-center gap-10">
        <div className="flex items-center gap-2 self-center justify-center">
          <Icon iconNode={coffeeBean} />
          <span className="text-white">{coffeeAmount}g</span>
        </div>
        <div className="flex items-center gap-2 self-center justify-center">
          <Droplet />
          <span className="text-white">{waterAmount}g</span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Pour Breakdown:</h3>

        {pours.length > 0 ? (
          <ul className="list-disc list-inside text-gray-300">
            {pours.map((pour) => (
              <li key={pour.pourNumber}>
                Pour {pour.pourNumber}:{' '}
                <span className="text-white">{pour.amount}g</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No pours calculated.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeInfo;
