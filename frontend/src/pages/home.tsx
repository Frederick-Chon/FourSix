import TestAPI from '../components/TestAPI';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="text-white text-center p-10">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <TestAPI />
      <Button>Click Me!</Button>
    </div>
  );
};

export default Home;
