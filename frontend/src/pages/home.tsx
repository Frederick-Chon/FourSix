import TestAPI from '../components/TestAPI';
import { Button } from '@/components/ui/button';
import Brew from '@/components/brew/Brew';

const Home = () => {
  return (
    <div className="text-white text-center p-10">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <TestAPI />
      <Button>Click Me!</Button>
      <Brew />
    </div>
  );
};

export default Home;
