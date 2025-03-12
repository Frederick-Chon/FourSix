const WelcomeScreen = ({ onDismiss }: { onDismiss: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Welcome to FourSix!</h1>
        <p className="text-gray-300">
          This app helps you brew coffee using the 4:6 method. Adjust your brew
          size, balance, and strength to create the perfect cup!
        </p>
        <button
          onClick={onDismiss}
          className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
