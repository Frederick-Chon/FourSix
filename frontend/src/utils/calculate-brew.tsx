/* 4:6 formula
    1) Start with 1:15 ratio of ground beans to hot water. (20g beans -> 300g water)
    2) Total amount of hot water will be divided into 4:6 ratio. (300g water -> 120g[40%] & 180g[60%]) 
    3) Split the first 40% into 2 pours, flavor adjusted by how the pours are split. 
      * If 1st pour < 2nd pour = coffee will taste sweeter
      * If 1st pour > 2nd pour = coffee will taste brighter
      * If 1st pour = 2nd pour => standard banace
    4) Split remaning 60% into X amount of pours to determine strength, 
      * Light = split remaining 60% into 2 even pours (90g each pour)
      * Medium = split remaining 60% into 3 even pours (60g each pour)
      * Strong = split remaining 60% into 4 pours (45g each pour) 
*/

type Pour = { pourNumber: number; amount: number };

export enum BrewSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
}

export enum Balance {
  SWEET = 'Sweet',
  EVEN = 'Even',
  BRIGHT = 'Bright',
}

export enum Strength {
  LIGHT = 'Light',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

type BrewSizeMapping = { coffee: number; water: number };

const sizeMapping: Record<BrewSize, BrewSizeMapping> = {
  [BrewSize.SMALL]: { coffee: 15, water: 225 },
  [BrewSize.MEDIUM]: { coffee: 20, water: 300 },
  [BrewSize.LARGE]: { coffee: 25, water: 375 },
};

const calculateBalancePours = (balance: Balance, first40Percent: number) => {
  switch (balance) {
    case Balance.SWEET:
      return {
        firstPour: first40Percent * 0.4,
        secondPour: first40Percent * 0.6,
      };
    case Balance.EVEN:
      return {
        firstPour: first40Percent * 0.5,
        secondPour: first40Percent * 0.5,
      };
    case Balance.BRIGHT:
      return {
        firstPour: first40Percent * 0.6,
        secondPour: first40Percent * 0.4,
      };
    default:
      throw new Error(`Invalid balance: ${balance}`);
  }
};

const calculateStrengthPours = (
  strength: Strength,
  remaining60Percent: number
) => {
  const numPours =
    strength === Strength.LIGHT ? 2 : strength === Strength.MEDIUM ? 3 : 4;

  const pourAmount = remaining60Percent / numPours;

  const pours: Pour[] = Array.from({ length: numPours }, (_, index) => ({
    pourNumber: index + 3,
    amount: Math.round(pourAmount),
  }));

  return pours;
};

const calculateBrew = (
  brewSize: BrewSize,
  balance: Balance,
  strength: Strength
) => {
  if (!Object.values(BrewSize).includes(brewSize)) {
    throw new Error(`Invalid brew size: ${brewSize}`);
  }
  if (!Object.values(Balance).includes(balance)) {
    throw new Error(`Invalid balance: ${balance}`);
  }
  if (!Object.values(Strength).includes(strength)) {
    throw new Error(`Invalid strength: ${strength}`);
  }

  const { coffee, water: totalWater } = sizeMapping[brewSize];

  const first40Percent = totalWater * 0.4;
  const remaining60Percent = totalWater * 0.6;

  const { firstPour, secondPour } = calculateBalancePours(
    balance,
    first40Percent
  );

  const strengthPours = calculateStrengthPours(strength, remaining60Percent);

  const pours: Pour[] = [
    { pourNumber: 1, amount: Math.round(firstPour) },
    { pourNumber: 2, amount: Math.round(secondPour) },
    ...strengthPours.map((pour) => ({
      ...pour,
      amount: Math.round(pour.amount),
    })),
  ];

  return { coffeeAmount: coffee, waterAmount: totalWater, pours };
};

export default calculateBrew;
