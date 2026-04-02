import { Outlet } from 'react-router-dom';
import NavRail from './NavRail';
import AppHeader from './AppHeader';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <NavRail />
      <div className="ml-[72px]">
        <AppHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
