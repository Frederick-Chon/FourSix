import { Outlet } from 'react-router-dom';
import Navigation from '@/components/navigation/Navigation';
import PageWrapper from './PageWrapper';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <main className="flex-grow">
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
