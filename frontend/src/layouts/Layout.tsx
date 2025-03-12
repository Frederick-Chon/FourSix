import { Outlet } from 'react-router-dom';
import Navigation from '@/components/navigation/Navigation';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
