import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Coffee, Settings, LucideIcon } from 'lucide-react';

type NavItem = {
  label: string;
  icon: LucideIcon;
  route: string;
};

const navItems: NavItem[] = [
  { label: 'Home', icon: Home, route: '/' },
  { label: 'Notes', icon: BookOpen, route: '/notes' },
  { label: 'Coffee', icon: Coffee, route: '/coffee' },
  { label: 'Settings', icon: Settings, route: '/settings' },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="mx-auto max-w-screen-sm px-2 bg-gray-950 fixed bottom-0 w-full flex justify-around py-3 inset-x-0">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.route;

        return (
          <Link key={item.route} to={item.route}>
            <button
              className={`flex flex-col items-center bg-gray-950 ${
                isActive ? 'text-yellow-500' : 'text-gray-400'
              } hover:text-white transition-colors duration-200`}
            >
              <Icon
                size={24}
                className={`mb-1 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              />
              <span className="text-xs">{item.label}</span>
            </button>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
