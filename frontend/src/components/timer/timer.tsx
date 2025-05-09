import { useState, useEffect } from 'react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

type Pour = {
  pourNumber: number;
  amount: number;
};

type TimerProps = {
  pours: Pour[];
  onComplete: () => void;
};

const Timer = ({ pours, onComplete }: TimerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [isPreCountdown, setIsPreCountdown] = useState(true);
  const [preCountdown, setPreCountdown] = useState(3);
  const [totalTime, setTotalTime] = useState(0);

  // Pre-countdown logic
  useEffect(() => {
    if (isPreCountdown && preCountdown > 0) {
      const interval = setInterval(() => {
        setPreCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (isPreCountdown && preCountdown === 0) {
      setIsPreCountdown(false);
      setIsRunning(true);
    }
  }, [isPreCountdown, preCountdown]);

  // Step timer logic
  useEffect(() => {
    if (!isRunning || isPreCountdown) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          if (currentStep === pours.length - 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          } else {
            setCurrentStep((prevStep) => prevStep + 1);
            return 30;
          }
        }
        return prev - 1;
      });
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPreCountdown, currentStep, pours.length, onComplete]);

  const currentPour = pours[currentStep];

  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(
      seconds % 60
    ).padStart(2, '0')}`;

  const progressPercent = ((30 - timeLeft) / 30) * 100;

  return (
    <div className="text-center space-y-6 mt-10">
      {isPreCountdown ? (
        <div className="text-3xl font-bold">Starting in... {preCountdown}</div>
      ) : (
        <>
          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {pours.length}
          </div>
          <div className="text-2xl font-semibold mb-2">
            Pour {currentPour.amount}g
          </div>

          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-gray-700"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                r="70"
                cx="96"
                cy="96"
              />
              <circle
                className="text-yellow-400"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
                r="70"
                cx="96"
                cy="96"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            Total Time: {formatTime(totalTime)}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                  setTimeLeft(30);
                }
              }}
            >
              <SkipBack className="w-6 h-6 text-yellow-400" />
            </button>
            <button onClick={() => setIsRunning((prev) => !prev)}>
              {isRunning ? (
                <Pause className="w-6 h-6 text-yellow-400" />
              ) : (
                <Play className="w-6 h-6 text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => {
                if (currentStep < pours.length - 1) {
                  setCurrentStep(currentStep + 1);
                  setTimeLeft(30);
                }
              }}
            >
              <SkipForward className="w-6 h-6 text-yellow-400" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Timer;
